import {WatcherRepository} from "../repositories/WatcherRepository";

export class WatcherService{
    private watcherRepo: WatcherRepository
    constructor() {
        this.watcherRepo = new WatcherRepository()
    }
    async getWatchersForTask(task_id: number){
        return await this.watcherRepo.getWatchersForTask(task_id)
    }
}