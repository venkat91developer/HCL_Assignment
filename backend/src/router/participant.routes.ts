import { Router } from "express";
import { check } from "express-validator";
import { 
    addParticipantController,
    deleteParticipantController,
    editParticipantController,
    getParticipantsByIdController,
    getParticipantsController,
} from "../controller/participant.controller";
const router = Router();

const participantValidationRules = [
    check("programId").notEmpty().withMessage("Invalid Program ID format"),
    check("name").notEmpty().withMessage("Name is required"),
    check("age").isInt({ min: 0 }).withMessage("Age must be a positive number"),
    check("enrollmentDate").isISO8601().withMessage("Invalid enrollment date format"),
    check("medicalReport").notEmpty().withMessage("Medical report is required"),
];
router.get("/", getParticipantsController);
router.get("/:id", getParticipantsByIdController);
router.post("/", participantValidationRules, addParticipantController);
router.put("/:id", participantValidationRules, editParticipantController);
router.delete("/:id", deleteParticipantController);
export default router;
