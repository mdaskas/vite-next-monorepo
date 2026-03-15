import type { CustomerWithRelations } from '@repotypes/ICustomerRepository'
import type {
    CreateCustomerInput,
    UpdateCustomerInput
} from '@repo/CustomerRepository'

export interface PaginatedCustomers {
    data: CustomerWithRelations[]
    total: number
    limit: number
    offset: number
}

export interface ICustomerService {
    getAll(limit?: number, offset?: number): Promise<PaginatedCustomers>
    getById(id: number): Promise<CustomerWithRelations>
    getByCode(code: string): Promise<CustomerWithRelations | null>
    getByEmail(email: string): Promise<CustomerWithRelations | null>
    create(input: CreateCustomerInput): Promise<CustomerWithRelations>
    update(
        id: number,
        input: UpdateCustomerInput
    ): Promise<CustomerWithRelations>
    delete(id: number): Promise<CustomerWithRelations | null>
}
