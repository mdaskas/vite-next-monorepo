import Link from "next/link"
import { Button } from "@repo/ui/components/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table"
import { getProduct } from "@/app/actions/product"
import { IProduct } from "@/app/actions/types"

// Prefetch the first 10 products at build time to generate static pages for them
export async function generateStaticParams() {
  const res = await fetch(
    "http://localhost:4000/api/v1/products?limit=10&offset=0"
  )
  const { data: products }: { data: IProduct[] } = await res.json()
  return products.map((product) => ({ id: product.id.toString() }))
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(parseInt(id, 10))

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link href="/products">
            <Button variant="outline" size="sm">
              &larr; Back to Products
            </Button>
          </Link>
        </div>

        <h1 className="mb-6 text-3xl font-bold text-foreground">
          {product.description}
        </h1>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ID</TableCell>
                <TableCell>{product.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Code</TableCell>
                <TableCell>{product.code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Price</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stock</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Category</TableCell>
                <TableCell>
                  {product.category.description} ({product.category.code})
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
