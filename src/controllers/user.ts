import e, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Review } from "../models/review";
import { User, UserDoc } from "../models/user";
import { Company, CompanyDoc } from "../models/company";
import bcrypt from "bcrypt";

async function getUserProfile(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
}

const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { email, role: "user" },
      process.env.JWT_SECRET!
      // {expiresIn: "1h"}
    );
    res.status(200).json({ message: "User logged in successfully", token, userId: user._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const userRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, fullName } = req.body;
    const existingUser = await User.findOne({ email, fullName });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
    const newUser = new User({ email, password: hashedPassword, fullName });
    await newUser.save();

    const token = jwt.sign(
      { email, role: "user" },
      process.env.JWT_SECRET!
      // {expiresIn: "1h"}
    );
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const createCompany = async (req: Request, res: Response): Promise<void> => {
  const { companyName } = req.body;
  const existingCompany = await Company.findOne({ companyName });
  if (existingCompany) {
    res.status(409).json({ message: "Company already exists" });
    return;
  }
  const newCompany = new Company({ companyName });
  await newCompany.save();
  res.status(201).json({ message: "New Company entered successfully" });
};

const getCompanies = async (req: Request, res: Response): Promise<void> => {
  const companies = await Company.find({});
  res.status(200).json(companies);
};

const createReview = async (req: Request, res: Response): Promise<void> => {
  const { userId, companyId, heading, questions, overall, interviewDate } =
    req.body;
  const newReview = new Review({
    userId,
    companyId,
    heading,
    questions,
    overall,
    interviewDate,
  });
  await newReview.save();
  res.status(201).json({ message: "New Review entered successfully" });
};

const getReviewsByCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { companyId } = req.params;
  const reviews = await Review.find({ companyId });
  res.status(200).json(reviews);
};

export {
  getUserProfile,
  userLogin,
  userRegister,
  createCompany,
  getCompanies,
  createReview,
  getReviewsByCompany,
};
