import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SignupFormProps {
	onSwitchToLogin?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { signUp } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		// Validation
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}

		setIsLoading(true);

		try {
			const success = await signUp({
				email: formData.email,
				password: formData.password,
			});

			if (success) {
				navigate("/feed");
			} else {
				setError(
					"Failed to create account. Email might already be in use."
				);
			}
		} catch {
			setError("An error occurred during signup. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-lg bg-gray-100 p-2 rounded-2xl">
			{/* Main Signup Card */}
			<div className="bg-white rounded-2xl shadow-xl p-8">
				{/* Login Icon */}
				<div className="flex justify-center mb-6">
					<div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
						<svg
							className="w-6 h-6 text-gray-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
							/>
						</svg>
					</div>
				</div>

				{/* Heading */}
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold text-gray-900 mb-2">
						Create an account to continue
					</h1>
					<p className="text-gray-500">
						Create an account to access all the features on this app
					</p>
				</div>

				{/* Error Message */}
				{error && (
					<div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
						{error}
					</div>
				)}

				{/* Signup Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Email Field */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-900 mb-2">
							Email or username
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
							placeholder="Enter your email or username"
							disabled={isLoading}
						/>
					</div>

					{/* Password Field */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-900 mb-2">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							value={formData.password}
							onChange={handleChange}
							className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
							placeholder="Enter your password"
							disabled={isLoading}
						/>
					</div>

					{/* Repeat Password Field */}
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-900 mb-2">
							Repeat password
						</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							value={formData.confirmPassword}
							onChange={handleChange}
							className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
							placeholder="Enter your password again"
							disabled={isLoading}
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
						{isLoading ? "Signing Up..." : "Sign Up"}
					</button>
				</form>
			</div>

			{/* Sign In Link */}
			<div className="text-center mt-2">
				<p className="text-gray-600 text-sm">
					Already have an account?{" "}
					{onSwitchToLogin ? (
						<button
							onClick={onSwitchToLogin}
							className="text-blue-600 hover:text-blue-700 text-sm underline">
							Sign In
						</button>
					) : (
						<Link
							to="/login"
							className="text-blue-600 hover:text-blue-700 text-sm">
							Sign In
						</Link>
					)}
				</p>
			</div>
		</div>
	);
};

export default SignupForm;
