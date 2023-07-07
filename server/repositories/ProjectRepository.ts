import { PrismaClient } from "@prisma/client";

export class ProjectRepository {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    async getCompanyProjects(company_id: number){
        return await this.prisma.project.findMany({
            where: {
                company_id: { equals: company_id }
            }
        })
    }
}
