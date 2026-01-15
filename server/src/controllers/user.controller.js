import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
	try {
		const currentUserId = req.user.id;
		const currentUser = req.user;
		const recommendedUsers = await User.find({
			$and: [
				{ _id: { $ne: currentUserId } }, // Exclude current user
				{ _id: { $nin: currentUser.friends } }, // Exclude existing friends
				{ isOnboarded: true },
			],
		}).select("-password");
		res.status(200).json({ users: recommendedUsers });
	} catch (error) {
		console.error("Error in getRecommendedUsers controller:", error);
		res.status(500).json({
			message: "Server error while fetching recommended users",
		});
	}
}
export async function getMyFriends(req, res) {
	try {
		const user = await User.findById(req.user.id)
			.select("friends")
			.populate(
				"friends",
				"fullName profilePic bio nativeLanguage learningLanguage"
			);

		res.status(200).json({ friends: user.friends });
	} catch (error) {
		console.log("Error in getMyFriends controller:", error);
		res.status(500).json({
			message: "Server error while fetching friends",
		});
	}
}

export async function sendFriendRequest(req, res) {
	try {
		const myId = req.user.id;
		const { id: recipientId } = req.params;

		// Prevent sending request to self
		if (myId === recipientId) {
			return res.status(400).json({
				message: "You cannot send a friend request to yourself.",
			});
		}

		// Check if recipient exists
		const recipient = await User.findById(recipientId);
		if (!recipient) {
			return res
				.status(404)
				.json({ message: "Recipient user not found." });
		}

		// Check if they are already friends
		if (recipient.friends.includes(myId)) {
			return res
				.status(400)
				.json({ message: "You are already friends with this user." });
		}

		// check if a friend request has already been sent
		const existingRequest = await FriendRequest.findOne({
			$or: [
				{ sender: myId, recipient: recipientId },
				{ sender: recipientId, recipient: myId },
			],
		});
		if (existingRequest) {
			return res.status(400).json({
				message: "Friend request already sent.",
			});
		}

		const friendRequest = await FriendRequest.create({
			sender: myId,
			recipient: recipientId,
		});

		return res.status(200).json({
			message: "Friend request sent.",
			friendRequest,
		});
	} catch (error) {
		console.log("Error in sendFriendRequest controller:", error);
		res.status(500).json({
			message: "Server error while sending friend request",
		});
	}
}

export async function acceptFriendRequest(req, res) {
	try {
		const { id: requestId } = req.params;

		const friendRequest = await FriendRequest.findById(requestId);

		if (!friendRequest) {
			return res
				.status(404)
				.json({ message: "Friend request not found." });
		}

		// Ensure that the logged-in user is the recipient of the friend request
		if (friendRequest.recipient.toString() !== req.user.id) {
			return res.status(403).json({
				message: "You are not authorized to accept this request.",
			});
		}

		// Check if the request is already accepted
		if (friendRequest.status === "accepted") {
			return res
				.status(400)
				.json({ message: "Friend request has already been accepted." });
		}
		friendRequest.status = "accepted";
		await friendRequest.save();

		// Add each user to the other's friends list
		// Using $addToSet to avoid duplicates, add only if not already present
		await User.findByIdAndUpdate(friendRequest.sender, {
			$addToSet: { friends: friendRequest.recipient },
		});
		await User.findByIdAndUpdate(friendRequest.recipient, {
			$addToSet: { friends: friendRequest.sender },
		});
		res.status(200).json({ message: "Friend request accepted." });
	} catch (error) {
		console.log("Error in acceptFriendRequest controller:", error);
		res.status(500).json({
			message: "Server error while accepting friend request",
		});
	}
}

export async function getFriendRequest(req, res) {
	try {
		const incomingRequests = await FriendRequest.find({
			recipient: req.user.id,
			status: "pending",
		}).populate(
			"sender",
			"fullName profilePic bio nativeLanguage learningLanguage"
		);

		const acceptedRequests = await FriendRequest.find({
			recipient: req.user.id,
			status: "accepted",
		}).populate("recipient", "fullName profilePic");

		res.status(200).json({
			incomingRequests,
			acceptedRequests,
		});
	} catch (error) {
		console.log("Error in getFriendRequest controller:", error);
		res.status(500).json({
			message: "Server error while fetching friend requests",
		});
	}
}

export async function getOutgoingFriendRequests(req, res) {
	try {
		const outgoingRequests = await FriendRequest.find({
			sender: req.user.id,
			status: "pending",
		}).populate(
			"recipient",
			"fullName profilePic bio nativeLanguage learningLanguage"
		);
		res.status(200).json({ outgoingRequests });
	} catch (error) {
		console.log("Error in getOutgoingFriendRequests controller:", error);
		res.status(500).json({
			message: "Server error while fetching outgoing friend requests",
		});
	}
}
