import { PrismaClient } from "@prisma/client";

export class TaskRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getAssignedTasks(employee_id: number){
        return await this.prisma.task.findMany({
            where: {
                assigned_to: {equals : employee_id}
            }
        })
    }

}