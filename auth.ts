import NextAuth, { Account, Session } from 'next-auth'
import { AdapterAccount } from 'next-auth/adapters'
import { JWT } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
 interface Session {
  accessToken?: string
  idToken?: string
  refreshToken?: string
  expiresIn?: number
 }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
 providers: [
  Google({
   clientId: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   authorization: {
    params: {
     prompt: 'consent',
     access_type: 'offline',
     response_type: 'code',
     scope: 'openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
    },
   },
  }),
 ],
 callbacks: {
  async jwt({ token, account }: { token: JWT; account: Account | null }) {
   if (account) {
    token.accessToken = account.access_token
    token.idToken = account.id_token
    token.expiresIn = account.expires_in
    token.refreshToken = account.refresh_token
   }
   return token
  },
  async session({ session, token }: { session: Session & { accessToken?: string; idToken?: string; refreshToken?: string; expiresIn?: number }; token: JWT }) {
   if (token.accessToken) {
    session.accessToken = token.accessToken as string
    session.idToken = token.idToken as string
    session.refreshToken = token.refreshToken as string
    session.expiresIn = token.expiresIn as number
   }
   console.log(session)
   return session
  },
 },
})
