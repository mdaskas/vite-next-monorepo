"use server"

import { IShippingTerm } from "./types"

export async function getShippingTerms(): Promise<IShippingTerm[]> {
  const res = await fetch("http://localhost:4000/api/v1/shipping-terms", {
    cache: "no-store",
  })
  const result = await res.json()
  return result.data ?? result
}

export async function updateShippingTerm(
  code: string,
  data: { code?: string; description?: string }
): Promise<IShippingTerm> {
  const res = await fetch(
    `http://localhost:4000/api/v1/shipping-terms/${encodeURIComponent(code)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )
  if (!res.ok) {
    throw new Error("Failed to update shipping term")
  }
  return res.json()
}
