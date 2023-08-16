import {PrismaClient} from "@prisma/client";
import {Request,Response} from "express";

export type WatcherPost = {
    task_id: number
    employee_id: number
}

export class WatcherRepository{
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    async getWatchersForTask(task_id: number){
        return await this.prisma.watcher.findMany({
            where: {
                task_id: {equals: task_id}
            }, select: {
                id: true,
                task_id: true,
                employee: true,
                created_at: true,
                updated_at: true
            }
        })
    }

    async PostWatchersForTask(data: WatcherPost){

        const watcher = await this.prisma.watcher.create({
            data: {
                ...data
            }
        })
        console.log(JSON.stringify(watcher))
        return watcher;
    }

}