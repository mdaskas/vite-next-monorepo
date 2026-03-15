import { getBillingTerms } from "../actions/billing-term"
import { BillingTermsTable } from "./billing-terms-table"

export default async function BillingTermsPage() {
  const billingTerms = await getBillingTerms()

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-foreground">
          Billing Terms
        </h1>
        <BillingTermsTable initialData={billingTerms} />
      </div>
    </div>
  )
}
