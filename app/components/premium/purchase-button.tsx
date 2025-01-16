import { ColorOption } from "@/types/types"
import { getUserSession } from "@/app/lib/googleAuth"
import { createOrRetrieveCustomer } from "@/app/lib/stripe/purchase"

function PurchaseButton({ color }: { color: ColorOption }) {

    const handlePurchase = async () => {
        const session = await getUserSession()
        if (!session) {
            return
        }

        const customer = await createOrRetrieveCustomer(session?.user?.email ?? '')

        const paymentIntent = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerId: customer.id })
        })

        const data = await paymentIntent.json()
        console.log(data)

    }

    return (
        <div onClick={handlePurchase} style={{ backgroundColor: color.value, color: color.text }} className="cursor-pointer text-var-white rounded-xl py-1 px-4 font-bold my-6 text-xl">
            Purchase
        </div>
    )
}

export default PurchaseButton