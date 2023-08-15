import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ok } from 'assert';
import { error } from 'console';
const { PrismaClient } = require('@prisma/client');
const { nodemailer }= require('nodemailer');


const prisma = new PrismaClient();

export const addWatcher = async (req: Request, res: Response) => {
  try {
    // res.send({ status: 200, response: ok, message: 'Entered' });
    
   //  const checkempwatcher= await prisma.watcher.findUnique({
   //      where:{
   //          task_id:req.body.task_id
   //      },
   //  });
    
   //   if(checkempwatcher.employee_id != req.body.employee_id)
   //   {
        const iswatcher=await prisma.watcher.create({  data: {
           task_id:req.body.task_id,
           employee_id:req.body.employee_id
        }
        });
        res.send({ status: 200, response: ok, message: 'Watcher is created' });
   //   }
   //   else{
   //      res.send({ status: 400, response: error, message: 'Employee is already Watcher of this Task ID' });
   //   }
 
  } catch (error) {
    res.send({ status: 500, response: error, message: 'Internal Server Error' });
  }
}