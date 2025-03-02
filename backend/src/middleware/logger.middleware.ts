import * as fs from "fs";
import * as path from "path";
import { Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const currentDate = new Date();
    const pad = (num: number) => num.toString().padStart(2, "0");
    const day = pad(currentDate.getDate());
    const month = pad(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const folderName = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
    const fileName = `${day}-${month}-${year}.log`; // One file per hour

    const folderPath = path.join(process.cwd(), "logs", folderName); // Root-level logs/
    const filePath = path.join(folderPath, fileName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const logMessage = `[${currentDate.toISOString()}] ${req.method} ${req.url} - ${req.ip}\n`;

    fs.appendFileSync(filePath, logMessage, "utf8");

    next();
};
