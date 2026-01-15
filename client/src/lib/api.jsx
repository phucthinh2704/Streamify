import axiosInstance from "./axios";

export const signup = async (signupData) => {
	const response = await axiosInstance.post("/auth/signup", signupData);
	return response;
};

export const login = async (loginData) => {
	const response = await axiosInstance.post("/auth/login", loginData);
	return response;
};
export const logout = async () => {
	const response = await axiosInstance.post("/auth/logout");
	return response;
};

export const getAuthUser = async () => {
	try {
		const res = await axiosInstance.get("/auth/me");
		return res;
	} catch (error) {
		console.log("Error in getAuthUser:", error);
		return null;
	}
};

export const completeOnboarding = async (userData) => {
	const response = await axiosInstance.post("/auth/onboarding", userData);
	return response;
};

export async function getUserFriends() {
	const response = await axiosInstance.get("/users/friends");
	return response;
}

export async function getRecommendedUsers() {
	const response = await axiosInstance.get("/users");
	return response;
}

export async function getOutgoingFriendReqs() {
	const response = await axiosInstance.get("/users/outgoing-friend-requests");
	return response;
}

export async function sendFriendRequest(userId) {
	const response = await axiosInstance.post(
		`/users/friend-request/${userId}`
	);
	return response;
}

export async function getFriendRequests() {
	const response = await axiosInstance.get("/users/friend-requests");
	return response;
}

export async function acceptFriendRequest(requestId) {
	const response = await axiosInstance.put(
		`/users/friend-request/${requestId}/accept`
	);
	return response;
}

export async function getStreamToken() {
	const response = await axiosInstance.get("/chat/token");
	return response;
}

export const getMyFriends = async () => {
	const res = await axiosInstance.get("/users/friends");
	return res;
};
