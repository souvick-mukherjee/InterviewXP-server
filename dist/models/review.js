"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the Review schema
const reviewSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Define user_id as ObjectId
    companyId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Company", required: true }, // Define company_id as ObjectId
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
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.Review = Review;
