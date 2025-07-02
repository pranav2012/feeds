import React, { memo } from "react";
import { Link } from "react-router-dom";

// Memoized form header component
export const FormHeader = memo(
	({
		title,
		subtitle,
		iconPath,
	}: {
		title: string;
		subtitle: string;
		iconPath: string;
	}) => (
		<>
			{/* Form Icon */}
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
							d={iconPath}
						/>
					</svg>
				</div>
			</div>

			{/* Heading */}
			<div className="text-center mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					{title}
				</h1>
				<p className="text-gray-500">{subtitle}</p>
			</div>
		</>
	)
);

// Memoized error message component
export const ErrorMessage = memo(({ error }: { error: string }) => (
	<div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
		{error}
	</div>
));

// Memoized form field component
export const FormField = memo(
	({
		id,
		name,
		type,
		label,
		placeholder,
		value,
		onChange,
		disabled,
		required = true,
		autoComplete,
	}: {
		id: string;
		name: string;
		type: string;
		label: string;
		placeholder: string;
		value: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		disabled: boolean;
		required?: boolean;
		autoComplete?: string;
	}) => (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-900 mb-2">
				{label}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				autoComplete={autoComplete}
				required={required}
				value={value}
				onChange={onChange}
				className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
				placeholder={placeholder}
				disabled={disabled}
			/>
		</div>
	)
);

// Memoized submit button component
export const SubmitButton = memo(
	({
		isLoading,
		loadingText,
		defaultText,
	}: {
		isLoading: boolean;
		loadingText: string;
		defaultText: string;
	}) => (
		<button
			type="submit"
			disabled={isLoading}
			className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
			{isLoading ? loadingText : defaultText}
		</button>
	)
);

// Memoized footer component
export const FormFooter = memo(
	({
		message,
		linkText,
		onSwitchForm,
		linkTo,
	}: {
		message: string;
		linkText: string;
		onSwitchForm?: () => void;
		linkTo?: string;
	}) => (
		<div className="text-center mt-2">
			<p className="text-gray-600 text-sm">
				{message}{" "}
				{onSwitchForm ? (
					<button
						onClick={onSwitchForm}
						className="text-blue-600 hover:text-blue-700 text-sm underline">
						{linkText}
					</button>
				) : (
					<Link
						to={linkTo!}
						className="text-blue-600 hover:text-blue-700 text-sm">
						{linkText}
					</Link>
				)}
			</p>
		</div>
	)
);

// Set display names for better debugging
FormHeader.displayName = "FormHeader";
ErrorMessage.displayName = "ErrorMessage";
FormField.displayName = "FormField";
SubmitButton.displayName = "SubmitButton";
FormFooter.displayName = "FormFooter";
