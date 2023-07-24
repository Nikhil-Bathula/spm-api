import { Request, Response } from "express";
const { Router } = require('express');
import { authenticate } from '../middlewares/authentication';
import { signup } from './controller/signup';
import { resetPassword } from './controller/resetPassword';
import { addProjectMembers } from './controller/addProjectMembers';
import { activate } from './controller/login';
import {ProjectController} from "./controller/ProjectController";
import {TaskController} from "./controller/TaskController";

import { assignedProjectController } from "./controller/AssignedProjectController";

import { addWatcher } from './controller/addWatcher';



const projectController: ProjectController = new ProjectController()
const taskController: TaskController = new TaskController()

const routes = new Router();

routes.post('/authenticate', authenticate);
routes.post('/signup', signup);
routes.post('/resetPassword', resetPassword);
routes.post('/addProjectMembers', addProjectMembers);
routes.post('/activate', activate);
routes.post('/addWatcher', addWatcher);

routes.get("/projects/:id", (req: Request, res: Response) => {
    console.log(`PARAM : ${req.params.id}`)
    try {
        const id = parseInt(req.params.id)
        console.log(`PARAM INT : ${req.params.id}`)

        projectController.getCompanyProjects(id).then(data => res.json(data))
    }catch (err){
        console.log(err)
        return res.sendStatus(400)
    }
})

routes.get("/tasks/:id", (req: Request, res: Response)=> {
    try {
        const id = parseInt(req.params.id)
        taskController.getAssignedTasks(id).then(data => res.json(data))
    } catch (err){
        console.log(err)
        return res.sendStatus(400)
    }
})


routes.get("/assignedProjects/:id", assignedProjectController)

routes.get("/taskDetail/:id", (req: Request, res: Response) => {

    try {
        taskController.getTaskDetail(parseInt(req.params.id))
            .then(data => res.json({ "data": data }))
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }

})


// routes.get("/assignedProjects/:id", (req: Request, res: Response) => {
//     console.log(`ASSIGNED PROJECTS PATH : ${req.params.id}`)
//     res.sendStatus(204)
// })

    

// routes.post("/createTask", taskController.createTask)
routes.post("/createTask", (req: Request, res: Response) => {
    taskController.createTask(req, res)
})

export default routes;