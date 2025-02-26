import { Request, Response } from "express";
import { mysqlPool } from "../config/connect.db";

export const AuditDeleteLogsController = async (req: Request, res: Response) => {
    try {
        const connection = await mysqlPool.getConnection();
        const [rows] = await connection.query(
            "SELECT id, entity_id AS deletedEntityId, entity_type AS entityType, deletedAt, deletedBy FROM audit_logs WHERE event = 'participant_deleted' ORDER BY deletedAt DESC"
        );
        connection.release();

        res.status(200).json({
            code: 200,
            success: true,
            message: "Fetched audit delete logs successfully",
            payload: rows
        });
    } catch (error) {
        console.error("❌ Error fetching audit delete logs:", error);
        res.status(500).json({
            code: 500,
            success: false,
            message: "Server error while fetching audit logs",
            error
        });
    }
};
