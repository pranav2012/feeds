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

interface LoginFormProps {
	onSwitchToSignup?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = memo(({ onSwitchToSignup }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { signIn } = useAuth();
	const navigate = useNavigate();

	// Memoize form validation
	const isFormValid = useMemo(() => {
		return email.trim().length > 0 && password.trim().length > 0;
	}, [email, password]);

	// Memoized event handlers
	const handleEmailChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value);
		},
		[]
	);

	const handlePasswordChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(e.target.value);
		},
		[]
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (!isFormValid) return;

			setError("");
			setIsLoading(true);

			try {
				const success = await signIn(email, password);
				if (success) {
					navigate("/feed");
				} else {
					setError(FORM_CONSTANTS.LOGIN.ERRORS.INVALID_CREDENTIALS);
				}
			} catch {
				setError(FORM_CONSTANTS.LOGIN.ERRORS.GENERIC);
			} finally {
				setIsLoading(false);
			}
		},
		[isFormValid, signIn, email, password, navigate]
	);

	// Memoized constants
	const headerProps = useMemo(
		() => ({
			title: FORM_CONSTANTS.LOGIN.HEADER.TITLE,
			subtitle: FORM_CONSTANTS.LOGIN.HEADER.SUBTITLE,
			iconPath: FORM_CONSTANTS.LOGIN.HEADER.ICON_PATH,
		}),
		[]
	);

	const footerProps = useMemo(
		() => ({
			message: FORM_CONSTANTS.LOGIN.FOOTER.MESSAGE,
			linkText: FORM_CONSTANTS.LOGIN.FOOTER.LINK_TEXT,
			onSwitchForm: onSwitchToSignup,
			linkTo: "/signup",
		}),
		[onSwitchToSignup]
	);

	return (
		<div className="w-full max-w-lg bg-gray-100 p-2 rounded-2xl">
			{/* Main Login Card */}
			<div className="bg-white rounded-2xl shadow-xl p-8">
				<FormHeader {...headerProps} />

				{/* Error Message */}
				{error && <ErrorMessage error={error} />}

				{/* Login Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					<FormField
						id="email"
						name="email"
						type="email"
						label={FORM_CONSTANTS.LOGIN.FIELDS.EMAIL.LABEL}
						placeholder={
							FORM_CONSTANTS.LOGIN.FIELDS.EMAIL.PLACEHOLDER
						}
						value={email}
						onChange={handleEmailChange}
						disabled={isLoading}
						autoComplete="email"
					/>

					<FormField
						id="password"
						name="password"
						type="password"
						label={FORM_CONSTANTS.LOGIN.FIELDS.PASSWORD.LABEL}
						placeholder={
							FORM_CONSTANTS.LOGIN.FIELDS.PASSWORD.PLACEHOLDER
						}
						value={password}
						onChange={handlePasswordChange}
						disabled={isLoading}
						autoComplete="current-password"
					/>

					<SubmitButton
						isLoading={isLoading}
						loadingText={FORM_CONSTANTS.LOGIN.BUTTONS.LOADING}
						defaultText={FORM_CONSTANTS.LOGIN.BUTTONS.SUBMIT}
					/>
				</form>
			</div>

			<FormFooter {...footerProps} />
		</div>
	);
});

LoginForm.displayName = "LoginForm";

export default LoginForm;
