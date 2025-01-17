import NextAuth, { Account, Session } from 'next-auth'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/lib/prisma"
import { JWT } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
    interface Session {
        accessToken?: string
        idToken?: string
        refreshToken?: string
        expiresIn?: number
        user?: {
            email?: string | null
            name?: string | null
            id?: string | null
            isPremium?: boolean
            stripeId?: string
        }
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                    scope: 'openid profile email https://www.googleapis.com/auth/calendar.events',
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (!session?.user) return session

            // Get the user from database
            const dbUser = await prisma.user.findUnique({
                where: { id: user.id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    isPremium: true,
                    stripeId: true,
                    accounts: {
                        select: {
                            access_token: true,
                            refresh_token: true,
                            expires_at: true,
                            id_token: true,
                        },
                        take: 1,
                    },
                },
            })

            if (!dbUser?.accounts?.[0]) return session

            return {
                ...session,
                user: {
                    id: dbUser.id,
                    email: dbUser.email,
                    name: dbUser.name,
                    isPremium: dbUser.isPremium,
                    stripeId: dbUser.stripeId,
                },
                accessToken: dbUser.accounts[0].access_token ?? undefined,
                refreshToken: dbUser.accounts[0].refresh_token ?? undefined,
                idToken: dbUser.accounts[0].id_token ?? undefined,
                expiresIn: dbUser.accounts[0].expires_at ?? undefined,
            }
        },
    },
})
