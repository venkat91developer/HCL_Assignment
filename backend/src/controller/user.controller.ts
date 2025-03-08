import { checkUsernameExists, createUserModel, getUserById, validateUserLogin } from "../model/user.model";
import { ResponseInterface } from "./common.interface";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

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
        const userData = await validateUserLogin(req.body.email, req.body.password);
        if (!userData) {
            const response: ResponseInterface = {
                code: 401,
                payload: [],
                success: false,
                message: "Invalid email or password"
            };
            res.status(401).json(response);
            return;
        }

        const accessToken = jwt.sign(
            { email: req.body.email },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { email: req.body.email },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "7d" }
        );

        const response: ResponseInterface = {
            code: 200,
            payload: [{
                message: userData,
                accessToken: accessToken,
                refreshToken: refreshToken
            }],
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
export const refreshTokenController = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
        res.status(401).json({ message: "Refresh Token is required" });
        return;
    }

    try {
        const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string);
        
        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_SECRET as string,
            { expiresIn: "15m" }
        );

        const newRefreshToken = jwt.sign(
            { userId: decoded.userId },
            process.env.REFRESH_SECRET as string,
            { expiresIn: "7d" }
        );

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token" });
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
            res.status(200).json(response);
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