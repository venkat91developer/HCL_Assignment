import { checkUsernameExists, createUserModel, getUserById, validateUserLogin } from "../model/user.model";
import { ResponseInterface } from "./common.interface";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userInfo = await createUserModel(req.body);
        const response: ResponseInterface = {
            code: 200,
            payload: [userInfo],
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
export const loginController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData = await validateUserLogin(req.body.username,req.body.password) ;
        const response: ResponseInterface = {
            code: 200,
            payload: [userData],
            success: true,
            message: "User Login Successfully"
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
        const userData = await getUserById(req.params.id) ;
        const response: ResponseInterface = {
            code: 200,
            payload: [userData],
            success: true,
            message: "User fetched successfully"
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
export const checkEmailController = async (req: Request, res: Response): Promise<void> => {
    try {
        const username = (req.query.email)?.toString() || "";
        const userData = await checkUsernameExists(username) ;
        if(userData){
             const response: ResponseInterface = {
                code: 200,
                payload: [],
                success: false,
                message: "Email Existing..."
            };
            res.status(404).json(response);
        } else {
            const response: ResponseInterface = {
                code: 200,
                payload: [],
                success: true,
                message: "Email not Existing..."
            };
            res.status(200).json(response);
        }
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