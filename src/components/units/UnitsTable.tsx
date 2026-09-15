

import { useGetAllUnit } from "@/hooks/units/useGetAllUnit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


export default function UnitsTable({}) {


const {units, isPendingUnits} = useGetAllUnit();
const displayUnits = units;

if (isPendingUnits) {
    return (
        <div className="p-8 text-center text-slate-500">Loading Units...</div>      
    )
}

return(
    <div>
        <Table>
            <TableHeader>
                <TableHead>Unit Name</TableHead>
                <TableHead>Unit Abbreviation</TableHead>
            </TableHeader>

            <TableBody>
                {displayUnits?.map((units)=>(
                    <TableRow key={units.id}>
                        <TableCell>{units.name}</TableCell>
                        <TableCell>{units.abbreviation}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
)
}