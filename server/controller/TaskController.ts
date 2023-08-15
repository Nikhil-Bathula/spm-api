import { TaskRepository } from "../repositories/TaskRepository";
import { Request, Response } from "express";
import { Prisma, PrismaClient, User } from "@prisma/client";

export class TaskController {
  private taskRepo: TaskRepository;
  private prisma: PrismaClient;
  constructor() {
    this.taskRepo = new TaskRepository()
    this.prisma = new PrismaClient()
    console.log(`TASK CONTROLLER : ${typeof this.taskRepo}`)
  }
  async getAssignedTasks(employee_id: number) {
    return await this.taskRepo.getAssignedTasks(employee_id)
  }
  async createTask(req: Request, res: Response) {
    try {
      return await this.prisma.task.create({
        data: {
          ...req.body
        }
      })
    } catch (err) {
      console.log(`INSIDE CATCH - 39`)
      // @ts-ignore
      const e = err.toString()
      // console.log(`TYPEOF - ${typeof err}`)
      console.log(`TYPEOF - ${e}`)
      // console.log(`TYPEOF - ${JSON.stringify()}`)
      // throw err
      if (err instanceof Prisma.PrismaClientValidationError) {
        // @ts-ignore
        console.log(`CATCH _ VALIDATION ERROR 42 ${err.errorCode}`)
        console.log(`CATCH _ VALIDATION ERROR 42 ${err.message}`)
        // throw err
        res.status(400).json({ "message": "Bad Request", "error": "Missing fields" })
        // return {"status": 400, "message": "Bad Request", "error": "Missing fields"}
      }

    }
  }
  async getAllTasks(req: Request, res: Response) {
    try {
      return await this.prisma.task.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          base64String: true,
          fileName: true,
          created_by: {
            select: {
              name: true
            }
          },
          status: {
            select: {
              name: true
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        // @ts-ignore
        console.log(`CATCH _ VALIDATION ERROR 42 ${error.errorCode}`)
        console.log(`CATCH _ VALIDATION ERROR 42 ${error.message}`)
        // throw err
        res.status(400).json({ "message": "Bad Request", "error": error.message })
      }
    }
  }

  async getTaskDetail(task_id: number) {
    const data = await this.prisma.task.findFirst({
      where: {
        id: {
          equals: task_id
        }
      }
    })
    console.log(`TaskController - 25 : ${JSON.stringify(data)}`)
    return data
  }

  async getAllStatusList() {
    const data = await this.prisma.status.findMany();
    return data
  }

  async assignedTaskToUser(task_id: number, employee_id: number, req: Request, res: Response) {
    const updatedTask = await this.prisma.task.update({
      where: { id: task_id },
      data: { employee_id: employee_id },
    })
    console.log('assignedTaskToUser', updatedTask)
    const getAllTaskList = await this.getAllTasks(req, res);
    return getAllTaskList;
   
  }
}