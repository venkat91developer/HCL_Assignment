import { MongoClient, ServerApiVersion } from "mongodb";
import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

// MongoDB Connection - String Binding
const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@hcltech-program.x7oqn.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(mongoUri, {
    tls: true,
    serverApi: ServerApiVersion.v1
});
// Export MongoDB Connection 
export async function connectMongoDB() {
    try {
        await mongoClient.connect();
        console.log("✅ Connected to MongoDB");
        return mongoClient.db(process.env.MONGO_DB_NAME);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw error;
    }
}
// MySQL Connection - String Binding
export const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_DB_HOST || "localhost",
    user: process.env.MYSQL_DB_USER || "root",
    password: process.env.MYSQL_DB_PASS || "",
    database: process.env.MYSQL_DB_NAME || "",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Export MySQL Connection
export async function connectMySQLDB() {
    try {
        const connection = await mysqlPool.getConnection();
        console.log("✅ Connected to MySQL Database");
        connection.release();
    } catch (error) {
        console.error("❌ Error connecting to MySQL:", error);
        throw error;
    }
}

export { mongoClient };
