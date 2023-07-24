import { Request, Response } from 'express';
const { PrismaClient } = require('@prisma/client');
import { verifyRefreshJwt } from '../../middlewares/authentication';

const prisma = new PrismaClient();

export const activate = async (req: Request, res: Response) => {
  const email = await verifyRefreshJwt(req.body.userToken)
  const updateUser = await prisma.User.update({
    where: {
      email: email
    },
    data: {
      emailVerified: true
    },
  });
  res.send({ status: 200, message: 'Account Activated Successfully' });
}