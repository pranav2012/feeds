import React from "react";
import { Link } from "react-router-dom";

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50"
			onClick={onClose}>
			<div
				className="bg-white rounded-lg shadow-2xl border-2 border-gray-200 max-w-md w-full mx-4"
				onClick={(e) => e.stopPropagation()}>
				<div className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold text-gray-900">
							Sign in required
						</h2>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 text-2xl">
							×
						</button>
					</div>

					<p className="text-gray-600 mb-6">
						You need to be signed in to interact with posts. Join
						our community to like, comment, and share posts!
					</p>

					<div className="space-y-3">
						<Link
							to="/login"
							className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium text-center block">
							Sign In
						</Link>

						<Link
							to="/signup"
							className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 font-medium text-center block">
							Create Account
						</Link>
					</div>

					<button
						onClick={onClose}
						className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700">
						Continue browsing
					</button>
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
