const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashPassword) => {
      if (err) {
        res.send({ status: 500, response: err, message: 'Error While Password Hashing' });
      } else {
        req.body.password = hashPassword;
        const user = await prisma.User.create({ data: req.body });
        console.log(user, 'user')
        const userEmail = user.email;
        const userToken = jwt.sign(userEmail, process.env.SPM_JWT_REFRESH)
        const transporter = nodemailer.createTransport({
          host: "smtp.forwardemail.net",
          port: 465,
          secure: true,
          service: "gmail",
          auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'capstonedemo469@gmail.com',
            pass: 'wupmoxmahtebuegi'
          }
        });
        console.log(transporter, 'transporter')
        var mailOptions = {
          from: 'capstonedemo469@gmail.com',
          to: req.body.email,
          subject: 'Verify your Email',
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Email Verification</title>
            <style type="text/css">
            img {
            max-width: 100%;
            }
            body {
            -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
            }
            body {
            background-color: #f6f6f6;
            }
            @media only screen and (max-width: 640px) {
              body {
                padding: 0 !important;
              }
              h1 {
                font-weight: 800 !important; margin: 20px 0 5px !important;
              }
              h2 {
                font-weight: 800 !important; margin: 20px 0 5px !important;
              }
              h3 {
                font-weight: 800 !important; margin: 20px 0 5px !important;
              }
              h4 {
                font-weight: 800 !important; margin: 20px 0 5px !important;
              }
              h1 {
                font-size: 22px !important;
              }
              h2 {
                font-size: 18px !important;
              }
              h3 {
                font-size: 16px !important;
              }
              .container {
                padding: 0 !important; width: 100% !important;
              }
              .content {
                padding: 0 !important;
              }
              .content-wrap {
                padding: 10px !important;
              }
              .invoice {
                width: 100% !important;
              }
            }
            </style>
          </head>
          <body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
            <table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
                <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
                  <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <button><a href="http://localhost:3000/activate/${userToken}">Verify Email</a></button>  
                  <div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                      </div></div>
                </td>
                <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
              </tr>
            </table>
          </body>
        </html>`
        };

        transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.send({ status: 200, message: 'User Created Successfully!' });
      }
    })
  } catch (error) {
    res.send({ status: 500, response: error, message: 'Internal Server Error' });
  }
}