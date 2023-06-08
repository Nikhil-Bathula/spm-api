import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashPassword) => {
      if (err) {
        res.send({ status: 500, response: err, message: 'Error While Password Hashing' });
      } else {
        req.body.password = hashPassword;
        const user = await prisma.User.create({ data: req.body });
        res.send({ status: 200, message: 'User Created Successfully!' });
      }
    })
  } catch (error) {
    res.send({ status: 500, response: error, message: 'Internal Server Error' });
  }
}