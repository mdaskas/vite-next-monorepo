"use server"

import { IPaginatedResponse, ICustomer } from "./types"

export async function getCustomers(
  limit: number,
  offset: number
): Promise<IPaginatedResponse<ICustomer>> {
  const res = await fetch(
    `http://localhost:4000/api/v1/customers?limit=${limit}&offset=${offset}`
  )
  return res.json()
}

export async function getCustomer(id: string): Promise<ICustomer> {
  const res = await fetch(`http://localhost:4000/api/v1/customers/${id}`)
  if (!res.ok) {
    throw new Error("Customer not found")
  }
  return res.json()
}
