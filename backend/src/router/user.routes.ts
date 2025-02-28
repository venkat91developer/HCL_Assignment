import { Router } from "express";
import { createUserController, getUserController } from "../controller/user.controller";
const router = Router();
router.get('createUser',createUserController);
router.get('getUser',getUserController);
export default router;