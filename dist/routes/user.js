"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get("/profile", auth_1.authenticateJWT, user_1.getUserProfile);
router.post("/login", user_1.userLogin);
router.post("/register", user_1.userRegister);
router.post("/company/create", auth_1.authenticateJWT, user_1.createCompany);
router.get("/companies", auth_1.authenticateJWT, user_1.getCompanies);
router.post("/review/create", auth_1.authenticateJWT, user_1.createReview);
router.get("/reviews/:companyId", auth_1.authenticateJWT, user_1.getReviewsByCompany);
exports.default = router;
