import { Request, Response } from "express";
const { Router } = require('express');
import { authenticate } from '../middlewares/authentication';
import { signup } from './controller/signup';
import { resetPassword } from './controller/resetPassword';
import { addProjectMembers } from './controller/addProjectMembers';
import { activate } from './controller/login';
import {ProjectController} from "./controller/ProjectController";
import { TaskController } from "./controller/TaskController";

import { assignedProjectController } from "./controller/AssignedProjectController";
import { addWatcher } from './controller/addWatcher';
import {CommentController} from "./controller/CommentController";

import {WatcherController} from "./controller/WatcherController";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";

// import { getUsersByCompanyId } from "./controller/getUsersByCompanyId";
// import {ProjectRepository} from "./repositories/ProjectRepository";
import {CompanyRepository} from "./repositories/CompanyRepository";



import { getUsersByCompanyId } from "./controller/getUsersByCompanyId";


const projectController: ProjectController = new ProjectController()
const taskController: TaskController = new TaskController()
const commentController: CommentController = new CommentController()
const watcherController: WatcherController = new WatcherController()
const authMiddleware: AuthMiddleware = new AuthMiddleware()
// const projectRepo: ProjectRepository = new ProjectRepository()
const companyRepo: CompanyRepository = new CompanyRepository()

const routes = new Router();

routes.post('/authenticate', authenticate);
routes.post('/signup', signup);
routes.post('/resetPassword', resetPassword);
//routes.post('/addProjectMembers', addProjectMembers);
routes.post('/activate', activate);
routes.post('/addWatcher', addWatcher);
routes.get('/getUsersByCompanyId/:id', getUsersByCompanyId);

//routes.post('/addWatcher', addWatcher);


routes.get("/projects/:id", (req: Request, res: Response) => {
  console.log(`PARAM : ${req.params.id}`)
  try {
    const id = parseInt(req.params.id)
    console.log(`PARAM INT : ${req.params.id}`)

    projectController.getCompanyProjects(id).then(data => res.json(data))
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
})

routes.get("/tasks/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    taskController.getAssignedTasks(id).then(data => res.json(data))
  } catch (err) {
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

// routes.get("/taskComments/:id", commentController.getCommentsForTask)
routes.get("/taskComments/:id", (req: Request, res: Response) => {
    try{
        commentController.getCommentsForTask(parseInt(req.params.id)).then(data => res.status(200).json(
            {"data" : data}
        )).catch(err => res.sendStatus(400))
    }catch (err){
        res.sendStatus(400)
    }
})

routes.get("/listWatchers/:id", (req: Request, res: Response) => {
    try {
        watcherController.getWatchersForTask(parseInt(req.params.id))
            .then(data => res.status(200).json({"data": data}))
            .catch(err => res.sendStatus(404))
    }catch (e){
        console.log(e)
        res.status(400).json({"data": []})
    }
})
routes.post("/postComment", (req: Request, res: Response) => {
    try {
        commentController.postCommentOnTask(req.body)
            .then(data => res.status(201).json({"data" : data}))
            .catch(err => res.status(400).json({"data": {"error": "Missing Fields"}}))
    }catch (e){
        console.log(e)
        res.status(400).json({"data": {"error": "Missing Fields"}})
    }
})
routes.post("/createTask", (req: Request, res: Response) => {
  taskController.createTask(req, res).then(() => {
    taskController.getAllTasks(req, res).then(data => {
      res.status(200).json({data, message: 'Task Added Successfully!'});
    })
  })
})

routes.post("/postWatcher", (req: Request, res: Response) => {

    try {
        watcherController.postWatchersForTask(req.body)
            .then(data => res.status(201).json({"data" : data}))
            .catch(err => res.status(400).json({"data": {"error": "Something went wrong"}}))
    }catch (e){
        console.log(e)
        res.status(400).json({"data": {"error": "Something went wrong"}})
    }
})

// <<<<<<< HEAD

// routes.post("/upload", authMiddleware.authenticateUser, (req: Request, res: Response) =>{

// })

// =======
routes.post("/addProjectMembers", (req: Request, res: Response) => {

    try {
        projectController.addMembersToCompanyProjects(req.body)
            .then(data => res.status(201).json({"data" : data}))
            .catch(err => res.status(400).json({"data": {"error": "Something went wrong"}}))
    }catch (e){
        console.log(e)
        res.status(400).json({"data": {"error": "Something went wrong"}})
    }
})

routes.post("/updateComment", (req: Request, res: Response) => {

  try {
      commentController.updateCommentOnTask(req.body)
          .then(data => res.status(201).json({"data" : data}))
          .catch(err => res.status(400).json({"data": {"error": "Something went wrong"}}))
  }catch (e){
      console.log(e)
      res.status(400).json({"data": {"error": "Something went wrong"}})
  }
})


routes.get('/getAllTasks', (req: Request, res: Response) => {
  try {
    taskController.getAllTasks(req, res).then(data => {
      res.json(data)
    })
  } catch(error) {
    return res.sendStatus(400);
  }
});


routes.get('/getUsersByCompanyId/:id', getUsersByCompanyId);


routes.get('/getAllStatusList', (req: Request, res: Response) => {
  try {
    taskController.getAllStatusList().then(data => {
      res.json(data)
    })
  } catch(error) {
    return res.sendStatus(400);
  }
});

routes.post('/assignedTaskToUser', (req: Request, res: Response) => {
  try {
    console.log(req.body, 'req.body')
    const task_id = Number(req.body.taskId)
    const employee_id = Number(req.body.employeeId)
    taskController.assignedTaskToUser(task_id, employee_id).then(data => {
      res.json(data)
    })
  } catch(error) {
    return res.sendStatus(300);
  }
});


routes.delete('/deleteTask/:id', (req: Request, res: Response) => {
  try {
    taskController.deleteTask(parseInt(req.params.id)).then(data => {
      res.sendStatus(204);
    }).catch(err => {
      res.sendStatus(400);
    })

  } catch (error) {
    return res.sendStatus(400);
  }
});

routes.post("/getCompanyByDomain", (req : Request, res: Response) => {
    companyRepo.findCompanyByDomain(req.body.email)
    res.sendStatus(200)
})

routes.get("/projectUsers/:id", (req: Request, res: Response) => {
    projectController.getUsersInAProject(parseInt(req.params.id)).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(400).json({"message" : "Bad Request"})
    })
})



export default routes;