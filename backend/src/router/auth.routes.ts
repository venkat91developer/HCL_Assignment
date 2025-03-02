import { Router } from "express"
import { loginController, refreshTokenController } from "../controller/user.controller";
const router = Router();
router.post('/login',loginController);
router.post('/refresh', refreshTokenController);
export default router;