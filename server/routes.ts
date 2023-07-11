import { Request, Response } from "express";
const { Router } = require('express');
import { authenticate } from '../middlewares/authentication';
import { signup } from './controller/signup';
import { resetPassword } from './controller/resetPassword';
import { addProjectMembers } from './controller/addProjectMembers';

const routes = new Router();

routes.post('/authenticate', authenticate);
routes.post('/signup', signup);
routes.post('/resetPassword', resetPassword);
routes.post('/addProjectMembers', addProjectMembers);

export default routes;