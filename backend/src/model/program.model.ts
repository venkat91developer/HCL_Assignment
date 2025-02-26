import { mongoClient } from "../config/connect.db";
import { ObjectId } from "mongodb";

const DB_NAME = process.env.MONGO_DB_NAME || "defaultDB";
const PROGRAM_COLLECTION_NAME = process.env.PROGRAM_COLLECTION_NAME || 'medical-research-program';
const PARTICIPANT_COLLECTION_NAME = process.env.PROGRAM_PARTICIPANT || 'medical-research-participant';

export async function insertProgram(programData: any) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PROGRAM_COLLECTION_NAME);
        const result = await collection.insertOne(programData);
        return result;
    } catch (error) {
        console.error("Error inserting program:", error);
        throw error;
    }
}

export async function getAllPrograms() {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PROGRAM_COLLECTION_NAME);
        return await collection.find().toArray();
    } catch (error) {
        console.error("Error fetching programs:", error);
        throw error;
    }
}

export async function getProgramById(id: string) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PROGRAM_COLLECTION_NAME);
        return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.error("Error fetching program by ID:", error);
        throw error;
    }
}

export async function updateProgram(id: string, updateData: any) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PROGRAM_COLLECTION_NAME);
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
        return result;
    } catch (error) {
        console.error("Error updating program:", error);
        throw error;
    }
}

export async function deleteProgram(id: string) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PROGRAM_COLLECTION_NAME);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error("Error deleting program:", error);
        throw error;
    }
}
