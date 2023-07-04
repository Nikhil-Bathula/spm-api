import {ProjectRepository} from "../repositories/ProjectRepository";

export class ProjectService {
    private projectRepo: ProjectRepository

    constructor() {
        this.projectRepo = new ProjectRepository()
    }

    async getCompanyProjects(company_id: number){
        return await this.projectRepo.getCompanyProjects(company_id)
    }
}