import { Router } from "express";
import * as userController from "./users/userController";
export const router = Router();
router.post("/user/login", userController.loginUser);
router.post("/user/add", userController.signupNewUser);
