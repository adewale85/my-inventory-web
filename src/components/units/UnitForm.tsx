

//    interface SupplierFormProps {
//     form: UseFormReturn<SupplierFormValues>
// }

import { UnitFormValues } from "@/schemas/unitSchema"
import { UseFormReturn } from "react-hook-form"

interface UnitFormProps {
    form: UseFormReturn<UnitFormValues>
}

export default function UnitForm ({form,}: UnitFormProps)  {
return(
    <>

    <div className="grid gap-2">
    <label htmlFor="name">Unit Name</label>

    <input 
    id="name" 
    placeholder="Enter unit name"
    {...form.register("name")}
    />

    {form.formState.errors.name && (
        <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
        </p>
    )}
    </div>


    <div className="grid gap-2">
    <label htmlFor="abbreviation">Abbreviation</label>

    <input 
    id="abbreviation" 
    placeholder="Enter unit abbreviation"
    {...form.register("abbreviation")}
    />

    {form.formState.errors.abbreviation && (
        <p className="text-sm text-red-500">
            {form.formState.errors.abbreviation.message}
        </p>
    )}
    </div>

    </>
)
}