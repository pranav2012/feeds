import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
	const { isSignedIn, signOut } = useAuth();

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<nav className="bg-white border-b border-gray-200">
			<div className="w-full px-6">
				<div className="flex justify-between items-center h-16">
					<Link
						to="/feed"
						className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
						<div className="w-8 h-8 flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 34 34"
								fill="none">
								<path
									d="M22.6667 17H19.8333M2.83333 17V17C2.83333 23.2592 7.90745 28.3333 14.1667 28.3333H19.8333C26.0926 28.3333 31.1667 23.2592 31.1667 17V17C31.1667 10.7408 26.0925 5.66667 19.8333 5.66667H14.1667C7.90744 5.66667 2.83333 10.7408 2.83333 17Z"
									stroke="black"
									strokeWidth="3.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<span>foo-rum</span>
					</Link>

					<div className="flex items-center">
						{isSignedIn ? (
							<button
								onClick={handleSignOut}
								className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
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
						) : (
							<Link
								to="/login"
								className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
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
