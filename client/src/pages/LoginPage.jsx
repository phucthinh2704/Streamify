import { Heart, Lock, LogIn, Mail, MessageCircle, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";

const LoginPage = () => {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const { isPending, loginMutation } = useLogin();

	const handleLogin = (e) => {
		e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
		loginMutation(loginData);
	};

	return (
		<div
			className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50"
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
									<span className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
										Streamify
									</span>
								</div>

								<div className="space-y-2">
									<h1 className="text-4xl font-bold text-gray-800">
										Welcome Back
									</h1>
									<p className="text-gray-600 text-lg">
										Sign in to continue your language
										learning journey
									</p>
								</div>
							</div>

							{/* Form */}
							<form className="space-y-5" onSubmit={handleLogin}>
								{/* Email */}
								<div className="form-control">
									<label className="label">
										<span className="label-text font-semibold text-base flex items-center gap-2">
											<Mail className="w-4 h-4 text-blue-500" />
											Email Address
										</span>
									</label>
									<input
										type="email"
										placeholder="you@example.com"
										className="input input-bordered input-lg w-full bg-base-100 focus:input-primary transition-all"
										value={loginData.email}
										onChange={(e) =>
											setLoginData({
												...loginData,
												email: e.target.value,
											})
										}
									/>
								</div>

								{/* Password */}
								<div className="form-control">
									<label className="label">
										<span className="label-text font-semibold text-base flex items-center gap-2">
											<Lock className="w-4 h-4 text-indigo-500" />
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
											placeholder="Enter your password"
											className="input input-bordered input-lg w-full bg-base-100 focus:input-primary transition-all pr-12"
											value={loginData.password}
											onChange={(e) =>
												setLoginData({
													...loginData,
													password: e.target.value,
												})
											}
										/>

										<button
											type="button"
											onClick={() =>
												setShowPassword(!showPassword)
											}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-500">
											{showPassword ? "🙈" : "👁️"}
										</button>
									</div>

									<label className="label">
										<span className="label-text-alt"></span>
										<a
											href="#"
											className="label-text-alt link link-primary font-medium">
											Forgot password?
										</a>
									</label>
								</div>

								{/* Remember me */}
								<div className="form-control">
									<label className="label cursor-pointer justify-start gap-3 p-0">
										<input
											type="checkbox"
											className="checkbox checkbox-primary checkbox-sm"
										/>
										<span className="label-text">
											Remember me for 30 days
										</span>
									</label>
								</div>

								{/* Submit */}
								<button
									className="btn btn-primary btn-lg w-full text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  type="submit"
									onClick={handleLogin}
									disabled={isPending}>
									{isPending ? (
										<>
											<span className="loading loading-spinner loading-sm"></span>
											Signing in...
										</>
									) : (
										<>
											<LogIn className="w-5 h-5" />
											Sign In
										</>
									)}
								</button>

								{/* Divider */}
								<div className="divider text-sm text-gray-500">
									OR
								</div>

								{/* Social Login Buttons */}
								<div className="grid grid-cols-2 gap-3">
									<button className="btn btn-outline gap-2">
										<svg
											className="w-5 h-5"
											viewBox="0 0 24 24">
											<path
												fill="currentColor"
												d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											/>
											<path
												fill="currentColor"
												d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											/>
											<path
												fill="currentColor"
												d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											/>
											<path
												fill="currentColor"
												d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											/>
										</svg>
										Google
									</button>
									<button className="btn btn-outline gap-2">
										<svg
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
										</svg>
										Facebook
									</button>
								</div>

								{/* Sign Up Link */}
								<div className="text-center pt-4">
									<p className="text-base-content/70">
										Don't have an account?{" "}
										<Link
											to="/signup"
											className="link link-primary font-semibold">
											Create one
										</Link>
									</p>
								</div>
							</form>

							{/* Trust badges */}
							<div className="mt-8 pt-8 border-t border-base-300">
								<div className="flex items-center justify-center gap-8 text-xs text-gray-500">
									<div className="flex items-center gap-1">
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
												clipRule="evenodd"
											/>
										</svg>
										<span>Secure Login</span>
									</div>
									<div className="flex items-center gap-1">
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
										<span>Privacy Protected</span>
									</div>
								</div>
							</div>
						</div>

						{/* RIGHT - Illustration */}
						<div className="hidden lg:flex flex-col bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 items-center justify-center relative overflow-hidden">
							<div className="absolute top-10 right-10 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl"></div>
							<div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-200/40 rounded-full blur-3xl"></div>

							<div className="relative z-10 max-w-md space-y-8">
								{/* Image */}
								<div className="relative">
									<div className="absolute inset-0 bg-linear-to-br from-blue-300/30 to-indigo-300/30 rounded-3xl blur-2xl"></div>
									<img
										src="/Video_call.png"
										alt="Connect"
										className="relative rounded-3xl shadow-2xl w-full"
									/>
								</div>

								{/* Features */}
								<div className="space-y-6">
									<div className="text-center space-y-3">
										<h2 className="text-3xl font-bold text-gray-800">
											Your Learning Hub
										</h2>
										<p className="text-gray-600 text-lg">
											Join our community and accelerate
											your progress
										</p>
									</div>

									<div className="grid grid-cols-1 gap-4">
										<div className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
											<div className="p-3 bg-blue-100 rounded-xl">
												<Users className="w-6 h-6 text-blue-600" />
											</div>
											<div>
												<div className="font-semibold text-gray-800">
													Connect Worldwide
												</div>
												<div className="text-sm text-gray-600">
													Meet native speakers
												</div>
											</div>
										</div>

										<div className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100">
											<div className="p-3 bg-indigo-100 rounded-xl">
												<MessageCircle className="w-6 h-6 text-indigo-600" />
											</div>
											<div>
												<div className="font-semibold text-gray-800">
													Practice Daily
												</div>
												<div className="text-sm text-gray-600">
													Real conversations
												</div>
											</div>
										</div>

										<div className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100">
											<div className="p-3 bg-purple-100 rounded-xl">
												<Heart className="w-6 h-6 text-purple-600" />
											</div>
											<div>
												<div className="font-semibold text-gray-800">
													Track Progress
												</div>
												<div className="text-sm text-gray-600">
													See your growth
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

export default LoginPage;
