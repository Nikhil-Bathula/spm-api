import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ok } from 'assert';
import { error } from 'console';
const { PrismaClient } = require('@prisma/client');
const { nodemailer }= require('nodemailer');


const prisma = new PrismaClient();

export const addProjectMembers = async (req: Request, res: Response) => {
  try {
    // res.send({ status: 200, response: ok, message: 'Entered' });

    const verifyProjectDetails= await prisma.project.findUnique({
        where:{
            name:req.body.projectname
        },
    })

    if (verifyProjectDetails)
    {
   
        const addmembers = await prisma.Projects.create({ 
            data:{
              project_id: verifyProjectDetails?.id,
              user_id:req.body.user_id
            }
         });
        res.send({ status: 200, message: 'Employee added successfully to the project' });
    }
    else{
        res.send({ status: 400, response: error, message: 'Project details not found' });
    }
 
  } catch (error) {
    res.send({ status: 500, response: error, message: 'Internal Server Error' });
  }
}