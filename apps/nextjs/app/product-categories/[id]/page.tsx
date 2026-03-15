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
import { getProductCategory } from "@/app/actions/product-category"

export default async function ProductCategoryDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const category = await getProductCategory(id)

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link href="/product-categories">
            <Button variant="outline" size="sm">
              &larr; Back to Product Categories
            </Button>
          </Link>
        </div>

        <h1 className="mb-6 text-3xl font-bold text-foreground">
          {category.description}
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
                <TableCell>{category.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Code</TableCell>
                <TableCell>{category.code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell>{category.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
