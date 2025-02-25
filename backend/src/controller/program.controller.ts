import { Request, Response } from 'express';

export const getProgramController = async(req: Request, res: Response) => {
    res.status(200).json({message:"getProgramController"});
}
export const addProgramController = async(req: Request, res: Response) => {
    res.json({message:"addProgramController"});
}
export const editProgramController = async(req: Request, res: Response) => {
    res.json({message:"editProgramController"});
}
export const deleteProgramController = async(req: Request, res: Response) => {
    res.json({message:"deleteProgramController"});
}