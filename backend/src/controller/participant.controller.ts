import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { insertParticipant, updateParticipant, deleteParticipant, getAllParticipants, getParticipantById } from "../model/participant.model";
import { ResponseInterface } from "./common.interface";
import { logAuditEvent } from "../model/audit.model";

export const getParticipantsByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const programs = await getParticipantById(req.params.id);
        const response: ResponseInterface = {
            code: 200,
            payload: [programs],
            success: true,
            message: `Get ${req.params.id} Participant successfully`
        };
        res.status(200).json(response);
    } catch (error) {
        const response: ResponseInterface = {
            code: 500,
            payload: [error],
            success: false,
            message: "Server error",
            error
        };
        res.status(500).json(response);
    }
};
export const getParticipantsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const participants =  await getAllParticipants();
        res.status(200).json({
            code: 200,
            payload: participants,
            success: true,
            message: "Fetched all participants successfully"
        });
    } catch (error:any) {
        res.status(500).json({
            code: 500,
            payload: [JSON.stringify(error.message)],
            success: false,
            message: "Server error"
        });
    }
};

export const addParticipantController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            code: 400,
            payload: [],
            success: false,
            message: "Validation error",
            error: errors.array()
        });
        return;
    }
    try {
        const newParticipant = await insertParticipant(req.body);
        res.status(201).json({
            code: 201,
            payload: [newParticipant],
            success: true,
            message: "Participant added successfully"
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            payload: [],
            success: false,
            message: "Server error",
            error
        });
    }
};

export const editParticipantController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            code: 400,
            payload: [],
            success: false,
            message: "Validation error",
            error: errors.array()
        });
        return;
    }
    try {
        const updatedParticipant = await updateParticipant(req.params.id, req.body);
        if (!updatedParticipant) {
            res.status(404).json({
                code: 404,
                payload: [],
                success: false,
                message: "Participant not found"
            });
            return;
        }
        res.status(200).json({
            code: 200,
            payload: [updatedParticipant],
            success: true,
            message: "Participant updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            payload: [],
            success: false,
            message: "Server error",
            error
        });
    }
};

export const deleteParticipantController = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await deleteParticipant(req.params.id);
        if (!result.deletedCount) {
            res.status(404).json({
                code: 404,
                payload: [],
                success: false,
                message: "Participant not found"
            });
            return;
        }
        await logAuditEvent("participant_deleted", req.params.id, "Participant");
        res.status(200).json({
            code: 200,
            payload: [],
            success: true,
            message: "Participant deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            payload: [],
            success: false,
            message: "Server error",
            error
        });
    }
};
