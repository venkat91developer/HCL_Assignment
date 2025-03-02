import { mongoClient } from "../config/connect.db";
import { ObjectId } from "mongodb";
import { logAuditEvent } from "./audit.model";

const DB_NAME = process.env.MONGO_DB_NAME || "defaultDB";
const PARTICIPANT_COLLECTION_NAME = process.env.PROGRAM_PARTICIPANT || 'medical-research-participant';

export async function insertParticipant(programData: any) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PARTICIPANT_COLLECTION_NAME);
        const result = await collection.insertOne(programData);
        return result;
    } catch (error) {
        console.error("Error inserting program:", error);
        throw error;
    }
}

export async function getAllParticipants() {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PARTICIPANT_COLLECTION_NAME);

        // Ensure the collection exists before querying
        if (!collection) {
            throw new Error("Collection not found");
        }

        const participants = await collection.find().toArray();
        return participants;
    } catch (error) {
        console.error("Error fetching participants:", error);
        throw error;
    }
}

export async function getParticipantById(id: string) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PARTICIPANT_COLLECTION_NAME);
        return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.error("Error fetching program by ID:", error);
        throw error;
    }
}

export async function updateParticipant(id: string, updateData: any) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PARTICIPANT_COLLECTION_NAME);
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
        return result;
    } catch (error) {
        console.error("Error updating program:", error);
        throw error;
    }
}

export async function deleteParticipant(id: string, deletedBy?: string) {
    try {
        const db = mongoClient.db(DB_NAME);
        const collection = db.collection(PARTICIPANT_COLLECTION_NAME);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            await logAuditEvent("participant_deleted", id, "Participant", deletedBy);
        }

        return result;
    } catch (error) {
        console.error("Error deleting participant:", error);
        throw error;
    }
}
