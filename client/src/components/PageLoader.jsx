import { Loader2 } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
	const { theme } = useThemeStore();

	return (
		<div
			className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50"
			data-theme={theme}>
			<div className="flex items-center justify-center">
				<div className="p-4 rounded-full bg-white/80 shadow-lg backdrop-blur">
					<Loader2
						className="w-10 h-10 text-indigo-500 animate-spin"
						strokeWidth={2.5}
					/>
				</div>
			</div>
		</div>
	);
};

export default PageLoader;
