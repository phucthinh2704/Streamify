import { MessageCircle } from "lucide-react";
import { Link } from "react-router";
import getLanguageFlag from "../utils/getLanguageFlag";

const FriendCard = ({ friend }) => {
	return (
		<div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300">
			{/* Gradient overlay on hover */}
			<div className="absolute inset-0 bg-linear-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-300"></div>

			<div className="relative p-5">
				{/* User Info */}
				<div className="flex items-center gap-4 mb-4">
					<div className="relative">
						<div className="avatar online">
							<div className="w-14 h-14 rounded-full ring-2 ring-blue-500 ring-offset-2 group-hover:ring-offset-4 transition-all">
								<img
									src={friend.profilePic}
									alt={friend.fullName}
								/>
							</div>
						</div>
						<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
					</div>

					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-gray-800 truncate text-lg">
							{friend.fullName}
						</h3>
						<p className="text-sm text-gray-500">Active now</p>
					</div>
				</div>

				{/* Language Badges */}
				<div className="flex flex-wrap gap-2 mb-4">
					<div className="flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-blue-100 to-indigo-100 rounded-lg border border-blue-200">
						{getLanguageFlag(friend.nativeLanguage)}
						<span className="text-xs font-medium text-blue-700">
							Native: {friend.nativeLanguage}
						</span>
					</div>
					<div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-gray-300">
						{getLanguageFlag(friend.learningLanguage)}
						<span className="text-xs font-medium text-gray-700">
							Learning: {friend.learningLanguage}
						</span>
					</div>
				</div>

				{/* Action Button */}
				<Link
					to={`/chat/${friend._id}`}
					className="btn btn-primary w-full bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-none text-white shadow-md hover:shadow-lg transition-all gap-2">
					<MessageCircle className="w-4 h-4" />
					Send Message
				</Link>
			</div>
		</div>
	);
};
export default FriendCard;
