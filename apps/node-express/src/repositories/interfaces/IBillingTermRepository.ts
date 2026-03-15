import type { IBillingTermDTO } from '../../data/dto/BillingTermDTO'
import type {
    CreateBillingTermInput,
    UpdateBillingTermInput
} from '../BillingTermRepository'

export interface IBillingTermRepository {
    findAll(limit?: number, offset?: number): Promise<IBillingTermDTO[]>
    count(): Promise<number>
    findById(id: number): Promise<IBillingTermDTO | null>
    findByCode(code: string): Promise<IBillingTermDTO | null>
    create(input: CreateBillingTermInput): Promise<IBillingTermDTO>
    update(id: number, input: UpdateBillingTermInput): Promise<IBillingTermDTO>
    delete(id: number): Promise<IBillingTermDTO | null>
}
