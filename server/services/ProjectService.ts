import {ProjectRepository} from "../repositories/ProjectRepository";
import {Project} from "@prisma/client";

export class ProjectService {
    private projectRepo: ProjectRepository
    constructor() {
        this.projectRepo = new ProjectRepository()
    }
    async getCompanyProjects(company_id: number): Promise<object> {
        return await this.projectRepo.getCompanyProjects(company_id)
    }
}