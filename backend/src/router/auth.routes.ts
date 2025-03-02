import { Router } from "express"
import { loginController } from "../controller/user.controller";
const router = Router();
router.post('/login',loginController);
export default router;