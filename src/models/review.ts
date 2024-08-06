import mongoose, { Document, Model, Schema } from "mongoose";
import { UserDoc } from "./user";
import { CompanyDoc } from "./company";

// Interface for Review attributes used when creating a new Review
interface ReviewAttrs {
  user_id: Array<UserDoc["_id"]>;
  company_id: Array<CompanyDoc["_id"]>;
  heading: string;
  questions: string[]; // Use string[] for array of strings
  overall: string;
  interviewDate: Date;
  createdAt?: Date;
}

// Interface for a Review document
interface ReviewDoc extends Document {
  userId: Array<UserDoc["_id"]>;
  companyId: Array<CompanyDoc["_id"]>;
  heading: string;
  questions: string[]; // Use string[] for array of strings
  overall: string;
  interviewDate: Date;
  createdAt?: Date;
}

// Interface for the Review model including custom static methods
interface ReviewModel extends Model<ReviewDoc> {
  //   build(attrs: ReviewAttrs): ReviewDoc;
}

// Define the Review schema
const reviewSchema = new Schema<ReviewDoc>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Define user_id as ObjectId
  companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true }, // Define company_id as ObjectId
  heading: { type: String, required: true }, // Define header as a required String
  questions: { type: [String], required: true }, // Define questions as an array of Strings
  overall: { type: String, required: true }, // Define overall as a required String
  interviewDate: { type: Date, required: true }, // Define interviewDate as a required Date
  createdAt: { type: Date, default: Date.now }, // Define createdAt as a Date with a default value
});

// Implement the build method to create a new Review instance
// reviewSchema.statics.build = function (attrs: ReviewAttrs): ReviewDoc {
//   return new this(attrs);
// };

// Create the Review model
const Review = mongoose.model<ReviewDoc, ReviewModel>("Review", reviewSchema);

// Export the model and interfaces
export { Review, ReviewDoc, ReviewAttrs };
