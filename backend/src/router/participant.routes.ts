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

const participantAddValidationRules = [
    check("programId").notEmpty().withMessage("Invalid Program ID format"),
    check("name").notEmpty().withMessage("Name is required"),
    check("age").isInt({ min: 0 }).withMessage("Age must be a positive number"),
    check("enrollmentDate").isISO8601().withMessage("Invalid enrollment date format"),
    check("medicalReport").notEmpty().withMessage("Medical report is required"),
];
const participantEditValidationRules = [
    check("id").isUUID().withMessage("Invalid ID format"),
    check("programId").isUUID().withMessage("Invalid Program ID format"),
    check("name").notEmpty().withMessage("Name is required"),
    check("age").isInt({ min: 0 }).withMessage("Age must be a positive number"),
    check("enrollmentDate").isISO8601().withMessage("Invalid enrollment date format"),
    check("medicalReport").notEmpty().withMessage("Medical report is required"),
];
router.get("/", getParticipantsController);
router.get("/:id", getParticipantsByIdController);
router.post("/", participantAddValidationRules, addParticipantController);
router.put("/:id", participantEditValidationRules, editParticipantController);
router.delete("/:id", deleteParticipantController);
export default router;
