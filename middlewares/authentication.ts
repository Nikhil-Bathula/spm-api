import {CompanyRepository} from "../server/repositories/CompanyRepository";

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
import { Request, Response } from "express";
dotenv.config();
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const companyRepo: CompanyRepository = new CompanyRepository()

export const authenticate = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })
  const emailVerified = user?.emailVerified;
  console.log(user?.emailVerified, emailVerified, 'user?.emailVerified')
  if(emailVerified === true) {
    if (user) {
      console.log(user, 'user')
      bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (result) {
          const userObj = {
            id: user?.id,
            email: user?.email,
            company_id: user?.company_id
          }
          const company_id_retrieved = companyRepo.findCompanyByDomain(user.email)
          const refreshToken = jwt.sign(userObj, process.env.SPM_JWT_REFRESH)
          if(user.refreshToken === '') {
            const updateRefreshToken = await prisma.user.update({
              where: {
                email: req.body.email,
              },
              data: {
                refreshToken,
                // company_id : company_id_retrieved
              }
            })
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
  } else {
    res.send({ status: 200, message: 'Email not verified' });
  }
}

export const verifyRefreshJwt = (userData: any) => {
  return new Promise((resolve) => {
    jwt.verify(userData, process.env.SPM_JWT_REFRESH, (err: Error, response: Response) => {
      if (err) {
        console.log(err, 'error')
      } else {
        console.log(response, 'response')
        resolve(response);
      }
    })
  })
}

export const verifyJwt = (userData: any) => {
  return new Promise((resolve) => {
    jwt.verify(userData, process.env.SPM_JWT_SECRET, (err: Error, response: Response) => {
      if (err) {
        console.log(err, 'error')
      } else {
        console.log(response, 'response')
        resolve(response);
      }
    })
  })
}