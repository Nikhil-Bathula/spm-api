import { Request, Response } from "express";
const { Router } = require('express');
import { authenticate } from '../middlewares/authentication';
import { signup } from './controller/signup';
import { resetPassword } from './controller/resetPassword';
import { activate } from './controller/login';
import {ProjectController} from "./controller/ProjectController";
import {TaskController} from "./controller/TaskController";


const projectController: ProjectController = new ProjectController()
const taskController: TaskController = new TaskController()

const routes = new Router();

routes.post('/authenticate', authenticate);
routes.post('/signup', signup);
routes.post('/resetPassword', resetPassword);
routes.post('/activate', activate);

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

export default routes;