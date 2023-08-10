import { PrismaClient } from "@prisma/client";

export type ProjectMembersPost = {
    project_id: number
    user_id: number
}
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

    async addMembersToCompanyProjects(data: ProjectMembersPost){
        return await this.prisma.projectMembers.create({
            data: {
                ...data
            }
        })
    }
}
