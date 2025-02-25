import { Router } from "express";
import { addProgramController, deleteProgramController, editProgramController, getProgramController } from "../controller/program.controller";
const router = Router();

router.get('',getProgramController);
router.post('',addProgramController);
router.delete('/:id',deleteProgramController);
router.put('/:id',editProgramController);

export default router;
