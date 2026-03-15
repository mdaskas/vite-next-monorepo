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
import { IAddress } from "@/app/actions/types"
import { getCustomer } from "@/app/actions/customer"

function formatAddress(address: IAddress | null) {
  if (!address) return "—"
  const parts = [address.street1]
  if (address.street2) parts.push(address.street2)
  parts.push(`${address.city}, ${address.state} ${address.zip}`)
  if (address.country !== "US") parts.push(address.country)
  return parts.join(", ")
}

export default async function CustomerDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const customer = await getCustomer(id)

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link href="/customers">
            <Button variant="outline" size="sm">
              &larr; Back to Customers
            </Button>
          </Link>
        </div>

        <h1 className="mb-6 text-3xl font-bold text-foreground">
          {customer.name}
        </h1>

        <div className="mb-8 rounded-lg border border-border bg-card">
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
                <TableCell>{customer.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Code</TableCell>
                <TableCell>{customer.code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Name</TableCell>
                <TableCell>{customer.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{customer.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phone</TableCell>
                <TableCell>{customer.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Billing Term</TableCell>
                <TableCell>
                  {customer.billingTerm
                    ? `${customer.billingTerm.description} (${customer.billingTerm.code}) — ${customer.billingTerm.dueDays} days`
                    : "—"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Shipping Term</TableCell>
                <TableCell>
                  {customer.shippingTerm
                    ? `${customer.shippingTerm.description} (${customer.shippingTerm.code})`
                    : "—"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bill-To Address</TableCell>
                <TableCell>{formatAddress(customer.billToAddress)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {customer.shipToAddresses.length > 0 && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Ship-To Addresses
            </h2>
            <div className="rounded-lg border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Street</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Zip</TableHead>
                    <TableHead>Country</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.shipToAddresses.map((addr) => (
                    <TableRow key={addr.id}>
                      <TableCell>
                        {addr.street1}
                        {addr.street2 ? `, ${addr.street2}` : ""}
                      </TableCell>
                      <TableCell>{addr.city}</TableCell>
                      <TableCell>{addr.state}</TableCell>
                      <TableCell>{addr.zip}</TableCell>
                      <TableCell>{addr.country}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
