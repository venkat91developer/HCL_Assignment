import { Router } from "express";
import { checkUserNameController, createUserController, getUserController, loginController } from "../controller/user.controller";
const router = Router();
router.post('/createUser',createUserController);
router.get('/getUser/:id',getUserController);
router.get('/checkUserName',checkUserNameController);
router.post('/login',loginController);
export default router;