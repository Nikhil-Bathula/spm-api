import {CommentRepository, CommmentPost} from "../repositories/CommentRepository";

export class CommentService{
    private commentRepo: CommentRepository
    constructor() {
        this.commentRepo = new CommentRepository()
    }

    async getCommentsForTask(task_id: number){
        return await this.commentRepo.getCommentsForTask(task_id)
    }

    async postCommentOnTask(data: CommmentPost) {
        return await this.commentRepo.postCommentOnTask(data)
    }

    async deleteCommentOnTask(comment_id: number) {
       //TODO check wheather user is authorize to delete this comment
       
        return await this.commentRepo.deleteCommentOnTask(comment_id)
    }
}