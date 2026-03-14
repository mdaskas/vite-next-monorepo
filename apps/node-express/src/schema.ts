import {
    CustomerRepository,
    type CreateCustomerInput,
    type UpdateCustomerInput
} from './repositories/CustomerRepository'
import {
    BillingTermRepository,
    type CreateBillingTermInput,
    type UpdateBillingTermInput
} from './repositories/BillingTermRepository'
import {
    ShippingTermRepository,
    type CreateShippingTermInput,
    type UpdateShippingTermInput
} from './repositories/ShippingTermRepository'
import {
    ProductRepository,
    type CreateProductInput,
    type UpdateProductInput
} from './repositories/ProductRepository'
import {
    ProductCategoryRepository,
    type CreateProductCategoryInput,
    type UpdateProductCategoryInput
} from './repositories/ProductCategoryRepository'

const customerRepo = new CustomerRepository()
const billingTermRepo = new BillingTermRepository()
const shippingTermRepo = new ShippingTermRepository()
const productRepo = new ProductRepository()
const productCategoryRepo = new ProductCategoryRepository()

const typeDefs = `#graphql
type Address {
  id: ID!
  street1: String!
  street2: String
  city: String!
  state: String!
  zip: String!
  country: String!
}

type BillingTerm {
  id: ID!
  code: String!
  description: String!
  dueDays: Int!
}

type ShippingTerm {
  id: ID!
  code: String!
  description: String!
}

type Customer {
  id: ID!
  code: String!
  name: String!
  email: String!
  phone: String!
  billingTermId: BillingTerm!
  shippingTermId: ShippingTerm!
  billToAddress: Address
  shipToAddresses: [Address!]!
}

type ProductCategory {
  id: ID!
  code: String!
  description: String!
}

type Product {
  id: ID!
  code: String!
  description: String!
  price: Float!
  categoryId: Int!
  category: ProductCategory!
  stock: Int!
}

type Query {
  customers: [Customer!]!
  customer(id: ID!): Customer
  billingTerms: [BillingTerm!]!
  billingTerm(id: ID!): BillingTerm
  shippingTerms: [ShippingTerm!]!
  shippingTerm(id: ID!): ShippingTerm
  products: [Product!]!
  product(id: ID!): Product
  productCategories: [ProductCategory!]!
  productCategory(id: ID!): ProductCategory
}

type Mutation {
  createCustomer(input: CreateCustomerInput!): Customer!
  updateCustomer(id: ID!, input: UpdateCustomerInput!): Customer
  deleteCustomer(id: ID!): Customer

  createBillingTerm(input: CreateBillingTermInput!): BillingTerm!
  updateBillingTerm(code: ID!, input: UpdateBillingTermInput!): BillingTerm
  deleteBillingTerm(code: ID!): BillingTerm

  createShippingTerm(input: CreateShippingTermInput!): ShippingTerm!
  updateShippingTerm(code: ID!, input: UpdateShippingTermInput!): ShippingTerm
  deleteShippingTerm(code: ID!): ShippingTerm

  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product
  deleteProduct(id: ID!): Product

  createProductCategory(input: CreateProductCategoryInput!): ProductCategory!
  updateProductCategory(id: ID!, input: UpdateProductCategoryInput!): ProductCategory
  deleteProductCategory(id: ID!): ProductCategory
}

input CreateCustomerInput {
	code: String!
	name: String!
	email: String!
	phone: String
	billingTermId:  Int
	shippingTermId: Int
	billToAddressId: Int
	shipToAddressIds: [Int!]
}

input UpdateCustomerInput {
	code: String
	name: String
	email: String
	phone: String
	billingTermId: Int
	shippingTermId: Int
	billToAddressId: Int
	shipToAddressIds: [Int!]
}

input CreateBillingTermInput {
	code: String!
	description: String!
	dueDays: Int!
}

input UpdateBillingTermInput {
	code: String
	description: String
	dueDays: Int
}

input CreateShippingTermInput {
	code: String!
	description: String!
}

input UpdateShippingTermInput {
	code: String
	description: String
}

input CreateProductInput {
	code: String!
	description: String!
	price: Float!
	categoryId: Int!
	stock: Int!
}

input UpdateProductInput {
	code: String
	description: String
	price: Float
	categoryId: Int
	stock: Int
}

input CreateProductCategoryInput {
	code: String!
	description: String!
}

input UpdateProductCategoryInput {
	code: String
	description: String
}
`

const resolvers = {
    Query: {
        customers: (_: any, __: any) => {
            return customerRepo.findAll()
        },
        customer: (_: any, { id }: { id: number }) =>
            customerRepo.findById(parseInt(id.toString())),
        billingTerms: () => billingTermRepo.findAll(),
        billingTerm: (_: any, { code }: { code: string }) =>
            billingTermRepo.findByCode(code),
        shippingTerms: () => shippingTermRepo.findAll(),
        shippingTerm: (_: any, { code }: { code: string }) =>
            shippingTermRepo.findByCode(code),
        products: () => productRepo.findAll(),
        product: (_: any, { id }: { id: number }) =>
            productRepo.findById(parseInt(id.toString())),
        productCategories: () => productCategoryRepo.findAll(),
        productCategory: (_: any, { id }: { id: number }) =>
            productCategoryRepo.findById(parseInt(id.toString()))
    },
    Mutation: {
        createCustomer: (_: any, { input }: { input: CreateCustomerInput }) =>
            customerRepo.create(input),
        updateCustomer: (
            _: any,
            { id, input }: { id: number; input: UpdateCustomerInput }
        ) => customerRepo.update(id, input),
        deleteCustomer: (_: any, { id }: { id: number }) =>
            customerRepo.delete(id),

        createBillingTerm: (
            _: any,
            { input }: { input: CreateBillingTermInput }
        ) => billingTermRepo.create(input),
        updateBillingTerm: (
            _: any,
            { id, input }: { id: number; input: UpdateBillingTermInput }
        ) => billingTermRepo.update(id, input),
        deleteBillingTerm: (_: any, { id }: { id: number }) =>
            billingTermRepo.delete(id),

        createShippingTerm: (
            _: any,
            { input }: { input: CreateShippingTermInput }
        ) => shippingTermRepo.create(input),
        updateShippingTerm: (
            _: any,
            { id, input }: { id: number; input: UpdateShippingTermInput }
        ) => shippingTermRepo.update(id, input),
        deleteShippingTerm: (_: any, { id }: { id: number }) =>
            shippingTermRepo.delete(id),

        createProduct: (_: any, { input }: { input: CreateProductInput }) =>
            productRepo.create(input),
        updateProduct: (
            _: any,
            { id, input }: { id: number; input: UpdateProductInput }
        ) => productRepo.update(id, input),
        deleteProduct: (_: any, { id }: { id: number }) =>
            productRepo.delete(id),

        createProductCategory: (
            _: any,
            { input }: { input: CreateProductCategoryInput }
        ) => productCategoryRepo.create(input),
        updateProductCategory: (
            _: any,
            { id, input }: { id: number; input: UpdateProductCategoryInput }
        ) => productCategoryRepo.update(id, input),
        deleteProductCategory: (_: any, { id }: { id: number }) =>
            productCategoryRepo.delete(id)
    }
}

export { typeDefs, resolvers }
