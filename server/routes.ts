import { Request, Response } from "express";
const { Router } = require('express');
import { authenticate } from '../middlewares/authentication';
import { signup } from './controller/signup';

const routes = new Router();

routes.post('/authenticate', authenticate);
routes.post('/signup', signup);

export default routes;