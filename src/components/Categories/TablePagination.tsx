import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

export default function TablePagination () {
    return (
        <div>
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">32</span> products
      </p> 

      <Pagination className="w-auto mx-0">
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious href="#" />
            </PaginationItem>

                 <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                 </PaginationItem>
                 <PaginationItem>
                    <PaginationLink href="#" >2</PaginationLink>
                 </PaginationItem>
                 <PaginationItem>
                    <PaginationLink href="#" >3</PaginationLink>
                 </PaginationItem>
            
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            
        </PaginationContent>
      </Pagination>
        </div>
    )
}