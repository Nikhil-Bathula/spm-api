import { Request, Response } from "express";
const { Router } = require('express');
import { authenticate } from '../middlewares/authentication';
import { signup } from './controller/signup';
import { resetPassword } from './controller/resetPassword';
import { activate } from './controller/login';


const routes = new Router();

routes.post('/authenticate', authenticate);
routes.post('/signup', signup);
routes.post('/resetPassword', resetPassword);
routes.post('/activate', activate);

export default routes;