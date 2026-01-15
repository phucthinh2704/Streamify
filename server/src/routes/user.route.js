import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import {
	getMyFriends,
	getRecommendedUsers,
	sendFriendRequest,
	acceptFriendRequest,
	getFriendRequest,
	getOutgoingFriendRequests,
} from "../controllers/user.controller.js";
const router = express.Router();

router.use(protectRoute);
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequest);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);
export default router;
