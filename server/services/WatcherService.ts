import {WatcherPost, WatcherRepository} from "../repositories/WatcherRepository";
import {Request,Response} from "express"

export class WatcherService{
    private watcherRepo: WatcherRepository
    constructor() {
        this.watcherRepo = new WatcherRepository()
    }
    async getWatchersForTask(task_id: number){
        return await this.watcherRepo.getWatchersForTask(task_id)
    }
    async PostWatchersForTask(data:WatcherPost){
        return await this.watcherRepo.PostWatchersForTask(data)
    }
}