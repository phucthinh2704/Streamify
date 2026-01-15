import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			maxPoolSize: 10, // Maintain up to 10 socket connections
			serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
			allowPartialTrustChain: true, // Allow partial trust chain for MongoDB Atlas
		});
		if (conn.connection.readyState === 1) {
			console.log(`Connect to MongoDB successfully`);
		} else {
			console.log("Connect to MongoDB failed");
		}
	} catch (error) {
		console.log("Connect to MongoDB failed");
		throw new Error(error);
	}
};

export default { connectDB };
