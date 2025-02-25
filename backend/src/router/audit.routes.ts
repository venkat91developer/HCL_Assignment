import { Router } from "express"
import { AuditDeleteLogsController } from "../controller/audit.controller";
const router = Router();
router.get('',AuditDeleteLogsController);
export default router;