import { Request, Response } from 'express';
const { PrismaClient } = require('@prisma/client');
import { verifyRefreshJwt } from '../../middlewares/authentication';

const prisma = new PrismaClient();

// export type userObj = {
//   companyId:number
//   email: string
// }

export const activate = async (req: Request, res: Response) => {
  // let userObj = {
  //   email: '',
  //   companyId: 0
  // }
  const userObj: any = await verifyRefreshJwt(req.body.userToken)
  console.log(userObj, 'userObj')
  const updateUser = await prisma.User.update({
    where: {
      email: userObj?.email
    },
    data: {
      emailVerified: true,
      company_id: userObj?.companyId
    },
  });
  res.send({ status: 200, message: 'Account Activated Successfully' });
}