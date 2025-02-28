import { ObjectId } from "mongodb";
import { mongoClient } from "../config/connect.db";

const DB_NAME = process.env.MONGO_DB_NAME || "defaultDB";
const USER_COLLECTION_NAME = process.env.USER_COLLECTION_NAME || 'users';

export async function createUserModel(programData: any) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        const result = await collection.insertOne(programData);
        return result;
    } catch (error) {
        console.error("Error inserting program:", error);
        throw error;
    }
}

export async function getParticularbyId(id: string) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        const result = await collection.findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error("Error fetching program by ID:", error);
        throw error;
    }
}
