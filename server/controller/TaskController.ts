import {TaskRepository} from "../repositories/TaskRepository";

export class TaskController {
    private taskRepo: TaskRepository;

    constructor() {
        this.taskRepo = new TaskRepository()
    }

    async getAssignedTasks(employee_id: number){
        return await this.taskRepo.getAssignedTasks(employee_id)
    }

}