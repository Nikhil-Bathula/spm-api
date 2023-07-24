import {TaskRepository} from "../repositories/TaskRepository";
import { PrismaClient } from "@prisma/client";
    
export class TaskController {
    private taskRepo: TaskRepository;
    private prisma: PrismaClient;

    constructor() {
        this.taskRepo = new TaskRepository()
        this.prisma = new PrismaClient()
    }

    async getAssignedTasks(employee_id: number){
        return await this.taskRepo.getAssignedTasks(employee_id)
    }

    async getTaskDetail(task_id: number) {
        const data = await this.prisma.task.findFirst({
            where: {
                id: {
                    equals: task_id
                }
            }
        })
        console.log(`TaskController - 25 : ${JSON.stringify(data)}`)
        
       return data

    }
}