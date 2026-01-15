import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { upsertStreamUser } from "../lib/stream.js";

export async function register(req, res) {
	const { fullName, email, password } = req.body;
	try {
		if (!fullName || !email || !password) {
			return res
				.status(400)
				.json({ message: "All fields are required." });
		}
		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters." });
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: "Invalid email format" });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				message: "Email already exists, please use a different one",
			});
		}

		const rand = Math.floor(Math.random() * 70) + 1;
		const randomAvatar = `https://i.pravatar.cc/300/img=${rand}`;

		const newUser = await User.create({
			email,
			fullName,
			password,
			profilePic: randomAvatar,
		});

		try {
			await upsertStreamUser({
				id: newUser._id.toString(),
				name: newUser.fullName,
				image: newUser.profilePic || "",
			});
			console.log(`Stream user created for ${newUser.fullName}`);
		} catch (error) {
			console.log("Error creating Stream user:", error);
		}

		const token = jwt.sign(
			{ userId: newUser._id },
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);

		const isProduction = process.env.NODE_ENV === "production";

		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			sameSite: isProduction ? "none" : "strict",
			secure: isProduction,
		});
		return res.status(201).json({
			success: true,
			message: "User registered successfully",
			user: {
				id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
				profilePic: newUser.profilePic,
			},
			token,
		});
	} catch (error) {
		console.log("Error in register controller", error.message);
		return res.status(500).json({ message: error.message });
	}
}

export async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Email and password are required." });
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid email or password." });
		}
		const isPasswordCorrect = await user.matchPassword(password);
		if (!isPasswordCorrect) {
			return res
				.status(400)
				.json({ message: "Invalid email or password." });
		}
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		const isProduction = process.env.NODE_ENV === "production";
		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			sameSite: isProduction ? "none" : "strict",
			secure: isProduction,
		});
		return res.status(200).json({
			success: true,
			message: "User logged in successfully",
			user: {
				id: user._id,
				fullName: user.fullName,
				email: user.email,
				profilePic: user.profilePic,
			},
			token,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		return res.status(500).json({ message: error.message });
	}
}

export function logout(req, res) {
	res.clearCookie("jwt", {
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
	});
	return res
		.status(200)
		.json({ success: true, message: "User logged out successfully" });
}

export function getMe(req, res) {
	return res
		.status(200)
		.json({
			success: true,
			user: req.user,
			message: "User retrieved successfully",
		});
}

export async function onboard(req, res) {
	try {
		const userId = req.user._id;
		const { fullName, bio, nativeLanguage, learningLanguage, location, profilePic } =
			req.body;
		if (
			!fullName ||
			!bio ||
			!nativeLanguage ||
			!learningLanguage ||
			!location
		) {
			return res.status(400).json({
				message: "All fields are required for onboarding.",
				missingFields: [
					!fullName && "fullName",
					!bio && "bio",
					!nativeLanguage && "nativeLanguage",
					!learningLanguage && "learningLanguage",
					!location && "location",
				].filter(Boolean),
			});
		}
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				fullName,
				bio,
				nativeLanguage,
				learningLanguage,
				location,
				profilePic,
				isOnboarded: true,
			},
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		try {
			await upsertStreamUser({
				id: updatedUser._id.toString(),
				name: updatedUser.fullName,
				image: updatedUser.profilePic || "",
			});
			console.log(
				"Stream user updated during onboarding for",
				updatedUser.fullName
			);
		} catch (error) {
			console.log(
				"Error updating Stream user during onboarding:",
				error.message
			);
		}

		return res.status(200).json({
			success: true,
			message: "User onboarded successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.log("Error in onboard controller", error.message);
		return res.status(500).json({ message: error.message });
	}
}
