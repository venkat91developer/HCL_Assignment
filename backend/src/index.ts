import * as express from "express";
import * as dotenv from "dotenv";
const cors = require('cors');
import { connectMongoDB, connectMySQLDB } from "./config/connect.db";
import programRoutes from "./router/program.routes";
import auditRoutes from "./router/audit.routes";
import userRoutes from "./router/user.routes";
import participantRoutes from "./router/participant.routes";
import { authenticateToken } from "./middleware/auth.middleware";
import authRoutes from "./router/auth.routes";
import { requestLogger } from "./middleware/logger.middleware";
dotenv.config();

const appProgram = express();
const appAudit = express();
const PORT_PROGRAM = Number(process.env.PORT_PROGRAM) || 3000;
const PORT_AUDIT = Number(process.env.PORT_AUDIT) || 4000;
appProgram.use(
cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
})
);
appAudit.use(
cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
})
);
appProgram.use(express.json());
appAudit.use(express.json());

async function startServer() {
    try {
        const mongoDB = await connectMongoDB();
        const mysqlDB = await connectMySQLDB();

        appProgram.locals.mongoDB = mongoDB;
        appProgram.locals.mongoDB = mongoDB;
        appAudit.locals.mysqlPool = mysqlDB;
        appProgram.use(requestLogger);
        appAudit.use(requestLogger);
        appProgram.use("/api/v1/auth", authRoutes);
        appProgram.use("/api/v1/user", userRoutes);
        appProgram.use(authenticateToken);
        appProgram.use("/api/v1/programs", programRoutes);
        appProgram.use("/api/v1/participant", participantRoutes);

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
