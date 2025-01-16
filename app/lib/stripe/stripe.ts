
import Stripe from "stripe";

const SK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''

export const stripe = new Stripe(SK);

export async function checkPremiumStatus(email: string) {
    const customers = await stripe.customers.list({
        email: email,
        limit: 1
    })

    if (customers.data.length === 0) {
        return false
    }

    const customer = customers.data[0]
    return customer.metadata.hasPremium === 'true'
}


export async function createOrRetrieveCustomer(email: string, name?: string) {
    // Check if customer already exists
    const customers = await stripe.customers.list({
        email: email,
        limit: 1
    })

    if (customers.data.length > 0) {
        // Return existing customer
        return customers.data[0]
    }

    // Create new customer
    const customer = await stripe.customers.create({
        email: email,
        name: name
    })

    return customer
}

