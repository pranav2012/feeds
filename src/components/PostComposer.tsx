import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface PostComposerProps {
	onPostCreated: () => void;
	onAuthRequired: () => void;
}

const PostComposer: React.FC<PostComposerProps> = ({
	onPostCreated,
	onAuthRequired,
}) => {
	const [content, setContent] = useState("");
	const [isPosting, setIsPosting] = useState(false);
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const counter = 99;
	const { isSignedIn, user } = useAuth();

	const handleSubmit = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (!content.trim() || !isSignedIn || !user) return;

		setIsPosting(true);
		try {
			// Import the database utility
			const { feedsDB } = await import("../utils/indexedDB");

			await feedsDB.addPost({
				content: content.trim(),
				emoji: "😊",
				author: `${user.firstName} ${user.lastName}`,
				authorAvatar:
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
			});

			setContent("");
			onPostCreated();
			console.log("Post created successfully!");
		} catch (error) {
			console.error("Failed to create post:", error);
		} finally {
			setIsPosting(false);
		}
	};

	const handleSendClick = () => {
		if (!isSignedIn) {
			onAuthRequired();
			return;
		}
		handleSubmit();
	};

	const handleTextareaClick = () => {
		if (!isSignedIn) {
			onAuthRequired();
			return;
		}
	};

	const handleToolbarButtonClick = (action: string) => {
		if (!isSignedIn) {
			onAuthRequired();
			return;
		}

		switch (action) {
			case "bold":
				setIsBold(!isBold);
				break;
			case "italic":
				setIsItalic(!isItalic);
				break;
			case "underline":
				setIsUnderline(!isUnderline);
				break;
			case "delete":
				setContent("");
				break;
			default:
				console.log(`${action} clicked`);
		}
	};

	const handleActionButtonClick = (action: string) => {
		if (!isSignedIn) {
			onAuthRequired();
			return;
		}
		console.log(`${action} button clicked`);
	};

	return (
		<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-2xl mx-auto">
			{/* Top Toolbar */}
			<div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
				<div className="flex items-center space-x-3">
					{/* Paragraph Dropdown */}
					<div className="relative">
						<select
							className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
							disabled={!isSignedIn}
							onClick={() => !isSignedIn && onAuthRequired()}>
							<option>Paragraph</option>
							<option>Heading 1</option>
							<option>Heading 2</option>
							<option>Quote</option>
						</select>
						<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>

					{/* Formatting Buttons */}
					<div className="flex items-center space-x-1">
						<button
							type="button"
							onClick={() => handleToolbarButtonClick("bold")}
							className={`p-2 rounded-lg text-sm font-bold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
								isBold
									? "bg-blue-100 text-blue-600"
									: "text-gray-600"
							}`}>
							B
						</button>
						<button
							type="button"
							onClick={() => handleToolbarButtonClick("italic")}
							className={`p-2 rounded-lg text-sm italic hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
								isItalic
									? "bg-blue-100 text-blue-600"
									: "text-gray-600"
							}`}>
							I
						</button>
						<button
							type="button"
							onClick={() =>
								handleToolbarButtonClick("underline")
							}
							className={`p-2 rounded-lg text-sm underline hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
								isUnderline
									? "bg-blue-100 text-blue-600"
									: "text-gray-600"
							}`}>
							U
						</button>
					</div>

					{/* List Buttons */}
					<div className="flex items-center space-x-1 border-l border-gray-200 pl-3">
						<button
							type="button"
							onClick={() =>
								handleToolbarButtonClick("bulletList")
							}
							className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						<button
							type="button"
							onClick={() =>
								handleToolbarButtonClick("numberedList")
							}
							className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>

					{/* Code and Counter */}
					<div className="flex items-center space-x-2 border-l border-gray-200 pl-3">
						<button
							type="button"
							onClick={() => handleToolbarButtonClick("code")}
							className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
								/>
							</svg>
						</button>
						<span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-sm font-medium">
							{counter}
						</span>
					</div>
				</div>

				{/* Delete Button */}
				<button
					type="button"
					onClick={() => handleToolbarButtonClick("delete")}
					className="p-2 rounded-lg text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors">
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
				</button>
			</div>

			{/* Message Input Area */}
			<div className="mb-4">
				<div className="flex items-start space-x-3">
					<div className="flex-shrink-0 mt-1">
						<span className="text-2xl">😊</span>
					</div>
					<div className="flex-1">
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							onClick={handleTextareaClick}
							placeholder="How are you feeling today?"
							className="w-full min-h-[120px] p-3 border border-gray-200 rounded-lg resize-none outline-none text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
							maxLength={500}
							readOnly={!isSignedIn}
							style={{
								fontWeight: isBold ? "bold" : "normal",
								fontStyle: isItalic ? "italic" : "normal",
								textDecoration: isUnderline
									? "underline"
									: "none",
							}}
						/>
						<div className="flex justify-end mt-1">
							<span className="text-xs text-gray-400">
								{content.length}/500
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Action Bar */}
			<div className="flex items-center justify-between pt-3 border-t border-gray-100">
				<div className="flex items-center space-x-2">
					<button
						type="button"
						onClick={() => handleActionButtonClick("add")}
						className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</button>
					<button
						type="button"
						onClick={() => handleActionButtonClick("microphone")}
						className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
							/>
						</svg>
					</button>
					<button
						type="button"
						onClick={() => handleActionButtonClick("video")}
						className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
					</button>
				</div>

				{/* Send Button */}
				<button
					type="button"
					onClick={handleSendClick}
					disabled={!content.trim() || isPosting}
					className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
					{isPosting ? (
						<svg
							className="w-5 h-5 animate-spin"
							fill="none"
							viewBox="0 0 24 24">
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					) : (
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
						</svg>
					)}
				</button>
			</div>
		</div>
	);
};

export default PostComposer;
