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

    async createTask(obj: any){

        console.log(`INSIDE TASK REPO : ${obj}`)

        const task_data = await await this.prisma.task.create({
            data: {
                ...obj
                // name : "Task-NEW",
                // status_id: 1,
                // project_id: 1,
                // employee_id: 1,
                // assigned_to: 1,
                // description: "desc"
            },
            include: {
                created_by: true
            }
        })
        console.log(`TASK DATA : ${JSON.stringify(task_data)}`)
        return task_data
    }

}