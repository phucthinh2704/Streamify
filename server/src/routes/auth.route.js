import express from "express";
import {
	register,
	login,
	logout,
	onboard,
	getMe,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", protectRoute, onboard);
router.get("/me", protectRoute, getMe);

export default router;
