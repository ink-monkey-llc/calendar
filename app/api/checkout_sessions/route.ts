import { stripe } from '@/app/lib/stripe/purchase'
import { NextResponse, NextRequest } from 'next/server';
import { redirect } from 'next/navigation'


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
            //   success_url: `${headers.origin}/?success=true`,
            //   cancel_url: `${headers.origin}/?canceled=true`,
        });
        return Response.json({ url: session.url }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)
        return new NextResponse('Error creating checkout session', { status: 500 })
    }
}

