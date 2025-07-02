import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
	const { isSignedIn, user, signOut } = useAuth();

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<nav className="bg-white shadow-sm border-b">
			<div className="max-w-2xl mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center space-x-8">
						<Link
							to="/feed"
							className="flex items-center space-x-2 text-xl font-bold text-gray-900">
							<div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
								<span className="text-white text-sm font-bold">
									f
								</span>
							</div>
							<span>foo-rum</span>
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						{isSignedIn ? (
							<>
								<span className="text-sm text-gray-600">
									Welcome, {user?.email}!
								</span>
								<button
									onClick={handleSignOut}
									className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
									<span>Sign Out</span>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
								</button>
							</>
						) : (
							<Link
								to="/login"
								className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
								<span>Login</span>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
									/>
								</svg>
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
