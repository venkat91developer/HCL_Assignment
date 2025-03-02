import { ObjectId } from "mongodb";
import { mongoClient } from "../config/connect.db";
import * as bcrypt from "bcrypt";

const DB_NAME = process.env.MONGO_DB_NAME || "defaultDB";
const USER_COLLECTION_NAME = process.env.USER_COLLECTION_NAME || "users";

interface User {
  username: string;
  password: string;
  fullname: string;
}

export async function createUserModel(userData: User) {
  try {
    const db = mongoClient.db(DB_NAME);
    const collection = db.collection(USER_COLLECTION_NAME);

    // Hash the password before saving
    userData.password = await bcrypt.hash(userData.password, 10);

    const result = await collection.insertOne(userData);
    return result;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error("Failed to create user.");
  }
}

export async function getUserById(id: string) {
  try {
    if (!ObjectId.isValid(id)) throw new Error("Invalid ID format");

    const db = mongoClient.db(DB_NAME);
    const collection = db.collection(USER_COLLECTION_NAME);

    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (!result) throw new Error("User not found");

    return result;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function validateUserLogin(username: string, password: string) {
  try {
    console.log('validate function',username,password)
    const db = mongoClient.db(DB_NAME);
    const collection = db.collection(USER_COLLECTION_NAME);

    const user = await collection.findOne({ username });
    if (!user) throw new Error("Invalid username or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid username or password");

    return "Login successful";
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
}

export async function checkUsernameExists(username: string) {
  try {
    const db = mongoClient.db(DB_NAME);
    const collection = db.collection(USER_COLLECTION_NAME);

    const user = await collection.findOne({ username });
    return user ? true : false;
  } catch (error) {
    console.error("Error checking username:", error);
    throw new Error("Failed to check username.");
  }
}

