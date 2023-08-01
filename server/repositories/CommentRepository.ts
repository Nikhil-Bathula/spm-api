import {PrismaClient} from "@prisma/client";

export type CommmentPost = {
    text: string
    task_id: number
    employee_id: number
}
export class CommentRepository {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    async getCommentsForTask(task_id: number){
        return await this.prisma.comment.findMany({
            where: {
                task_id: {equals: task_id}
            }, select: {
                id: true,
                text: true,
                task_id: true,
                employee: true,
                created_at: true,
                updated_at: true

            }
        })
    }

    async postCommentOnTask(data: CommmentPost){
        return await this.prisma.comment.create({
            data: {
                ...data
            }
        })
    }
}