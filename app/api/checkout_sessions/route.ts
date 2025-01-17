
import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth'
import { prisma } from '@/app/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')


export async function POST(req: NextRequest, res: NextResponse) {
    const authSession = await auth()
    try {
        if (!authSession?.user?.email || !authSession?.user?.id) {
            return new NextResponse('User not authenticated', { status: 401 })
        }
        const reqUrl = req.url
        const reqOrigin = req.headers.get('origin')
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1Qgr92072WaQEmGl32bCUtFS',
                    quantity: 1,
                },
            ],
            customer_email: authSession?.user?.email,
            client_reference_id: authSession?.user?.id,
            mode: 'payment',
            success_url: `${reqUrl}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${reqOrigin}/cal`,
        });
        if (!session.url) {
            return new NextResponse('Error creating checkout session', { status: 500 })
        }
        // console.log('stripe session', session)
        return Response.redirect(session.url)
    } catch (error) {
        console.error('Error:', error)
        return new NextResponse('Error creating checkout session', { status: 500 })
    }
}
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const sessionId = searchParams.get('session_id')

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Missing session_id parameter' },
                { status: 400 }
            )
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId)
        // console.log('stripe session after purchase', session)

        if (session.payment_status === 'paid' && session.client_reference_id) {
            const updatedUser = await prisma.user.update({
                where: {
                    id: session.client_reference_id
                },
                data: {
                    isPremium: true,
                    stripeId: session.client_reference_id
                }
            })

            if (!updatedUser) {
                return NextResponse.json(
                    { error: 'Failed to update user' },
                    { status: 500 }
                )
            }
        }
        const reqUrl = new URL(request.url)
        const redirectUrl = reqUrl.origin + '/cal'

        return Response.redirect(redirectUrl)
    } catch (error) {
        console.error('Error retrieving checkout session:', error)
        return NextResponse.json(
            { error: 'Error retrieving checkout session' },
            { status: 500 }
        )
    }
} 