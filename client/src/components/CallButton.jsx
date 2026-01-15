import { Video } from "lucide-react";

function CallButton({ handleVideoCall }) {
	return (
		<div className="absolute top-0 right-0 z-10 bg-linear-to-b from-white/80 to-transparent backdrop-blur-sm">
			<div className="p-4 flex items-center justify-end mx-auto">
				<button
					onClick={handleVideoCall}
					className="btn btn-circle bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-none text-white shadow-lg hover:shadow-xl transition-all hover:scale-110">
					<Video className="w-6 h-6" />
				</button>
			</div>
		</div>
	);
}

export default CallButton;
