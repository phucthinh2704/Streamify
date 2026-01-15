import { Bell, LogOut, Menu, Search, MessageCircle, Users } from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import ThemeSelector from "./ThemeSelector";
import useSidebar from "../hooks/useSidebar";

const Navbar = () => {
	const { authUser } = useAuthUser();
	const location = useLocation();
	const isChatPage = location.pathname?.startsWith("/chat");
	const { logoutMutation } = useLogout();
	const { toggleSidebar } = useSidebar();

	return (
		<nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-30 shadow-sm">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* LEFT SIDE - Logo */}
					<div className="flex items-center gap-8">
						<Link
							to="/"
							className="flex items-center gap-3 group">
							<div className="p-2 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md group-hover:shadow-lg transition-all">
								<svg
									className="w-6 h-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
									/>
								</svg>
							</div>
							<span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent hidden sm:block">
								Streamify
							</span>
						</Link>

						{/* Navigation Links - Desktop */}
						{isChatPage && (
							<div className="hidden lg:flex items-center gap-1">
								<Link to="/feed">
									<button className="btn btn-ghost gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50">
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
											/>
										</svg>
										<span className="hidden xl:inline">
											Home
										</span>
									</button>
								</Link>
								<Link to="/friends">
									<button className="btn btn-ghost gap-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
										<Users className="w-5 h-5" />
										<span className="hidden xl:inline">
											Friends
										</span>
									</button>
								</Link>
								<Link to="/messages">
									<button className="btn btn-ghost gap-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50">
										<MessageCircle className="w-5 h-5" />
										<span className="hidden xl:inline">
											Messages
										</span>
									</button>
								</Link>
							</div>
						)}
					</div>

					{/* RIGHT SIDE - Actions */}
					<div className="flex items-center gap-2">
						{/* Mobile Search */}
						<button className="btn btn-ghost btn-circle md:hidden">
							<Search className="w-5 h-5 text-gray-600" />
						</button>

						{/* Theme Selector */}
						<ThemeSelector />

						{/* User Menu */}
						<div className="dropdown dropdown-end">
							<button
								tabIndex={0}
								className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all">
								<div className="w-9 rounded-full">
									<img
										src={authUser?.profilePic}
										alt="User"
									/>
								</div>
							</button>
							<div
								tabIndex={0}
								className="dropdown-content mt-3 z-50 card card-compact w-64 bg-white shadow-2xl border border-gray-200">
								<div className="card-body">
									{/* User Info */}
									<div className="flex items-center gap-3 pb-3 border-b border-gray-200">
										<div className="avatar">
											<div className="w-12 rounded-full ring-2 ring-blue-500 ring-offset-2">
												<img
													src={authUser?.profilePic}
													alt="User"
												/>
											</div>
										</div>
										<div className="flex-1">
											<p className="font-semibold text-gray-800">
												{authUser?.fullName}
											</p>
											<p className="text-xs text-gray-500">
												View profile
											</p>
										</div>
									</div>

									{/* Menu Items */}
									<ul className="menu p-0 mt-2">
										<li>
											<Link
												to="/profile"
												className="text-gray-700 hover:bg-blue-50 hover:text-blue-600">
												<svg
													className="w-5 h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
													/>
												</svg>
												My Profile
											</Link>
										</li>
										<li>
											<Link
												to="/settings"
												className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
												<svg
													className="w-5 h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
												Settings
											</Link>
										</li>
										<li>
											<Link
												to="/help"
												className="text-gray-700 hover:bg-purple-50 hover:text-purple-600">
												<svg
													className="w-5 h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												Help & Support
											</Link>
										</li>
									</ul>

									<div className="divider my-2"></div>

									{/* Logout */}
									<button
										onClick={logoutMutation}
										className="btn btn-ghost btn-sm justify-start text-red-600 hover:bg-red-50 hover:text-red-700 w-full">
										<LogOut className="w-5 h-5" />
										Logout
									</button>
								</div>
							</div>
						</div>

						{/* Mobile Menu */}
						<button
							className="btn btn-ghost btn-circle lg:hidden"
							onClick={toggleSidebar}>
							<Menu className="w-5 h-5 text-gray-600" />
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
