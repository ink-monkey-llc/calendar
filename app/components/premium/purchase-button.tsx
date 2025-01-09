import { ColorOption } from "@/types/types"

function PurchaseButton({ color }: { color: ColorOption }) {
    return (
        <div style={{ backgroundColor: color.value, color: color.text }} className=" text-var-white rounded-xl py-1 px-4 font-bold my-6 text-xl">
            Purchase
        </div>
    )
}

export default PurchaseButton