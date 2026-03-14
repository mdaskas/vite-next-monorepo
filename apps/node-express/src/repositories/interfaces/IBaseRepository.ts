import type { prisma } from '@repo/db/lib/prisma'

export interface IBaseRepository {
    getClient(): typeof prisma
}
