"use server"

import { IPaginatedResponse, IProduct } from "./types"

export async function getProducts(
  limit: number,
  offset: number
): Promise<IPaginatedResponse<IProduct>> {
  const res = await fetch(
    `http://localhost:4000/api/v1/products?limit=${limit}&offset=${offset}`
  )
  return res.json()
}

export async function getProduct(id: number): Promise<IProduct> {
  const res = await fetch(`http://localhost:4000/api/v1/products/${id}`)
  if (!res.ok) {
    throw new Error(`Product not found`)
  }
  return res.json()
}
