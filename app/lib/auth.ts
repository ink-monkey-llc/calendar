import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getServerSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''
const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? ''

export const config = {
 providers: [
  GoogleProvider({
   clientId: clientId,
   clientSecret: clientSecret,
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
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
 return getServerSession(...args, config)
}
