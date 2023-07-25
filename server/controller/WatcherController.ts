import {WatcherService} from "../services/WatcherService";

export class WatcherController{
    private watcherService: WatcherService
    constructor() {
        this.watcherService = new WatcherService()
    }
    async getWatchersForTask(task_id: number){
        return await this.watcherService.getWatchersForTask(task_id)
    }
}