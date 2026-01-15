import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	CheckCircle,
	Globe,
	MapPin,
	MessageCircle,
	Sparkles,
	TrendingUp,
	UserPlus,
	Users,
} from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";
import {
	getOutgoingFriendReqs,
	getRecommendedUsers,
	getUserFriends,
	sendFriendRequest,
} from "../lib/api";

import { capitalize } from "../lib/utils";

import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import getLanguageFlag from "../utils/getLanguageFlag";

const HomePage = () => {
	const queryClient = useQueryClient();
	// const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

	const { data: friendsObj = [], isLoading: loadingFriends } = useQuery({
		queryKey: ["friends"],
		queryFn: getUserFriends,
	});
	const { data: recommendedUsersObj = [], isLoading: loadingUsers } =
		useQuery({
			queryKey: ["users"],
			queryFn: getRecommendedUsers,
		});

	const { data: outgoingFriendReqsObj = [] } = useQuery({
		queryKey: ["outgoingFriendReqs"],
		queryFn: getOutgoingFriendReqs,
	});

	const friends = friendsObj.friends || [];
	const recommendedUsers = recommendedUsersObj.users || [];

	const { mutate: sendRequestMutation, isPending } = useMutation({
		mutationFn: sendFriendRequest,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
		onError: (error) => {
			console.error("Error sending friend request:", error);
		},
	});
	const outgoingRequestsIds = useMemo(() => {
		const outgoingIds = new Set();
		if (outgoingFriendReqsObj.outgoingRequests?.length > 0) {
			outgoingFriendReqsObj.outgoingRequests.forEach((req) => {
				outgoingIds.add(req.recipient._id);
			});
		}
		return outgoingIds;
	}, [outgoingFriendReqsObj]);
	// useEffect(() => {
	// 	const outgoingIds = new Set();
	// 	if (
	// 		outgoingFriendReqsObj.outgoingRequests &&
	// 		outgoingFriendReqsObj.outgoingRequests.length > 0
	// 	) {
	// 		outgoingFriendReqsObj.outgoingRequests.forEach((req) => {
	// 			outgoingIds.add(req.recipient._id);
	// 		});
	// 		setOutgoingRequestsIds(outgoingIds);
	// 	}
	// }, [outgoingFriendReqsObj.outgoingRequests]);

	return (
		<div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200">
			{/* Decorative Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
				<div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "2s" }}></div>
			</div>

			<div className="relative p-4 sm:p-6 lg:p-8">
				<div className="container mx-auto max-w-7xl space-y-10">
					{/* Hero Section */}
					<div className="card bg-linear-to-r from-primary to-secondary text-white shadow-2xl overflow-hidden">
						<div className="card-body p-6 sm:p-8">
							<div className="flex flex-col md:flex-row items-center justify-between gap-6">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-3">
										<Sparkles className="w-6 h-6 text-secondary" />
										<span className="badge badge-ghost">
											Welcome Back
										</span>
									</div>
									<h1 className="text-3xl sm:text-4xl font-bold mb-2 text-black">
										Your Language Journey
									</h1>
									<p className="text-gray-600/90 text-lg">
										Connect, practice, and grow with
										learners worldwide
									</p>
								</div>
								<div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-linear-to-r from-blue-500 to-indigo-600 backdrop-blur-sm">
									<div className="stat">
										<div className="stat-figure text-white">
											<Users className="w-8 h-8" />
										</div>
										<div className="stat-title text-white/70">
											Friends
										</div>
										<div className="stat-value text-white">
											{friends.length}
										</div>
									</div>
									<div className="stat">
										<div className="stat-figure text-white">
											<TrendingUp className="w-8 h-8" />
										</div>
										<div className="stat-title text-white/70">
											Matches
										</div>
										<div className="stat-value text-white">
											{recommendedUsers.length}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Friends Section */}
					<section className="space-y-6">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div>
								<div className="flex items-center gap-3 mb-2">
									<div className="p-2 bg-primary/10 rounded-lg">
										<Users className="w-6 h-6 text-primary" />
									</div>
									<h2 className="text-3xl font-bold">
										Your Friends
									</h2>
								</div>
								<p className="text-base-content/70 ml-14">
									Stay connected with your learning partners
								</p>
							</div>
							<Link
								to="/notifications"
								className="btn btn-primary gap-2 shadow-lg hover:shadow-xl">
								<Users className="w-5 h-5" />
								Friend Requests
							</Link>
						</div>

						{loadingFriends ? (
							<div className="flex flex-col items-center justify-center py-16">
								<span className="loading loading-spinner loading-lg text-primary" />
								<p className="mt-4 text-base-content/70">
									Loading friends...
								</p>
							</div>
						) : friends.length === 0 ? (
							<div className="card bg-base-100 shadow-xl border border-base-300">
								<div className="card-body items-center text-center py-16">
									<NoFriendsFound />
								</div>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
								{friends.map((friend) => (
									<FriendCard
										key={friend._id}
										friend={friend}
									/>
								))}
							</div>
						)}
					</section>

					{/* Recommended Users Section */}
					<section className="space-y-6">
						<div>
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-linear-to-br from-secondary/20 to-accent/20 rounded-lg">
									<Sparkles className="w-6 h-6 text-secondary" />
								</div>
								<h2 className="text-3xl font-bold">
									Meet New Learners
								</h2>
							</div>
							<p className="text-base-content/70 ml-14">
								Discover perfect language exchange partners
								based on your profile
							</p>
						</div>

						{loadingUsers ? (
							<div className="flex flex-col items-center justify-center py-16">
								<span className="loading loading-spinner loading-lg text-secondary" />
								<p className="mt-4 text-base-content/70">
									Finding matches...
								</p>
							</div>
						) : recommendedUsers.length === 0 ? (
							<div className="card bg-linear-to-br from-base-200 to-base-300 shadow-xl border border-base-300">
								<div className="card-body text-center py-12">
									<div className="flex justify-center mb-4">
										<div className="p-4 bg-base-100 rounded-full">
											<Users className="w-12 h-12 text-base-content/50" />
										</div>
									</div>
									<h3 className="font-bold text-xl mb-2">
										No recommendations available
									</h3>
									<p className="text-base-content/70">
										Check back later for new language
										partners!
									</p>
								</div>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{recommendedUsers.map((user) => {
									const hasRequestBeenSent =
										outgoingRequestsIds.has(user._id);

									return (
										<div
											key={user._id}
											className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-secondary/50 overflow-hidden group">
											<div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

											<div className="card-body p-6 space-y-4 relative">
												{/* Header */}
												<div className="flex items-start gap-4">
													<div className="avatar online">
														<div className="w-20 h-20 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
															<img
																src={
																	user.profilePic
																}
																alt={
																	user.fullName
																}
															/>
														</div>
													</div>

													<div className="flex-1 min-w-0">
														<h3 className="font-bold text-xl mb-1 truncate">
															{user.fullName}
														</h3>
														{user.location && (
															<div className="flex items-center gap-1 text-sm text-base-content/70">
																<MapPin className="w-4 h-4 shrink-0" />
																<span className="truncate">
																	{
																		user.location
																	}
																</span>
															</div>
														)}
													</div>
												</div>

												{/* Languages */}
												<div className="space-y-2">
													<div className="flex items-center gap-2 p-2 bg-secondary/10 rounded-lg">
														<Globe className="w-4 h-4 text-secondary shrink-0" />
														<span className="text-sm font-medium">
															{getLanguageFlag(
																user.nativeLanguage
															)}{" "}
															Native:{" "}
															{capitalize(
																user.nativeLanguage
															)}
														</span>
													</div>
													<div className="flex items-center gap-2 p-2 bg-accent/10 rounded-lg">
														<MessageCircle className="w-4 h-4 text-accent shrink-0" />
														<span className="text-sm font-medium">
															{getLanguageFlag(
																user.learningLanguage
															)}{" "}
															Learning:{" "}
															{capitalize(
																user.learningLanguage
															)}
														</span>
													</div>
												</div>

												{/* Bio */}
												{user.bio && (
													<div className="p-3 bg-base-200 rounded-lg">
														<p className="text-sm text-base-content/80 line-clamp-3">
															{user.bio}
														</p>
													</div>
												)}

												{/* Action Button */}
												<button
													className={`btn w-full gap-2 ${
														hasRequestBeenSent
															? "btn-success btn-disabled"
															: "btn-primary"
													}`}
													onClick={() =>
														sendRequestMutation(
															user._id
														)
													}
													disabled={
														hasRequestBeenSent ||
														isPending
													}>
													{hasRequestBeenSent ? (
														<>
															<CheckCircle className="w-5 h-5" />
															Request Sent
														</>
													) : isPending ? (
														<>
															<span className="loading loading-spinner loading-sm"></span>
															Sending...
														</>
													) : (
														<>
															<UserPlus className="w-5 h-5" />
															Send Friend Request
														</>
													)}
												</button>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</section>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
