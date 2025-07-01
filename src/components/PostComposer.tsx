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
	const [selectedEmoji, setSelectedEmoji] = useState("😊");
	const [isPosting, setIsPosting] = useState(false);
	const { isSignedIn } = useAuth();

	const emojis = ["😊", "💡", "🧠", "❤️", "🎉", "🤔", "🔥", "⭐", "🌟", "💪"];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim() || !isSignedIn) return;

		setIsPosting(true);
		try {
			// Import the database utility
			const { feedsDB } = await import("../utils/indexedDB");

			await feedsDB.addPost({
				content: content.trim(),
				emoji: selectedEmoji,
				author: "Current User", // In a real app, this would come from auth context
				authorAvatar:
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
			});

			setContent("");
			setSelectedEmoji("😊");
			onPostCreated();
		} catch (error) {
			console.error("Failed to create post:", error);
		} finally {
			setIsPosting(false);
		}
	};

	const handleTextareaClick = () => {
		if (!isSignedIn) {
			onAuthRequired();
			return;
		}
	};

	const handleButtonClick = () => {
		if (!isSignedIn) {
			onAuthRequired();
			return;
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-sm border p-4">
			<form onSubmit={handleSubmit}>
				<div className="flex items-start space-x-3">
					<div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
						<span className="text-lg">{selectedEmoji}</span>
					</div>
					<div className="flex-1">
						<div className="border border-gray-200 rounded-lg p-3 min-h-[80px] bg-gray-50 relative">
							<textarea
								value={content}
								onChange={(e) => setContent(e.target.value)}
								onClick={handleTextareaClick}
								placeholder="How are you feeling today?"
								className="w-full h-full bg-transparent resize-none outline-none text-gray-800 placeholder-gray-500"
								rows={3}
								maxLength={500}
								readOnly={!isSignedIn}
							/>

							{/* Toolbar */}
							<div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
								<div className="flex items-center space-x-3">
									{/* Emoji Picker */}
									<div className="relative group">
										<button
											type="button"
											onClick={handleButtonClick}
											className="text-gray-400 hover:text-gray-600 p-1">
											<span className="text-lg">
												{selectedEmoji}
											</span>
										</button>
										<div className="absolute bottom-8 left-0 bg-white border rounded-lg shadow-lg p-2 hidden group-hover:grid grid-cols-5 gap-1 z-10">
											{emojis.map((emoji) => (
												<button
													key={emoji}
													type="button"
													onClick={() => {
														if (isSignedIn) {
															setSelectedEmoji(
																emoji
															);
														} else {
															onAuthRequired();
														}
													}}
													className="text-lg hover:bg-gray-100 p-1 rounded">
													{emoji}
												</button>
											))}
										</div>
									</div>

									<button
										type="button"
										onClick={handleButtonClick}
										className="text-gray-400 hover:text-gray-600">
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
									</button>

									<button
										type="button"
										onClick={handleButtonClick}
										className="text-gray-400 hover:text-gray-600">
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-7-4V8a3 3 0 116 0v2M5 12a7 7 0 1114 0v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5z"
											/>
										</svg>
									</button>
								</div>

								<button
									type="submit"
									disabled={!content.trim() || isPosting}
									className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
									{isPosting ? (
										<>
											<svg
												className="w-4 h-4 animate-spin"
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
											<span>Posting...</span>
										</>
									) : (
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
										</svg>
									)}
								</button>
							</div>
						</div>

						{/* Character count */}
						<div className="flex justify-between items-center mt-2 text-xs text-gray-500">
							<span></span>
							<span>{content.length}/500</span>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PostComposer;
