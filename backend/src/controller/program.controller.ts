import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { insertProgram, updateProgram, deleteProgram, getAllPrograms, getProgramById } from "../model/program.model";
import { ResponseInterface } from "./common.interface";

export const getProgramController = async (req: Request, res: Response): Promise<void> => {
    try {
        const programs = await getAllPrograms();
        const response: ResponseInterface = {
            code: 200,
            payload: programs,
            success: true,
            message: "Get all programs successfully"
        };
        res.status(200).json(response);
    } catch (error) {
        const response: ResponseInterface = {
            code: 500,
            payload: [],
            success: false,
            message: "Server error",
            error
        };
        res.status(500).json(response);
    }
};

export const getProgramByIdController = async (req: Request, res: Response): Promise<void> => {
    console.log('getProgramByIdController')
    try {
        const programs = await getProgramById(req.params.id);
        const response: ResponseInterface = {
            code: 200,
            payload: [programs],
            success: true,
            message: `Get ${req.params.id} Programs successfully`
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

export const addProgramController = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            code: 400,
            payload: [],
            success: false,
            message: "Validation error",
            error: errors.array()
        });
    }
    try {
        const newProgram = await insertProgram(req.body);
        const response: ResponseInterface = {
            code: 201,
            payload: [newProgram],
            success: true,
            message: "Program added successfully"
        };
        res.status(201).json(response);
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

export const editProgramController = async (req: Request, res: Response): Promise<void> => {
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
        const updatedProgram = await updateProgram(req.params.id, req.body);
        if (!updatedProgram) {
            res.status(404).json({
                code: 404,
                payload: [],
                success: false,
                message: "Program not found"
            });
            return;
        }
        res.status(200).json({
            code: 200,
            payload: [updatedProgram],
            success: true,
            message: "Program updated successfully"
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

export const deleteProgramController = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await deleteProgram(req.params.id);
        if (!result) {
            res.status(404).json({
                code: 404,
                payload: [],
                success: false,
                message: "Program not found"
            });
            return;
        }
        res.status(200).json({
            code: 200,
            payload: [],
            success: true,
            message: "Program deleted successfully"
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
