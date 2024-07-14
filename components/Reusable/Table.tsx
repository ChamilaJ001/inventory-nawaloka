import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableComp({ data }: any) {
  return (
    <>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-bold">Product Code</TableHead>
            <TableHead className="font-bold text-center">
              Product Name
            </TableHead>
            <TableHead className="font-bold text-right">Quantity</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.products?.map((product: any, index: any) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{product?.code}</TableCell>
              <TableCell className="text-center">{product?.name}</TableCell>
              <TableCell className="text-right">
                ×{product?.saleQuantity}
              </TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-50">
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">Rs.{data?.total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
