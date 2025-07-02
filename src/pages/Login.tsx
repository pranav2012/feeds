import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { signIn } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const success = await signIn(email, password);
			if (success) {
				navigate("/feed");
			} else {
				setError(
					"Invalid email or password. Try demo@example.com / password123 or test@user.com / testpass"
				);
			}
		} catch (err) {
			setError("An error occurred during login. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Or{" "}
					<Link
						to="/signup"
						className="font-medium text-blue-600 hover:text-blue-500">
						create a new account
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					{/* Demo credentials info */}
					<div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
						<h3 className="text-sm font-medium text-blue-800 mb-2">
							Demo Credentials:
						</h3>
						<div className="text-sm text-blue-700">
							<p>
								<strong>demo@example.com</strong> / password123
							</p>
							<p>
								<strong>test@user.com</strong> / testpass
							</p>
						</div>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit}>
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
								{error}
							</div>
						)}

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Enter your email"
									disabled={isLoading}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Enter your password"
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900">
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-blue-600 hover:text-blue-500">
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
								{isLoading ? "Signing in..." : "Sign in"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
