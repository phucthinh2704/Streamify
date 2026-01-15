import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Camera,
  Globe,
  Loader2,
  MapPin,
  Shuffle,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constants";
import useAuthUser from "../hooks/useAuthUser.jsx";
import { completeOnboarding } from "../lib/api.jsx";
const OnboardingPage = () => {
	const { authUser } = useAuthUser();
	const queryClient = useQueryClient();

	const [formState, setFormState] = useState({
		fullName: authUser?.fullName || "",
		bio: authUser?.bio || "",
		nativeLanguage: authUser?.nativeLanguage || "",
		learningLanguage: authUser?.learningLanguage || "",
		location: authUser?.location || "",
		profilePic: authUser?.profilePic || "",
	});

	const { mutate: onboardingMutation, isPending } = useMutation({
		mutationFn: completeOnboarding,
		onSuccess: () => {
			toast.success("Profile onboarded successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},

		onError: (error) => {
			toast.error(error.message || "Failed to complete onboarding");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		onboardingMutation(formState);
	};

	const handleRandomAvatar = () => {
		const randomNum = Math.floor(Math.random() * 70) + 1;
		const randomAvatar = `https://i.pravatar.cc/150?img=${randomNum}`;
		setFormState({ ...formState, profilePic: randomAvatar });
	};

	return (
		<div
			className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4"
			data-theme="light">
			{/* Background decoration */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
				<div
					className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
					style={{ animationDelay: "2s" }}></div>
			</div>

			<div className="relative max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
						<Sparkles className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-3">
						Complete Your Profile
					</h1>
					<p className="text-gray-600 text-lg max-w-2xl mx-auto">
						Let's personalize your experience and connect you with
						the perfect language partners
					</p>
				</div>

				{/* Main Card */}
				<div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
					{/* Progress indicator */}
					<div className="h-2 bg-gray-100">
						<div className="h-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 w-1/2 transition-all duration-500"></div>
					</div>

					<div className="p-8 sm:p-12">
						<div className="space-y-8">
							{/* Profile Picture Section */}
							<div className="flex flex-col items-center space-y-6">
								<div className="relative">
									{/* Avatar container with gradient ring */}
									<div className="relative">
										<div className="absolute -inset-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur opacity-50"></div>
										<div className="relative w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-xl">
											{formState.profilePic ? (
												<img
													src={formState.profilePic}
													alt="Profile"
													className="w-full h-full object-cover"
												/>
											) : (
												<div className="flex items-center justify-center h-full bg-linear-to-br from-blue-100 to-indigo-100">
													<Camera className="w-12 h-12 text-gray-400" />
												</div>
											)}
										</div>
									</div>

									{/* Camera badge */}
									<button
										type="button"
										onClick={handleRandomAvatar}
										className="absolute bottom-0 right-0 p-2 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110">
										<Shuffle className="w-4 h-4 text-white" />
									</button>
								</div>

								<button
									type="button"
									onClick={handleRandomAvatar}
									className="btn btn-outline btn-primary gap-2">
									<Shuffle className="w-4 h-4" />
									Generate Random Avatar
								</button>
							</div>

							{/* Form Fields */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Full Name */}
								<div className="form-control md:col-span-2">
									<label className="label">
										<span className="label-text font-semibold text-base flex items-center gap-2">
											<User className="w-4 h-4 text-blue-500" />
											Full Name
										</span>
									</label>
									<input
										type="text"
										placeholder="Enter your full name"
										className="input input-bordered input-lg w-full bg-gray-50 focus:bg-white focus:border-blue-500 transition-all"
										value={formState.fullName}
										onChange={(e) =>
											setFormState({
												...formState,
												fullName: e.target.value,
											})
										}
									/>
								</div>

								{/* Bio */}
								<div className="form-control md:col-span-2">
									<label className="label">
										<span className="label-text font-semibold text-base flex items-center gap-2">
											<BookOpen className="w-4 h-4 text-indigo-500" />
											About You
										</span>
									</label>
									<textarea
										placeholder="Tell us about yourself and your language learning goals..."
										className="textarea textarea-bordered textarea-lg h-28 w-full bg-gray-50 focus:bg-white focus:border-indigo-500 transition-all resize-none"
										value={formState.bio}
										onChange={(e) =>
											setFormState({
												...formState,
												bio: e.target.value,
											})
										}
									/>
								</div>

								{/* Native Language */}
								<div className="form-control">
									<label className="label">
										<span className="label-text font-semibold text-base flex items-center gap-2">
											<Globe className="w-4 h-4 text-green-500" />
											Native Language
										</span>
									</label>
									<select
										className="select select-bordered select-lg w-full bg-gray-50 focus:bg-white focus:border-green-500 transition-all"
										value={formState.nativeLanguage}
										onChange={(e) =>
											setFormState({
												...formState,
												nativeLanguage: e.target.value,
											})
										}>
										<option value="">
											Select your native language
										</option>
										{LANGUAGES.map((lang) => (
											<option
												key={`native-${lang}`}
												value={lang.toLowerCase()}>
												{lang}
											</option>
										))}
									</select>
								</div>

								{/* Learning Language */}
								<div className="form-control">
									<label className="label">
										<span className="label-text font-semibold text-base flex items-center gap-2">
											<Sparkles className="w-4 h-4 text-purple-500" />
											Learning Language
										</span>
									</label>
									<select
										className="select select-bordered select-lg w-full bg-gray-50 focus:bg-white focus:border-purple-500 transition-all"
										value={formState.learningLanguage}
										onChange={(e) =>
											setFormState({
												...formState,
												learningLanguage:
													e.target.value,
											})
										}>
										<option value="">
											Select language you're learning
										</option>
										{LANGUAGES.map((lang) => (
											<option
												key={`learning-${lang}`}
												value={lang.toLowerCase()}>
												{lang}
											</option>
										))}
									</select>
								</div>

								{/* Location */}
								<div className="form-control md:col-span-2">
									<label className="label">
										<span className="label-text font-semibold text-base flex items-center gap-2">
											<MapPin className="w-4 h-4 text-red-500" />
											Location
										</span>
									</label>
									<div className="relative">
										<MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
										<input
											type="text"
											placeholder="City, Country"
											className="input input-bordered input-lg w-full pl-12 bg-gray-50 focus:bg-white focus:border-red-500 transition-all"
											value={formState.location}
											onChange={(e) =>
												setFormState({
													...formState,
													location: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</div>

							{/* Submit Button */}
							<div className="pt-4">
								<button
									onClick={handleSubmit}
									disabled={isPending}
									className="btn btn-lg w-full bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-none shadow-lg hover:shadow-xl transition-all text-base font-semibold">
									{isPending ? (
										<>
											<Loader2 className="w-5 h-5 animate-spin" />
											Completing Profile...
										</>
									) : (
										<>
											<Sparkles className="w-5 h-5" />
											Complete Onboarding
										</>
									)}
								</button>
							</div>

							{/* Help text */}
							<p className="text-center text-sm text-gray-500 pt-2">
								You can always update your profile later in
								settings
							</p>
						</div>
					</div>
				</div>

				{/* Features showcase */}
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200">
						<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
							<Globe className="w-6 h-6 text-blue-600" />
						</div>
						<h3 className="font-semibold text-gray-800 mb-1">
							Global Community
						</h3>
						<p className="text-sm text-gray-600">
							Connect with learners worldwide
						</p>
					</div>

					<div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200">
						<div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
							<BookOpen className="w-6 h-6 text-indigo-600" />
						</div>
						<h3 className="font-semibold text-gray-800 mb-1">
							Learn Together
						</h3>
						<p className="text-sm text-gray-600">
							Practice with native speakers
						</p>
					</div>

					<div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200">
						<div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
							<Sparkles className="w-6 h-6 text-purple-600" />
						</div>
						<h3 className="font-semibold text-gray-800 mb-1">
							Track Progress
						</h3>
						<p className="text-sm text-gray-600">
							See your improvement over time
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OnboardingPage;
