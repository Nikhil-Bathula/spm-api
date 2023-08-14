import {Prisma, PrismaClient, User} from "@prisma/client";

// const userType = {
//     id : Number
//     name : "Task-NEW",
//     status_id: 1,
//     project_id: 1,
//     employee_id: 1,
//     assigned_to: 1,
//     description: "desc"
// }
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

    async createTask(obj: any) {

        console.log(`INSIDE TASK REPO : ${JSON.stringify(obj)}`)

        try {
            console.log(`INSIDE TRY - 24`)
            return await this.prisma.user.create({
                data: {
                    ...obj
                    // name : "Task-NEW",
                    // status_id: 1,
                    // project_id: 1,
                    // employee_id: 1,
                    // assigned_to: 1,
                    // description: "desc"
                }
            })
        } catch (err){
            console.log(`INSIDE CATCH - 39`)
            // @ts-ignore
            const e = err.toString()
            // console.log(`TYPEOF - ${typeof err}`)
            // console.log(`TYPEOF - ${e}`)
            // console.log(`TYPEOF - ${JSON.stringify()}`)
            // throw err
            if(err instanceof Prisma.PrismaClientValidationError){
                // @ts-ignore
                console.log(`CATCH _ VALIDATION ERROR 42 ${err.errorCode}`)
                // console.log(`CATCH _ VALIDATION ERROR 42 ${err.message}`)
                // throw err
                return {"status": 400, "message": "Bad Request", "error": "Missing fields"}
            }

        }
    }

    async delCommentOnTask(comm_id: number) {
        return await this.prisma.comment.delete({
            where: {
                id:comm_id
            }
        })
    }

}