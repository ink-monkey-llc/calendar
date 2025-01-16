import { stripe } from '@/app/lib/stripe/purchase'
import { auth } from '@/auth'
import { createOrRetrieveCustomer } from '@/app/lib/stripe/purchase'
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        const session = await auth()

        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const customer = await createOrRetrieveCustomer(
            session.user.email,
            session.user.name ?? undefined
        )

        const paymentIntent = await stripe.paymentIntents.create({
            customer: customer.id,
            amount: 99,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId: session.user.email
            }
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        console.error('Error:', error)
        return new NextResponse('Error creating payment intent', { status: 500 })
    }
} 