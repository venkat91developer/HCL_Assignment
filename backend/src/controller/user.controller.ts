import { createUserModel, getParticularbyId } from "../model/user.model";
import { ResponseInterface } from "./common.interface";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        await createUserModel(req.body);
        const response: ResponseInterface = {
            code: 200,
            payload: [],
            success: true,
            message: "User created successfully"
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
export const getUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData = await getParticularbyId(req.params.id) ;
        const response: ResponseInterface = {
            code: 200,
            payload: [userData],
            success: true,
            message: "User created successfully"
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