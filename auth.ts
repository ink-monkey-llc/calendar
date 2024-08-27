import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
 interface Session {
  accessToken?: string
  idToken?: string
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
  async jwt({ token, account }: { token: JWT; account: any }) {
   if (account) {
    token.accessToken = account.access_token
    token.idToken = account.id_token
   }
   return token
  },
  async session({ session, token }: { session: Session & { accessToken?: string; idToken?: string }; token: JWT }) {
   if (token.accessToken) {
    session.accessToken = token.accessToken as string
    session.idToken = token.idToken as string
   }
   return session
  },
 },
})