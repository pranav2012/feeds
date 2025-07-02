import React, { useState, useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FORM_CONSTANTS } from "../utils/constants";
import {
	FormHeader,
	ErrorMessage,
	FormField,
	SubmitButton,
	FormFooter,
} from "./shared/FormComponents";

interface SignupFormProps {
	onSwitchToLogin?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = memo(({ onSwitchToLogin }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { signUp } = useAuth();
	const navigate = useNavigate();

	// Memoize form validation
	const validationResult = useMemo(() => {
		const { email, password, confirmPassword } = formData;

		if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
			return { isValid: false, error: "" };
		}

		if (password !== confirmPassword) {
			return {
				isValid: false,
				error: FORM_CONSTANTS.SIGNUP.ERRORS.PASSWORDS_MISMATCH,
			};
		}

		if (
			password.length <
			FORM_CONSTANTS.SIGNUP.VALIDATION.MIN_PASSWORD_LENGTH
		) {
			return {
				isValid: false,
				error: FORM_CONSTANTS.SIGNUP.ERRORS.PASSWORD_TOO_SHORT,
			};
		}

		return { isValid: true, error: "" };
	}, [formData]);

	// Memoized event handlers
	const handleEmailChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, email: e.target.value }));
		},
		[]
	);

	const handlePasswordChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, password: e.target.value }));
		},
		[]
	);

	const handleConfirmPasswordChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({
				...prev,
				confirmPassword: e.target.value,
			}));
		},
		[]
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setError("");

			// Validation
			if (!validationResult.isValid) {
				if (validationResult.error) {
					setError(validationResult.error);
				}
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
					setError(FORM_CONSTANTS.SIGNUP.ERRORS.ACCOUNT_EXISTS);
				}
			} catch {
				setError(FORM_CONSTANTS.SIGNUP.ERRORS.GENERIC);
			} finally {
				setIsLoading(false);
			}
		},
		[validationResult, signUp, formData.email, formData.password, navigate]
	);

	// Memoized constants
	const headerProps = useMemo(
		() => ({
			title: FORM_CONSTANTS.SIGNUP.HEADER.TITLE,
			subtitle: FORM_CONSTANTS.SIGNUP.HEADER.SUBTITLE,
			iconPath: FORM_CONSTANTS.SIGNUP.HEADER.ICON_PATH,
		}),
		[]
	);

	const footerProps = useMemo(
		() => ({
			message: FORM_CONSTANTS.SIGNUP.FOOTER.MESSAGE,
			linkText: FORM_CONSTANTS.SIGNUP.FOOTER.LINK_TEXT,
			onSwitchForm: onSwitchToLogin,
			linkTo: "/login",
		}),
		[onSwitchToLogin]
	);

	return (
		<div className="w-full max-w-lg bg-gray-100 p-2 rounded-2xl">
			{/* Main Signup Card */}
			<div className="bg-white rounded-2xl shadow-xl p-8">
				<FormHeader {...headerProps} />

				{/* Error Message */}
				{error && <ErrorMessage error={error} />}

				{/* Signup Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					<FormField
						id="email"
						name="email"
						type="email"
						label={FORM_CONSTANTS.SIGNUP.FIELDS.EMAIL.LABEL}
						placeholder={
							FORM_CONSTANTS.SIGNUP.FIELDS.EMAIL.PLACEHOLDER
						}
						value={formData.email}
						onChange={handleEmailChange}
						disabled={isLoading}
						autoComplete="email"
					/>

					<FormField
						id="password"
						name="password"
						type="password"
						label={FORM_CONSTANTS.SIGNUP.FIELDS.PASSWORD.LABEL}
						placeholder={
							FORM_CONSTANTS.SIGNUP.FIELDS.PASSWORD.PLACEHOLDER
						}
						value={formData.password}
						onChange={handlePasswordChange}
						disabled={isLoading}
						autoComplete="new-password"
					/>

					<FormField
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						label={
							FORM_CONSTANTS.SIGNUP.FIELDS.CONFIRM_PASSWORD.LABEL
						}
						placeholder={
							FORM_CONSTANTS.SIGNUP.FIELDS.CONFIRM_PASSWORD
								.PLACEHOLDER
						}
						value={formData.confirmPassword}
						onChange={handleConfirmPasswordChange}
						disabled={isLoading}
						autoComplete="new-password"
					/>

					<SubmitButton
						isLoading={isLoading}
						loadingText={FORM_CONSTANTS.SIGNUP.BUTTONS.LOADING}
						defaultText={FORM_CONSTANTS.SIGNUP.BUTTONS.SUBMIT}
					/>
				</form>
			</div>

			<FormFooter {...footerProps} />
		</div>
	);
});

SignupForm.displayName = "SignupForm";

export default SignupForm;
