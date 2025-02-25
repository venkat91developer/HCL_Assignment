import { Request,Response } from "express";

export const AuditDeleteLogsController = async(req: Request, res: Response) => {
    res.json({message:"AuditDeleteLogsController"});
}
