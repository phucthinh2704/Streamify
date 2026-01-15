import { useState } from "react";
import { Sparkles, Users, MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
import toast from "react-hot-toast";
const SignUpPage = () => {
	const [signupData, setSignupData] = useState({
		fullName: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [agree, setAgree] = useState(false);

	const { isPending, signupMutation } = useSignUp();

	const handleSignup = (e) => {
		e.preventDefault();
		if (!signupData.fullName || !signupData.email || !signupData.password) {
			toast.error("Please fill in all required fields");
			return;
		}
		if (!agree) {
			toast.error("You must agree to the Terms and Privacy Policy");
			return;
		}
		signupMutation(signupData);
	};

	return (
		<div
			className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50"
			data-theme="light">
			{/* Animated background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
				<div
					className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
					style={{ animationDelay: "2s" }}></div>
			</div>

			<div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
				<div className="w-full max-w-6xl">
					<div className="grid lg:grid-cols-2 gap-0 bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">
						{/* LEFT - Form */}
						<div className="p-8 sm:p-12 lg:p-14 relative bg-linear-to-br from-base-100 to-base-200">
							{/* Logo */}
							<div className="mb-8">
								<div className="flex items-center gap-3 mb-8">
									<div className="p-2.5 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
										<svg
											className="w-7 h-7 text-white"
											stroke="currentColor"
											fill="white"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<span className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
										Streamify
									</span>
								</div>

								<div className="space-y-2">
									<h1 className="text-4xl font-bold text-base-content">
										Create Account
									</h1>
									<p className="text-base-content/70 text-lg">
										Join our community and start connecting
										worldwide
									</p>
								</div>
							</div>

							{/* Form */}
							<form
								className="space-y-5"
								onSubmit={handleSignup}>
								{/* Full Name */}
								<div className="form-control">
									<label className="label">
										<span className="label-text font-semibold text-base">
											Full Name
										</span>
									</label>
									<input
										type="text"
										placeholder="Enter your full name"
										className="input input-bordered input-lg w-full bg-base-100 focus:input-primary transition-all"
										value={signupData.fullName}
										onChange={(e) =>
											setSignupData({
												...signupData,
												fullName: e.target.value,
											})
										}
									/>
								</div>

								{/* Email */}
								<div className="form-control">
									<label className="label">
										<span className="label-text font-semibold text-base">
											Email Address
										</span>
									</label>
									<input
										type="email"
										placeholder="you@example.com"
										className="input input-bordered input-lg w-full bg-base-100 focus:input-primary transition-all"
										value={signupData.email}
										onChange={(e) =>
											setSignupData({
												...signupData,
												email: e.target.value,
											})
										}
									/>
								</div>

								{/* Password */}
								<div className="form-control">
									<label className="label">
										<span className="label-text font-semibold text-base">
											Password
										</span>
									</label>
									<div className="relative">
										<input
											type={
												showPassword
													? "text"
													: "password"
											}
											placeholder="Minimum 6 characters"
											className="input input-bordered input-lg w-full bg-base-100 focus:input-primary transition-all pr-12"
											value={signupData.password}
											onChange={(e) =>
												setSignupData({
													...signupData,
													password: e.target.value,
												})
											}
										/>

										<button
											type="button"
											onClick={() =>
												setShowPassword(!showPassword)
											}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary">
											{showPassword ? "🙈" : "👁️"}
										</button>
									</div>

									<label className="label">
										<span className="label-text-alt opacity-70">
											Password must be at least 6
											characters long
										</span>
									</label>
								</div>

								{/* Terms */}
								<div className="form-control">
									<label className="label cursor-pointer justify-start gap-3 p-0">
										<input
											type="checkbox"
											className="checkbox checkbox-primary"
											checked={agree}
											onChange={(e) =>
												setAgree(e.target.checked)
											}
										/>
										<span className="label-text">
											I agree to the{" "}
											<Link
												to="/terms"
												className="link link-primary font-medium">
												Terms of Service
											</Link>{" "}
											and{" "}
											<Link
												to="/privacy"
												className="link link-primary font-medium">
												Privacy Policy
											</Link>
										</span>
									</label>
								</div>

								{/* Submit */}
								<button
									className="btn btn-primary btn-lg w-full text-base font-semibold shadow-lg hover:shadow-xl transition-all"
									type="submit"
									disabled={isPending}
									onClick={handleSignup}>
									{isPending ? (
										<>
											<span className="loading loading-spinner loading-sm"></span>
											Creating Account...
										</>
									) : (
										<>
											<Sparkles className="w-5 h-5" />
											Create Account
										</>
									)}
								</button>

								{/* Sign In */}
								<div className="text-center pt-4">
									<p className="text-base-content/70">
										Already have an account?{" "}
										<Link
											to="/login"
											className="link link-primary font-semibold">
											Sign in
										</Link>
									</p>
								</div>
							</form>

							{/* Stats */}
							<div className="mt-8 pt-8 border-t border-base-300">
								<div className="grid grid-cols-3 gap-4 text-center">
									<div>
										<div className="font-bold text-2xl text-primary">
											10K+
										</div>
										<div className="text-xs text-base-content/60">
											Active Users
										</div>
									</div>
									<div>
										<div className="font-bold text-2xl text-secondary">
											50+
										</div>
										<div className="text-xs text-base-content/60">
											Countries
										</div>
									</div>
									<div>
										<div className="font-bold text-2xl text-accent">
											24/7
										</div>
										<div className="text-xs text-base-content/60">
											Support
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* RIGHT - Illustration */}
						<div className="hidden lg:flex flex-col bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 p-12 items-center justify-center relative overflow-hidden">
							<div className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
							<div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>

							<div className="relative z-10 max-w-md space-y-8">
								{/* Image */}
								<div className="relative">
									<div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
									<img
										src="/Video_call.png"
										alt="Connect"
										className="relative rounded-3xl shadow-2xl w-full"
									/>
								</div>

								{/* Features */}
								<div className="space-y-6">
									<div className="text-center space-y-3">
										<h2 className="text-3xl font-bold text-base-content">
											Connect Globally
										</h2>
										<p className="text-base-content/70 text-lg">
											Join millions building meaningful
											connections
										</p>
									</div>

									<div className="grid grid-cols-1 gap-4">
										<div className="flex items-center gap-4 p-4 bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-lg">
											<div className="p-3 bg-primary/10 rounded-xl">
												<Users className="w-6 h-6 text-primary" />
											</div>
											<div>
												<div className="font-semibold text-base-content">
													Find Community
												</div>
												<div className="text-sm text-base-content/60">
													Like-minded people
												</div>
											</div>
										</div>

										<div className="flex items-center gap-4 p-4 bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-lg">
											<div className="p-3 bg-secondary/10 rounded-xl">
												<MessageCircle className="w-6 h-6 text-secondary" />
											</div>
											<div>
												<div className="font-semibold text-base-content">
													Real-time Chat
												</div>
												<div className="text-sm text-base-content/60">
													Instant messaging
												</div>
											</div>
										</div>

										<div className="flex items-center gap-4 p-4 bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-lg">
											<div className="p-3 bg-accent/10 rounded-xl">
												<Heart className="w-6 h-6 text-accent" />
											</div>
											<div>
												<div className="font-semibold text-base-content">
													Share Moments
												</div>
												<div className="text-sm text-base-content/60">
													Express freely
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
