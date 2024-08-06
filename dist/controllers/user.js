"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByCompany = exports.createReview = exports.getCompanies = exports.createCompany = exports.userRegister = exports.userLogin = void 0;
exports.getUserProfile = getUserProfile;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const review_1 = require("../models/review");
const user_1 = require("../models/user");
const company_1 = require("../models/company");
const bcrypt_1 = __importDefault(require("bcrypt"));
function getUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield user_1.User.findById(id);
        res.json(user);
    });
}
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Compare the provided password with the hashed password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email, role: "user" }, process.env.JWT_SECRET
        // {expiresIn: "1h"}
        );
        res.status(200).json({ message: "User logged in successfully", token, userId: user._id });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
});
exports.userLogin = userLogin;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, fullName } = req.body;
        const existingUser = yield user_1.User.findOne({ email, fullName });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Create new user with hashed password
        const newUser = new user_1.User({ email, password: hashedPassword, fullName });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ email, role: "user" }, process.env.JWT_SECRET
        // {expiresIn: "1h"}
        );
        res.status(201).json({ message: "User created successfully", token });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
});
exports.userRegister = userRegister;
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName } = req.body;
    const existingCompany = yield company_1.Company.findOne({ companyName });
    if (existingCompany) {
        res.status(409).json({ message: "Company already exists" });
        return;
    }
    const newCompany = new company_1.Company({ companyName });
    yield newCompany.save();
    res.status(201).json({ message: "New Company entered successfully" });
});
exports.createCompany = createCompany;
const getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield company_1.Company.find({});
    res.status(200).json(companies);
});
exports.getCompanies = getCompanies;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, companyId, heading, questions, overall, interviewDate } = req.body;
    const newReview = new review_1.Review({
        userId,
        companyId,
        heading,
        questions,
        overall,
        interviewDate,
    });
    yield newReview.save();
    res.status(201).json({ message: "New Review entered successfully" });
});
exports.createReview = createReview;
const getReviewsByCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId } = req.params;
    const reviews = yield review_1.Review.find({ companyId });
    res.status(200).json(reviews);
});
exports.getReviewsByCompany = getReviewsByCompany;
