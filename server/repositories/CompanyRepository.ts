import { PrismaClient } from "@prisma/client";

export class CompanyRepository {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

}