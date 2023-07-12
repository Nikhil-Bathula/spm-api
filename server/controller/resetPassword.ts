import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ok } from 'assert';
import { error } from 'console';
const { PrismaClient } = require('@prisma/client');
const { nodemailer } = require('nodemailer');


const prisma = new PrismaClient();

export const resetPassword = async (req: Request, res: Response) => {
  try {
    // res.send({ status: 200, response: ok, message: 'Entered' });
    const verifyUserEmail = await prisma.User.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (verifyUserEmail) {
        bcrypt.hash(req.body.password, 10, async (err, hashPassword) => {
          if (err) {
            res.send({ status: 500, response: err, message: 'Error While Password Hashing' });
          } else {

            req.body.password = hashPassword;
            // const user = await prisma.User.create({ data: req.body });
            // res.send({ status: 200, message: 'User Created Successfully!' });

            const updateUser = await prisma.User.update({
              where: {
                email: req.body.email,
              },
              data: {
                password: req.body.password,
              },
            });

            res.send({ status: 200, message: 'User password updated Successfully!' });
            // if(updateUser)
            // {
            //   var transporter = nodemailer.createTransport({
            //       service: 'gmail',
            //       auth: {
            //         user: 'capstonedemo469@gmail.com',
            //         pass: 'capstoneMail!'
            //       }
            //     });

            //     var mailOptions = {
            //       from: 'capstonedemo469@gmail.com',
            //       to: 'gkaur6575@conestogac.on.ca',
            //       subject: 'Sending Email using Node.js',
            //       text: 'That was easy!'
            //     };

            //     transporter.sendMail(mailOptions, (error: any, info: { response: string; })=>{
            //       if (error) {
            //         console.log(error);
            //       } else {
            //         console.log('Email sent: ' + info.response);
            //       }
            //     });
            // }



          }
        })
    } else {
      res.send({ status: 500, response: {}, message: 'Email-ID not found' });
    }

  } catch (error) {
    res.send({ status: 500, response: error, message: 'Internal Server Error' });
  }
}