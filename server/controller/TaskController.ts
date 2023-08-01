import { TaskRepository } from "../repositories/TaskRepository";
import { Request, Response } from "express";
import { Prisma, PrismaClient, User } from "@prisma/client";

export class TaskController {
  private taskRepo: TaskRepository;
  private prisma: PrismaClient;
  constructor() {
    this.taskRepo = new TaskRepository()
    this.prisma = new PrismaClient()
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
      // @ts-ignore
      const e = err.toString()
      if (err instanceof Prisma.PrismaClientValidationError) {
        // @ts-ignore
        console.log(`CATCH _ VALIDATION ERROR 42 ${err.errorCode}`)
        console.log(`CATCH _ VALIDATION ERROR 42 ${err.message}`)
        // throw err
        res.status(400).json({ "message": "Bad Request", "error": "Missing fields" })
      }

    }
  }
  async getAllTasks(req:Request, res: Response) {
      try {
        return await this.prisma.task.findMany({
          select: {
            name: true,
            description: true,
            status: {
              select: {
                name: true
              }
            }
          }
        });
      } catch(error) {
        if (error instanceof Prisma.PrismaClientValidationError) {
          // @ts-ignore
          console.log(`CATCH _ VALIDATION ERROR 42 ${error.errorCode}`)
          console.log(`CATCH _ VALIDATION ERROR 42 ${error.message}`)
          // throw err
          res.status(400).json({ "message": "Bad Request", "error": error.message })
        }
      }
    }
}