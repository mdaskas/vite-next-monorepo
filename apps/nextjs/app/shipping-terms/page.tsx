import { getShippingTerms } from "../actions/shipping-term"
import { ShippingTermsTable } from "./shipping-terms-table"

export default async function ShippingTermsPage() {
  const shippingTerms = await getShippingTerms()

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-foreground">
          Shipping Terms
        </h1>
        <ShippingTermsTable initialData={shippingTerms} />
      </div>
    </div>
  )
}
