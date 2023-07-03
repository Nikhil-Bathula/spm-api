import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ok } from 'assert';
import { error } from 'console';
const { PrismaClient } = require('@prisma/client');
const { nodemailer }= require('nodemailer');


const prisma = new PrismaClient();

export const resetPassword = async (req: Request, res: Response) => {
  try {
   // res.send({ status: 200, response: ok, message: 'Entered' });
    const verifyUserEmail = await prisma.User.findUnique({
        where: {
          email: req.body.email,
        },
    })

    if (verifyUserEmail)
    {
        if(req.body.password==req.body.confirmPassword)
        {
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
                       if(updateUser)
                       {
                                                //   "use strict";
                          const nodemailer = require("nodemailer");

                          const transporter = nodemailer.createTransport({
                            host: "smtp.forwardemail.net",
                            port: 465,
                            secure: true,
                            auth: {
                              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                              user: 'capstonedemo469@gmail.com',
                              pass: 'capstoneMail!'
                            }
                          });

                          // async..await is not allowed in global scope, must use a wrapper
                          async function main() {
                            // send mail with defined transport object
                            const info = await transporter.sendMail({
                              from: '"CapstoneTest" <capstonedemo469@gmail.com>', // sender address
                              to: "gurleenkaur4260@gmail.com", // list of receivers
                              subject: "Hello ✔", // Subject line
                              text: "Hello world?", // plain text body
                              html: "<b>Hello world?</b>", // html body
                            });

                            console.log("Message sent: %s", info.messageId);
                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                            //
                            // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
                            //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
                            //       <https://github.com/forwardemail/preview-email>
                            //
                          }

                          main().catch(console.error);

                       }
                     
                
         
            }
          })
        }
        else{
          res.send({ status: 400, response: error, message: 'Password and confirm password doesnt match' });
        }
    }
 
  } catch (error) {
    res.send({ status: 500, response: error, message: 'Internal Server Error' });
  }
}