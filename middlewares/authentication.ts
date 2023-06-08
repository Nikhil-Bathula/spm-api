const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
import { Request, Response } from "express";
dotenv.config();
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authenticate = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        const userObj = {
          id: user?.id,
          email: user?.email,
          companyId: user?.company_id
        }
        const token = jwt.sign(userObj, process.env.SPM_JWT_SECRET);
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.set('Authorization', token);
        res.send({ status: 200, message: 'Loggedin Successfully' });
      } else {
        res.send({ status: 500, message: 'Incorrect Password' });
      }
    })
  } else {
    res.send({ status: 200, message: 'User not found' });
  }
}

export const verifyJwt = (req: Request, res: Response) => {
  jwt.verify(req.body.token, process.env.SPM_JWT_SECRET, (err: Error, response: Response) => {
    if (err) {
      console.log(err, 'error')
    } else {
      console.log(response, 'response')
    }
  })
}