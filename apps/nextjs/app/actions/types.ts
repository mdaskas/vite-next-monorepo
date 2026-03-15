import type {
  CustomerModel,
  BillingTermModel,
  ShippingTermModel,
  AddressModel,
  ProductModel,
  ProductCategoryModel,
} from "@repo/db/prisma/generated/prisma/models"

export interface IPaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}

export type ICustomer = Omit<CustomerModel, "createdAt" | "updatedAt"> & {
  billingTerm: IBillingTerm | null
  shippingTerm: IShippingTerm | null
  billToAddress: IAddress | null
  shipToAddresses: IAddress[]
}

export type IAddress = Omit<AddressModel, "createdAt" | "updatedAt">

export type IBillingTerm = Omit<BillingTermModel, "createdAt" | "updatedAt">

export type IShippingTerm = Omit<ShippingTermModel, "createdAt" | "updatedAt">

// ***************** Product Types *****************
export type IProduct = Omit<ProductModel, "createdAt" | "updatedAt"> & {
  category: IProductCategory
}
export type IProductCategory = Omit<
  ProductCategoryModel,
  "createdAt" | "updatedAt"
>
