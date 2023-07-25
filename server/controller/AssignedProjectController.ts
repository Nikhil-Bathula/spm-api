import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


// 1. You will need to capture a request - Add a route '/assignedProjects/:id'
// 2. Take parameters from a request (eg. employee_id)

// 3. Write a prisma query for getting the data from the database
// 4. Format the data as required in the response

const prisma = new PrismaClient();

export const assignedProjectController = async (req: Request , res: Response) => {
    console.log(`ASSIGNED PROJECT CONTROLLER : ${req.params.id}`)

 
    // Example query to fetch assigned tasks of a user
    try {
      const assigned_projects = await prisma.project.findMany({
        where: {
          members: {
            some: {
              id: {
              in : [Number(req.params.id)]
            }
          }
        }
      }
      })
      
      console.log(`TRY 42 : ${JSON.stringify(assigned_projects)}`)

      res.send(assigned_projects)

    } catch (error) {
      console.error('Error retrieving assigned tasks:', error);
      throw error;
    }

}