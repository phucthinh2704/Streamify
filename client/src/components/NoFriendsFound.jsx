import { Globe } from "lucide-react";

const NoFriendsFound = () => {
	return (
		<div className="flex flex-col items-center justify-center py-16 px-4">
			<div className="relative mb-6">
				{/* Gradient circle background */}
				<div className="absolute inset-0 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full blur-2xl opacity-50"></div>

				{/* Icon container */}
				<div className="relative w-24 h-24 rounded-full bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center border-4 border-white shadow-lg">
					<Globe className="w-12 h-12 text-blue-500" />
				</div>
			</div>

			<h3 className="text-2xl font-bold text-gray-800 mb-2">
				No friends yet
			</h3>
			<p className="text-gray-600 text-center max-w-md mb-6">
				Connect with language partners below to start practicing
				together and expand your learning community!
			</p>

			{/* Decorative dots */}
			<div className="flex gap-2">
				<div className="w-2 h-2 bg-blue-400 rounded-full"></div>
				<div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
				<div className="w-2 h-2 bg-purple-400 rounded-full"></div>
			</div>
		</div>
	);
};

export default NoFriendsFound;
