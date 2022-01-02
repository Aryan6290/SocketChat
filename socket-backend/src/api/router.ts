import { authMiddleware } from "./../Auth/auth";
import { Router } from "express";
import * as userController from "./users/userController";
export const router = Router();

//Login and Signup
router.post("/user/login", userController.loginUser);
router.post("/user/add", userController.signupNewUser);

// User actions
router.post("/users", userController.getAllUsers, authMiddleware);
