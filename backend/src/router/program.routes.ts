import { Router } from "express";
import { check } from "express-validator";
import { 
    addParticipantController,
    addProgramController, 
    deleteParticipantController, 
    deleteProgramController, 
    editParticipantController, 
    editProgramController, 
    getParticipantsController, 
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
const participantValidationRules = [
    check("name").notEmpty().withMessage("Name is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("startDate").isISO8601().withMessage("Invalid start date format"),
    check("endDate").isISO8601().withMessage("Invalid end date format"),
    check("budget").isNumeric().withMessage("Budget must be a number"),
];

// Routes
router.get("/", getProgramController);
router.post("/", programValidationRules, addProgramController);
router.put("/:id", programValidationRules, editProgramController);
router.delete("/:id", deleteProgramController);
router.get("/participant", getParticipantsController);
router.post("/participant", participantValidationRules, addParticipantController);
router.put("/participant/:id", participantValidationRules, editParticipantController);
router.delete("/participant/:id", deleteParticipantController);

export default router;
