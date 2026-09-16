
import { StockMovementFormValues, stockMovementSchema } from "@/schemas/stockMovementSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function StockMovementForm() {
    const form = useForm<StockMovementFormValues> ({
        resolver: zodResolver (stockMovementSchema),
        defaultValues: {
            product_id: "",
            type: "IN",
            quantity: 0,
            note: "",
        }
    })

    return <div>stock Movement Form</div>
}