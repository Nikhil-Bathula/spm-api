import {TaskRepository} from "../repositories/TaskRepository";
import {Request, Response} from "express";

export class TaskController {
    private taskRepo: TaskRepository;

    constructor() {
        this.taskRepo = new TaskRepository()
    }
    async getAssignedTasks(employee_id: number){
        return await this.taskRepo.getAssignedTasks(employee_id)
    }
    async createTask(req: Request, res: Response){
        // console.log(`DATA : ${{...req.body}}`)
        console.log(`DATA : ${req.body.name}`)
        try {
            console.log(`CALLING repo`)
            const tss_repo = await this.taskRepo.createTask(req.body)
            // console.log(`CALLED repo ${JSON.stringify(tss_repo?.status)}`)
        } catch (err) {
            console.log(`ERR TSController: ${err}`)
            res.sendStatus(400)
        }
        res.sendStatus(201)
    }
}