import { Request, Response } from "express";
const { Router } = require('express');
import { authenticate } from '../middlewares/authentication';
import { signup } from './controller/signup';
import { resetPassword } from './controller/resetPassword';
import {ProjectController} from "./controller/ProjectController";


const projectController: ProjectController = new ProjectController()

const routes = new Router();

routes.post('/authenticate', authenticate);
routes.post('/signup', signup);
routes.post('/resetPassword', resetPassword);

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

    // projectController.getCompanyProjects(parseInt(req.params.id))
})

export default routes;