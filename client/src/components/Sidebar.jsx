import {
	Home,
	Users,
	Bell,
	MessageCircle,
	Compass,
	Bookmark,
	Settings,
	TrendingUp,
} from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { useLocation, Link } from "react-router";

const Sidebar = () => {
	const { authUser } = useAuthUser();
	const location = useLocation();
	const currentPath = location.pathname;

	const navItems = [
		{ path: "/", icon: Home, label: "Home", color: "blue" },
		{ path: "/friends", icon: Users, label: "Friends", color: "indigo" },
		{
			path: "/messages",
			icon: MessageCircle,
			label: "Messages",
			color: "purple",
		},
		{
			path: "/notifications",
			icon: Bell,
			label: "Notifications",
			color: "pink",
		},
		{ path: "/explore", icon: Compass, label: "Explore", color: "green" },
		{ path: "/saved", icon: Bookmark, label: "Saved", color: "yellow" },
		{
			path: "/trending",
			icon: TrendingUp,
			label: "Trending",
			color: "red",
		},
	];

	const getActiveClasses = (path) => {
		if (currentPath === path) {
			return "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105";
		}
		return "text-gray-700 hover:bg-gray-100";
	};

	return (
		<aside className="w-72 bg-white border-r border-gray-200 hidden lg:flex flex-col h-screen sticky top-0 shadow-sm">
			{/* Logo Section */}
			<div className="p-6 border-b border-gray-200">
				<Link
					to="/"
					className="flex items-center gap-3 group">
					<div className="p-2.5 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
						<svg
							className="w-7 h-7 text-white"
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
					<span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
						Streamify
					</span>
				</Link>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-4 space-y-2 overflow-y-auto">
				<div className="space-y-1">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = currentPath === item.path;

						return (
							<Link
								key={item.path}
								to={item.path}
								className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 relative group ${getActiveClasses(
									item.path
								)}`}>
								<Icon
									className={`w-6 h-6 ${
										isActive
											? "text-white"
											: "text-gray-600 group-hover:text-blue-600"
									} transition-colors`}
								/>
								<span className="flex-1">{item.label}</span>

								{isActive && (
									<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
								)}
							</Link>
						);
					})}
				</div>

				{/* Divider */}
				<div className="divider my-4"></div>
			</nav>

			{/* User Profile Section */}
			<div className="p-4 border-t border-gray-200 bg-linear-to-br from-gray-50 to-white">
				<div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white transition-all cursor-pointer group">
					<div className="relative">
						<div className="avatar online">
							<div className="w-12 rounded-full ring-2 ring-blue-500 ring-offset-2 group-hover:ring-offset-4 transition-all">
								<img
									src={authUser?.profilePic}
									alt="User Avatar"
								/>
							</div>
						</div>
						<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
					</div>

					<div className="flex-1 min-w-0">
						<p className="font-semibold text-sm text-gray-800 truncate">
							{authUser?.fullName}
						</p>
						<div className="flex items-center gap-1.5 mt-0.5">
							<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
							<p className="text-xs text-green-600 font-medium">
								Active now
							</p>
						</div>
					</div>

					{/* Dropdown arrow */}
					<svg
						className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-3 gap-2 mt-3 px-1">
					<div className="text-center">
						<p className="text-lg font-bold text-gray-800">328</p>
						<p className="text-xs text-gray-500">Friends</p>
					</div>
					<div className="text-center border-x border-gray-200">
						<p className="text-lg font-bold text-gray-800">1.2K</p>
						<p className="text-xs text-gray-500">Followers</p>
					</div>
					<div className="text-center">
						<p className="text-lg font-bold text-gray-800">892</p>
						<p className="text-xs text-gray-500">Following</p>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
