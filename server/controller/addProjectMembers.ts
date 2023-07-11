import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ok } from 'assert';
import { error } from 'console';
const { PrismaClient } = require('@prisma/client');
const { nodemailer }= require('nodemailer');


const prisma = new PrismaClient();

export const addProjectMembers = async (req: Request, res: Response) => {
  try {
     res.send({ status: 200, response: ok, message: 'Entered' });

     
    const verifyUserEmail = await prisma.User.findUnique({
        where: {
          email: req.body.email,
        },
    })

    const verifyProjectDetails= await prisma.Project.findUnique({
        where:{
            name:req.body.projectname
        },
    })

    if (verifyProjectDetails)
    {
        const memberObj={
     
            project_id: verifyProjectDetails?.id,
            user_id:verifyUserEmail?.id
        }
        const addmembers = await prisma.Projects.create({ 
            data:memberObj
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