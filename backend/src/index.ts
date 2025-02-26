import * as express from "express";
import * as dotenv from "dotenv";
import { connectMongoDB, connectMySQLDB } from "./config/connect.db";
import programRoutes from "./router/program.routes";
import auditRoutes from "./router/audit.routes";

dotenv.config();

const appProgram = express();
const appAudit = express();

const PORT_PROGRAM = Number(process.env.PORT_PROGRAM) || 3000;
const PORT_AUDIT = Number(process.env.PORT_AUDIT) || 4000;

appProgram.use(express.json());
appAudit.use(express.json());

async function startServer() {
    try {
        const mongoDB = await connectMongoDB();
        const mysqlDB = await connectMySQLDB();

        appProgram.locals.mongoDB = mongoDB;
        appAudit.locals.mysqlPool = mysqlDB;

        appProgram.use("/api/v1/programs", programRoutes);
        appAudit.use("/api/v1/audit-logs", auditRoutes);

        appProgram.listen(PORT_PROGRAM, () => {
            console.log(`Server Program running on port ${PORT_PROGRAM}`);
        });

        appAudit.listen(PORT_AUDIT, () => {
            console.log(`Server Audit running on port ${PORT_AUDIT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
