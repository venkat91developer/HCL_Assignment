import { Router } from "express";
import { check } from "express-validator";
import { 
    addProgramController, 
    deleteProgramController, 
    editProgramController, 
    getProgramByIdController, 
    getProgramController 
} from "../controller/program.controller";

const router = Router();
// Validation rules
const programValidationRules = [
    check("name").notEmpty().withMessage("Name is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("startDate").isISO8601().withMessage("Invalid start date format"),
    check("endDate").isISO8601().withMessage("Invalid end date format"),
    check("budget").isNumeric().withMessage("Budget must be a number"),
];
// Routes
router.get("/", getProgramController);
router.get("/:id", getProgramByIdController);
router.post("/", programValidationRules, addProgramController);
router.put("/:id", programValidationRules, editProgramController);
router.delete("/:id", deleteProgramController);
export default router;
