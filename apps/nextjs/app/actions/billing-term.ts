"use server"

import { IBillingTerm } from "./types"

export async function getBillingTerms(): Promise<IBillingTerm[]> {
  const res = await fetch("http://localhost:4000/api/v1/billing-terms", {
    cache: "no-store",
  })
  const result = await res.json()
  return result.data ?? result
}

export async function updateBillingTerm(
  code: string,
  data: { code?: string; description?: string; dueDays?: number }
): Promise<IBillingTerm> {
  const res = await fetch(
    `http://localhost:4000/api/v1/billing-terms/${encodeURIComponent(code)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )
  if (!res.ok) {
    throw new Error("Failed to update billing term")
  }
  return res.json()
}
