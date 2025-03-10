import { mysqlPool } from "../config/connect.db";

export async function logAuditEvent(event: string, entityId: string, entityType: string, deletedBy?: string) {
  try {
      const connection = await mysqlPool.getConnection();
      await connection.query(
        `INSERT INTO audit_log (event, deletedEntityId, entityType, deletedAt, deletedBy) VALUES (?, ?, ?, NOW(), ?)`,
        [event, entityId, entityType, deletedBy || "system"]
    );
      connection.release();
  } catch (error) {
      console.error("❌ Error logging audit event:", error);
  }
}
