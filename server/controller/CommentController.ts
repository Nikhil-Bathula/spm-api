import {Request, Response} from "express";
import {CommentService} from "../services/CommentService";
import {CommmentPost} from "../repositories/CommentRepository";

export class CommentController{
    private commentService: CommentService
    constructor() {
        this.commentService = new CommentService()
    }

    async getCommentsForTask(task_id: number){
        // console.log(`COMMENT CONTROLLER : ${this.commentService.getCommentsForTasks()}`)
        // const data =
        return await this.commentService.getCommentsForTask(task_id)
        // res.sendStatus(204)
    }

    async postCommentOnTask(data: CommmentPost){
        return await this.commentService.postCommentOnTask(data)
    }

    async deleteCommentOnTask(comment_id: number) {
        return await this.commentService.deleteCommentOnTask(comment_id)
    }

    async updateCommentOnTask(data: CommmentPost){
        return await this.commentService.updateCommentOnTask(data)
    }

}