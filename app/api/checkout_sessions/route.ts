
import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')

export async function POST(req: NextRequest) {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1Qgr92072WaQEmGl32bCUtFS',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/cal`,
            //   cancel_url: `${headers.origin}/?canceled=true`,
        });
        if (!session.url) {
            return new NextResponse('Error creating checkout session', { status: 500 })
        }
        return Response.redirect(session.url)
    } catch (error) {
        console.error('Error:', error)
        return new NextResponse('Error creating checkout session', { status: 500 })
    }
}

