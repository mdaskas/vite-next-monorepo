"use server"

import { IPaginatedResponse, IProductCategory } from "./types"

export async function getProductCategories(
  limit: number,
  offset: number
): Promise<IPaginatedResponse<IProductCategory>> {
  const res = await fetch(
    `http://localhost:4000/api/v1/product-categories?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  )
  return res.json()
}

export async function getProductCategory(
  id: string
): Promise<IProductCategory> {
  const res = await fetch(
    `http://localhost:4000/api/v1/product-categories/${id}`,
    { cache: "no-store" }
  )
  if (!res.ok) {
    throw new Error("Product category not found")
  }
  return res.json()
}
