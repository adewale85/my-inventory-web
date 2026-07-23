import { Badge } from "../ui/badge";
import { PackagePlus, PackageMinus, Undo2, Settings2,
  Trash2,} from 'lucide-react';


export default function MovementTypeBadge({ type }: Props) {
  switch (type.toLowerCase()) {
    case "purchase":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
        <PackagePlus className="h-3.5 w-3.5" />
          Purchase
        </Badge>
      );

    case "consumption":
      return (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
        <PackageMinus className="h-3.5 w-3.5" />
          Consumption
        </Badge>
      );

    case "return":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
           <Undo2 className="h-3.5 w-3.5" />
          Return
        </Badge>
      );

    case "adjustment":
      return (
        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
        <Settings2 className="h-3.5 w-3.5" />
          Adjustment
        </Badge>
      );

    case "waste":
      return (
        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">
          <Trash2 className="h-3.5 w-3.5" />
          Waste
        </Badge>
      );

      default: return <Badge variant="outline">{type}</Badge>;
  }
}
