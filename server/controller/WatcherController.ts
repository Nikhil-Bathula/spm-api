import { WatcherPost } from "../repositories/WatcherRepository";
import {WatcherService} from "../services/WatcherService";
import {Request,Response} from "express"

export class WatcherController{
    private watcherService: WatcherService
    constructor() {
        this.watcherService = new WatcherService()
    }
    async getWatchersForTask(task_id: number){
        return await this.watcherService.getWatchersForTask(task_id)
    }

    async postWatchersForTask(data: WatcherPost){
        return await this.watcherService.PostWatchersForTask(data)
    }


}