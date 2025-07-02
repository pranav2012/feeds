import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
	const [showSignupForm, setShowSignupForm] = useState(false);
	const { user } = useAuth();

	// Close modal when user successfully logs in or signs up
	useEffect(() => {
		if (user) {
			onClose();
		}
	}, [user, onClose]);

	// Reset to login view when modal opens
	useEffect(() => {
		if (isOpen) {
			setShowSignupForm(false);
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/50"
			onClick={onClose}>
			<div
				className="max-w-lg w-full mx-4"
				onClick={(e) => e.stopPropagation()}>
				<div className="p-4">
					{!showSignupForm ? (
						<LoginForm
							onSwitchToSignup={() => setShowSignupForm(true)}
						/>
					) : (
						<SignupForm
							onSwitchToLogin={() => setShowSignupForm(false)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
