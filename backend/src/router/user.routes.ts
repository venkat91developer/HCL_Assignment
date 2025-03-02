import { Router } from "express";
import {  checkEmailController, createUserController, getUserController, loginController } from "../controller/user.controller";
const router = Router();
router.post('/createUser',createUserController);
router.get('/getUser/:id',getUserController);
router.get('/checkEmail',checkEmailController);
router.post('/login',loginController);
export default router;