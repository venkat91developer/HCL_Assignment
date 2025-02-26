import { Schema, model } from "mongoose";

const programSchema = new Schema(
  {
    id: { type: String, required: true, unique: true }, // UUID for unique identification
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    fileAttachment: { type: String }, // Store file URL or path
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Program = model("Program", programSchema);
