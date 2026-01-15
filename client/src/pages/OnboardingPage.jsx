import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	BookOpen,
	Camera,
	Globe,
	Heart,
	Loader2,
	MapPin,
	Shuffle,
	Sparkles,
	Target,
	User,
	Users,
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
		<div className="min-h-screen bg-linear-to-br from-primary/5 via-base-100 to-secondary/5">
			{/* Animated Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "2s" }}></div>
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "4s" }}></div>
			</div>

			<div className="relative container mx-auto px-4 py-8 max-w-6xl">
				{/* Header Section */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center justify-center p-4 bg-linear-to-br from-primary to-secondary rounded-3xl shadow-2xl mb-6 animate-bounce">
						<Sparkles className="w-10 h-10 text-secondary" />
					</div>
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
						<span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
							Welcome to Your Journey
						</span>
					</h1>
					<p className="text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto">
						Let's create your profile and connect you with language
						partners worldwide
					</p>
				</div>

				{/* Progress Steps */}
				<div className="mb-8">
					<ul className="steps steps-horizontal w-full">
						<li className="step step-primary">Profile Picture</li>
						<li className="step step-primary">Personal Info</li>
						<li className="step">Languages</li>
						<li className="step">Complete</li>
					</ul>
				</div>

				{/* Main Form Card */}
				<div className="card bg-base-100 shadow-2xl border border-base-300">
					<div className="card-body p-6 sm:p-10">
						<div className="space-y-8">
							{/* Profile Picture Section */}
							<div className="text-center space-y-6">
								<div className="flex justify-center">
									<div className="relative">
										<div className="absolute -inset-1 bg-linear-to-r from-primary via-secondary to-accent rounded-full blur opacity-75"></div>
										<div className="relative">
											<div className="avatar">
												<div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
													{formState.profilePic ? (
														<img
															src={
																formState.profilePic
															}
															alt="Profile"
														/>
													) : (
														<div className="flex items-center justify-center h-full bg-linear-to-br from-primary/20 to-secondary/20">
															<Camera className="w-16 h-16 text-base-content/50" />
														</div>
													)}
												</div>
											</div>
											<button
												type="button"
												onClick={handleRandomAvatar}
												className="absolute bottom-2 right-2 btn btn-circle btn-primary btn-sm shadow-lg hover:shadow-xl">
												<Shuffle className="w-4 h-4" />
											</button>
										</div>
									</div>
								</div>

								<button
									type="button"
									onClick={handleRandomAvatar}
									className="btn btn-outline btn-primary gap-2">
									<Shuffle className="w-4 h-4" />
									Generate Random Avatar
								</button>
							</div>

							<div className="divider">Personal Information</div>

							{/* Form Grid */}
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									{/* Full Name */}
									<div className="form-control lg:col-span-2">
										<label className="label">
											<span className="label-text font-semibold text-base flex items-center gap-2">
												<User className="w-4 h-4 text-primary" />
												Full Name
											</span>
										</label>
										<input
											type="text"
											placeholder="Enter your full name"
											className="input input-bordered input-lg w-full focus:input-primary"
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
									<div className="form-control lg:col-span-2">
										<label className="label">
											<span className="label-text font-semibold text-base flex items-center gap-2">
												<BookOpen className="w-4 h-4 text-secondary" />
												About You
											</span>
										</label>
										<textarea
											placeholder="Tell us about yourself and your language learning goals..."
											className="textarea textarea-bordered textarea-lg h-32 w-full focus:textarea-primary resize-none"
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
												<Globe className="w-4 h-4 text-success" />
												Native Language
											</span>
										</label>
										<select
											className="select select-bordered select-lg w-full focus:select-success"
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
												<Target className="w-4 h-4 text-accent" />
												Learning Language
											</span>
										</label>
										<select
											className="select select-bordered select-lg w-full focus:select-accent"
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
									<div className="form-control lg:col-span-2">
										<label className="label">
											<span className="label-text font-semibold text-base flex items-center gap-2">
												<MapPin className="w-4 h-4 text-error" />
												Location
											</span>
										</label>
										<input
											type="text"
											placeholder="City, Country"
											className="input input-bordered input-lg w-full focus:input-error"
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
	
								{/* Submit Button */}
								<div className="pt-6">
									<button
										onClick={handleSubmit}
										disabled={isPending}
										type="submit"
										className="btn btn-lg w-full bg-linear-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-600 text-white border-none shadow-xl hover:shadow-2xl">
										{isPending ? (
											<>
												<Loader2 className="w-5 h-5 animate-spin" />
												Creating Your Profile...
											</>
										) : (
											<>
												<Sparkles className="w-5 h-5" />
												Complete Setup
											</>
										)}
									</button>
								</div>
							</form>

							<p className="text-center text-sm text-base-content/60">
								You can always update your profile later in
								settings
							</p>
						</div>
					</div>
				</div>

				{/* Features Grid */}
				<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="card bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-lg hover:shadow-xl transition-all">
						<div className="card-body items-center text-center">
							<div className="p-4 bg-primary/20 rounded-2xl mb-4">
								<Users className="w-10 h-10 text-primary" />
							</div>
							<h3 className="card-title text-xl">
								Global Community
							</h3>
							<p className="text-base-content/70">
								Connect with learners from around the world
							</p>
						</div>
					</div>

					<div className="card bg-linear-to-br from-secondary/10 to-secondary/5 border border-secondary/20 shadow-lg hover:shadow-xl transition-all">
						<div className="card-body items-center text-center">
							<div className="p-4 bg-secondary/20 rounded-2xl mb-4">
								<Target className="w-10 h-10 text-secondary" />
							</div>
							<h3 className="card-title text-xl">
								Practice Together
							</h3>
							<p className="text-base-content/70">
								Learn with native speakers daily
							</p>
						</div>
					</div>

					<div className="card bg-linear-to-br from-accent/10 to-accent/5 border border-accent/20 shadow-lg hover:shadow-xl transition-all">
						<div className="card-body items-center text-center">
							<div className="p-4 bg-accent/20 rounded-2xl mb-4">
								<Heart className="w-10 h-10 text-accent" />
							</div>
							<h3 className="card-title text-xl">
								Track Progress
							</h3>
							<p className="text-base-content/70">
								See your improvement journey
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OnboardingPage;
