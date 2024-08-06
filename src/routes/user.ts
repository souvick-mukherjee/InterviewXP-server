import express, { Router } from "express";
import { authenticateJWT } from "../middlewares/auth";
import {
  getUserProfile,
  userLogin,
  userRegister,
  createCompany,
  getCompanies,
  createReview,
  getReviewsByCompany,
} from "../controllers/user";

const router: Router = express.Router();

router.get("/profile", authenticateJWT, getUserProfile);

router.post("/login", userLogin);

router.post("/register", userRegister);

router.post("/company/create", authenticateJWT, createCompany);

router.get("/companies", authenticateJWT, getCompanies);

router.post("/review/create", authenticateJWT, createReview);

router.get("/reviews/:companyId", authenticateJWT, getReviewsByCompany);

export default router;