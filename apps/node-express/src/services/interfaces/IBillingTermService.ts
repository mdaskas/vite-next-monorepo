import type { IBillingTermDTO } from '../../data/dto/BillingTermDTO'
import type {
    CreateBillingTermInput,
    UpdateBillingTermInput
} from '@/repositories/BillingTermRepository'

export interface PaginatedBillingTerms {
    data: IBillingTermDTO[]
    total: number
    limit: number
    offset: number
}

export interface IBillingTermService {
    getAll(limit?: number, offset?: number): Promise<PaginatedBillingTerms>
    getById(id: number): Promise<IBillingTermDTO>
    getByCode(code: string): Promise<IBillingTermDTO>
    create(input: CreateBillingTermInput): Promise<IBillingTermDTO>
    update(id: number, input: UpdateBillingTermInput): Promise<IBillingTermDTO>
    delete(id: number): Promise<IBillingTermDTO | null>
}
