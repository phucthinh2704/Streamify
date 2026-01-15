import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Bell,
	CheckCircle2,
	Clock,
	MessageSquare,
	Sparkles,
	UserCheck,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";

const NotificationsPage = () => {
	const queryClient = useQueryClient();

	const { data: friendRequests, isLoading } = useQuery({
		queryKey: ["friendRequests"],
		queryFn: getFriendRequests,
	});

	const { mutate: acceptRequestMutation, isPending } = useMutation({
		mutationFn: acceptFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
			queryClient.invalidateQueries({ queryKey: ["friends"] });
		},
	});

	const incomingRequests = friendRequests?.incomingRequests || [];
	const acceptedRequests = friendRequests?.acceptedRequests || [];

	return (
		<div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200">
			{/* Decorative Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
				<div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}></div>
			</div>

			<div className="relative p-4 sm:p-6 lg:p-8">
				<div className="container mx-auto max-w-5xl">
					{/* Header */}
					<div className="mb-8">
						<div className="flex items-center gap-4 mb-4">
							<div className="p-3 bg-linear-to-br from-primary to-secondary rounded-2xl shadow-lg">
								<Bell className="h-8 w-8" />
							</div>
							<div>
								<h1 className="text-3xl sm:text-4xl font-bold">
									Notifications
								</h1>
								<p className="text-base-content/70 mt-1">
									Stay connected with your language learning
									community
								</p>
							</div>
						</div>

						{/* Stats Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
							<div className="stats shadow-lg bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
								<div className="stat">
									<div className="stat-figure text-primary">
										<UserCheck className="w-8 h-8" />
									</div>
									<div className="stat-title">
										Friend Requests
									</div>
									<div className="stat-value text-primary">
										{incomingRequests.length}
									</div>
									<div className="stat-desc">
										Waiting for your response
									</div>
								</div>
							</div>

							<div className="stats shadow-lg bg-linear-to-br from-success/10 to-success/5 border border-success/20">
								<div className="stat">
									<div className="stat-figure text-success">
										<CheckCircle2 className="w-8 h-8" />
									</div>
									<div className="stat-title">
										New Connections
									</div>
									<div className="stat-value text-success">
										{acceptedRequests.length}
									</div>
									<div className="stat-desc">
										Recent acceptances
									</div>
								</div>
							</div>
						</div>
					</div>

					{isLoading ? (
						<div className="flex flex-col items-center justify-center py-20">
							<span className="loading loading-spinner loading-lg text-primary"></span>
							<p className="mt-4 text-base-content/70">
								Loading notifications...
							</p>
						</div>
					) : (
						<div className="space-y-8">
							{/* Incoming Friend Requests */}
							{incomingRequests.length > 0 && (
								<section className="space-y-4">
									<div className="flex items-center gap-3 mb-6">
										<div className="h-1 w-12 bg-linear-to-r from-primary to-transparent rounded-full"></div>
										<h2 className="text-2xl font-bold flex items-center gap-2">
											<UserCheck className="h-6 w-6 text-primary" />
											Friend Requests
											<div className="badge badge-primary badge-lg ml-2 px-4">
												{incomingRequests.length}
											</div>
										</h2>
									</div>

									<div className="grid gap-4">
										{incomingRequests.map((request) => (
											<div
												key={request._id}
												className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary/50 overflow-hidden group">
												<div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

												<div className="card-body p-5 sm:p-6 relative">
													<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
														<div className="flex items-center gap-4 flex-1">
															<div className="avatar online">
																<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
																	<img
																		src={
																			request
																				.sender
																				.profilePic
																		}
																		alt={
																			request
																				.sender
																				.fullName
																		}
																	/>
																</div>
															</div>

															<div className="flex-1">
																<h3 className="font-bold text-lg mb-2">
																	{
																		request
																			.sender
																			.fullName
																	}
																</h3>
																<div className="flex flex-wrap gap-2">
																	<div className="badge badge-primary gap-2 py-3">
																		<Sparkles className="w-3 h-3" />
																		Native:{" "}
																		{
																			request
																				.sender
																				.nativeLanguage
																		}
																	</div>
																	<div className="badge badge-secondary gap-2 py-3">
																		<MessageSquare className="w-3 h-3" />
																		Learning:{" "}
																		{
																			request
																				.sender
																				.learningLanguage
																		}
																	</div>
																</div>
															</div>
														</div>

														<button
															className="btn btn-primary btn-md w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl"
															onClick={() =>
																acceptRequestMutation(
																	request._id
																)
															}
															disabled={
																isPending
															}>
															{isPending ? (
																<>
																	<span className="loading loading-spinner loading-sm"></span>
																	Processing...
																</>
															) : (
																<>
																	<UserCheck className="w-5 h-5" />
																	Accept
																	Request
																</>
															)}
														</button>
													</div>
												</div>
											</div>
										))}
									</div>
								</section>
							)}

							{/* Accepted Requests */}
							{acceptedRequests.length > 0 && (
								<section className="space-y-4">
									<div className="flex items-center gap-3 mb-6">
										<div className="h-1 w-12 bg-linear-to-r from-success to-transparent rounded-full"></div>
										<h2 className="text-2xl font-bold flex items-center gap-2">
											<CheckCircle2 className="h-6 w-6 text-success" />
											New Connections
										</h2>
									</div>

									<div className="grid gap-4">
										{acceptedRequests.map(
											(notification) => (
												<div
													key={notification._id}
													className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-success/20 overflow-hidden group">
													<div className="absolute inset-0 bg-linear-to-r from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

													<div className="card-body p-5 relative">
														<div className="flex items-start gap-4">
															<div className="avatar online">
																<div className="w-14 h-14 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
																	<img
																		src={
																			notification
																				.sender
																				.profilePic
																		}
																		alt={
																			notification
																				.sender
																				.fullName
																		}
																	/>
																</div>
															</div>

															<div className="flex-1">
																<div className="flex items-start justify-between gap-4">
																	<div>
																		<h3 className="font-bold text-lg">
																			{
																				notification
																					.sender
																					.fullName
																			}
																		</h3>
																		<p className="text-base-content/80 my-2">
																			You
																			have
																			accepted
																			the
																			friend
																			request
																			from{" "}
																			{
																				notification
																					.sender
																					.fullName
																			}
																		</p>
																		<div className="flex items-center gap-2 text-sm text-base-content/60">
																			<Clock className="h-4 w-4" />
																			{new Date(
																				notification.createdAt
																			).toLocaleString(
																				"en-US",
																				{
																					dateStyle:
																						"medium",
																					timeStyle:
																						"short",
																				}
																			)}
																		</div>
																	</div>

																	<div className="badge badge-success gap-2 py-4 px-4 whitespace-nowrap">
																		<MessageSquare className="h-4 w-4" />
																		New
																		Friend
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											)
										)}
									</div>
								</section>
							)}

							{incomingRequests.length === 0 &&
								acceptedRequests.length === 0 && (
									<div className="card bg-base-100 shadow-xl border border-base-300">
										<div className="card-body items-center text-center py-16">
											<NoNotificationsFound />
										</div>
									</div>
								)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotificationsPage;
