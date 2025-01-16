import { ColorOption } from "@/types/types"
import { getUserSession } from "@/app/lib/googleAuth"
import { createOrRetrieveCustomer } from "@/app/lib/stripe/stripe"

function PurchaseButton({ color }: { color: ColorOption }) {

    return (
        <form action="/api/checkout_sessions" method="POST">
            <button type="submit" style={{ backgroundColor: color.value, color: color.text }} className="cursor-pointer text-var-white rounded-xl py-1 px-4 font-bold my-6 text-xl">
                Purchase
            </button>
        </form>
    )
}

export default PurchaseButton