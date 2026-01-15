import { Bell, BellIcon, Globe, MessageCircle } from "lucide-react";

function NoNotificationsFound() {
	return (
		<div className="flex flex-col items-center justify-center py-16 px-4">
			<div className="relative mb-6">
				{/* linear circle background */}
				<div className="absolute inset-0 bg-linear-to-br from-purple-100 to-pink-100 rounded-full blur-2xl opacity-50"></div>

				{/* Icon container with animation */}
				<div className="relative w-24 h-24 rounded-full bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center border-4 border-white shadow-lg">
					<Bell className="w-12 h-12 text-purple-500 animate-pulse" />
				</div>
			</div>

			<h3 className="text-2xl font-bold text-gray-800 mb-2">
				No notifications yet
			</h3>
			<p className="text-gray-600 text-center max-w-md mb-6">
				When you receive friend requests, messages, or updates, they'll
				appear here. Stay connected!
			</p>

			{/* Info cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
				<div className="p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-white rounded-lg">
							<MessageCircle className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<p className="text-sm font-semibold text-gray-800">
								Messages
							</p>
							<p className="text-xs text-gray-600">
								Chat updates
							</p>
						</div>
					</div>
				</div>

				<div className="p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-white rounded-lg">
							<Globe className="w-5 h-5 text-purple-600" />
						</div>
						<div>
							<p className="text-sm font-semibold text-gray-800">
								Requests
							</p>
							<p className="text-xs text-gray-600">
								Friend requests
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NoNotificationsFound;
