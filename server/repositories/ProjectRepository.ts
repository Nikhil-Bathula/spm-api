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

    async findProjectByDomain(domain: String){
        // const company
    }

    async getUsersInAProject(project_id: number){

        console.log(`PROJECT ID : ${project_id}`)
        return await this.prisma.projectMembers.findMany({
            where: {
                project_id : {equals: project_id}
            }, include : {
                users : true
            }
        })
        // console.log(`USERS - 41 ${JSON.stringify(users)}`)

        // return users;

        //     await this.prisma.user.findMany({
        //     where : {
        //         projectmembers: {
        //             project_
        //         }
        //     }
        // })

        // return await this.prisma.project.findFirst({
        //     where: {
        //         id : {equals: project_id}
        //     }, select : {
        //         members: true
        //     }
        // })
    }
}
