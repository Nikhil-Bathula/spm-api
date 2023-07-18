import {ProjectService} from "../services/ProjectService";

export class ProjectController {
    private projectService: ProjectService

    constructor() {
        this.projectService = new ProjectService()
    }

    async getCompanyProjects(project_id: number){
        console.log(`TYPE OF : ${typeof(await this.projectService.getCompanyProjects(project_id)) }`)
        return await this.projectService.getCompanyProjects(project_id)
    }

}