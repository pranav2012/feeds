import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useMemo,
	memo,
} from "react";
import { useAuth } from "../context/AuthContext";
import {
	EMOJI_CATEGORIES,
	COMPOSER_CONFIG,
	UI_TEXT,
	type EmojiCategoryKey,
} from "../utils/constants";

interface PostComposerProps {
	onPostCreated: () => void;
	onAuthRequired: () => void;
}

// Memoized toolbar component
const Toolbar = memo(
	({
		isSignedIn,
		onNotImplemented,
	}: {
		isSignedIn: boolean;
		onNotImplemented: () => void;
	}) => (
		<div className="flex items-center justify-between mb-4">
			<div className="bg-gray-100 rounded-lg p-2 flex items-center space-x-1">
				{/* Paragraph Dropdown */}
				<div className="relative">
					<select
						className="appearance-none bg-white border-0 rounded-md px-3 py-1.5 pr-7 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer h-8 shadow-sm"
						disabled={!isSignedIn}
						onClick={onNotImplemented}>
						<option>{UI_TEXT.DROPDOWN_OPTIONS.PARAGRAPH}</option>
						<option>{UI_TEXT.DROPDOWN_OPTIONS.HEADING_1}</option>
						<option>{UI_TEXT.DROPDOWN_OPTIONS.HEADING_2}</option>
						<option>{UI_TEXT.DROPDOWN_OPTIONS.QUOTE}</option>
					</select>
					<div className="absolute inset-y-0 right-0 flex items-center px-1.5 pointer-events-none">
						<svg
							className="w-3 h-3 text-gray-500"
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
				<div className="flex items-center ml-1">
					<button
						type="button"
						onClick={onNotImplemented}
						className="w-8 h-8 rounded-md text-sm font-bold hover:bg-white hover:shadow-sm focus:outline-none transition-all text-gray-700 flex items-center justify-center">
						B
					</button>
					<button
						type="button"
						onClick={onNotImplemented}
						className="w-8 h-8 rounded-md text-sm italic hover:bg-white hover:shadow-sm focus:outline-none transition-all text-gray-700 flex items-center justify-center">
						I
					</button>
					<button
						type="button"
						onClick={onNotImplemented}
						className="w-8 h-8 rounded-md text-sm underline hover:bg-white hover:shadow-sm focus:outline-none transition-all text-gray-700 flex items-center justify-center">
						U
					</button>
				</div>

				{/* Divider */}
				<div className="w-px h-5 bg-gray-300 mx-2"></div>

				{/* List Buttons */}
				<div className="flex items-center">
					<button
						type="button"
						onClick={onNotImplemented}
						className="w-8 h-8 rounded-md text-gray-600 hover:bg-white hover:shadow-sm focus:outline-none transition-all flex items-center justify-center">
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
						onClick={onNotImplemented}
						className="w-8 h-8 rounded-md text-gray-600 hover:bg-white hover:shadow-sm focus:outline-none transition-all flex items-center justify-center">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 9l4-4 4 4m0 6l-4 4-4-4"
							/>
						</svg>
					</button>
				</div>

				{/* Divider */}
				<div className="w-px h-5 bg-gray-300 mx-2"></div>

				{/* Quote and Counter */}
				<div className="flex items-center space-x-1">
					<button
						type="button"
						onClick={onNotImplemented}
						className="w-8 h-8 rounded-md text-gray-600 hover:bg-white hover:shadow-sm focus:outline-none transition-all flex items-center justify-center">
						<svg
							className="w-4 h-4"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
						</svg>
					</button>
					<div className="text-gray-600 px-2 py-1 rounded-md text-sm font-medium h-8 flex items-center justify-center min-w-[32px] hover:bg-white hover:shadow-sm transition-all">
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
					</div>
				</div>
			</div>

			{/* Delete Button */}
			<div className="bg-red-50 rounded-lg p-2">
				<button
					type="button"
					onClick={onNotImplemented}
					className="w-8 h-8 rounded-md text-red-500 hover:bg-red-100 hover:shadow-sm focus:outline-none transition-all flex items-center justify-center">
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
		</div>
	)
);

// Memoized emoji picker component
const EmojiPicker = memo(
	({
		showEmojiPicker,
		activeCategory,
		onCategoryChange,
		onEmojiSelect,
	}: {
		showEmojiPicker: boolean;
		activeCategory: EmojiCategoryKey;
		onCategoryChange: (category: EmojiCategoryKey) => void;
		onEmojiSelect: (emoji: string) => void;
	}) => {
		const categoryEntries = useMemo(
			() => Object.entries(EMOJI_CATEGORIES),
			[]
		);
		const currentEmojis = useMemo(
			() => EMOJI_CATEGORIES[activeCategory].emojis,
			[activeCategory]
		);

		if (!showEmojiPicker) return null;

		return (
			<div className="absolute top-10 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-80 max-h-96 overflow-hidden">
				{/* Category Tabs */}
				<div className="flex border-b border-gray-200 bg-gray-50">
					{categoryEntries.map(([key, category]) => (
						<button
							key={key}
							type="button"
							onClick={() =>
								onCategoryChange(key as EmojiCategoryKey)
							}
							className={`flex-1 px-2 py-2 text-xs font-medium transition-colors focus:outline-none ${
								activeCategory === key
									? "text-blue-600 border-b-2 border-blue-600 bg-white"
									: "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
							}`}
							title={category.name}>
							{category.emojis[0]}
						</button>
					))}
				</div>

				{/* Emoji Grid */}
				<div className="p-3 max-h-64 overflow-y-auto">
					<div className="grid grid-cols-8 gap-1">
						{currentEmojis.map((emoji, index) => (
							<button
								key={index}
								type="button"
								onClick={() => onEmojiSelect(emoji)}
								className="text-lg p-1.5 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
								title={emoji}>
								{emoji}
							</button>
						))}
					</div>
				</div>
			</div>
		);
	}
);

// Memoized action bar component
const ActionBar = memo(
	({
		onNotImplemented,
		onSendClick,
		isPosting,
		hasContent,
	}: {
		onNotImplemented: () => void;
		onSendClick: () => void;
		isPosting: boolean;
		hasContent: boolean;
	}) => (
		<div className="flex items-center justify-between pt-2 border-t border-gray-200">
			<div className="flex items-center space-x-1">
				<button
					type="button"
					onClick={onNotImplemented}
					className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors">
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
					onClick={onNotImplemented}
					className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors">
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
					onClick={onNotImplemented}
					className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors">
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
				onClick={onSendClick}
				disabled={!hasContent || isPosting}
				className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
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
	)
);

const PostComposer: React.FC<PostComposerProps> = memo(
	({ onPostCreated, onAuthRequired }) => {
		const [content, setContent] = useState("");
		const [isPosting, setIsPosting] = useState(false);
		const [selectedEmoji, setSelectedEmoji] = useState<string>(
			COMPOSER_CONFIG.DEFAULT_EMOJI
		);
		const [showEmojiPicker, setShowEmojiPicker] = useState(false);
		const [activeCategory, setActiveCategory] =
			useState<EmojiCategoryKey>("smileys");
		const { isSignedIn, user } = useAuth();
		const emojiPickerRef = useRef<HTMLDivElement>(null);

		// Memoize computed values
		const hasContent = useMemo(() => content.trim().length > 0, [content]);

		// Memoize event handlers to prevent unnecessary re-renders
		const handleNotImplemented = useCallback(() => {
			alert(UI_TEXT.COMPOSER.NOT_IMPLEMENTED_MESSAGE);
		}, []);

		const handleSubmit = useCallback(
			async (e?: React.FormEvent) => {
				if (e) e.preventDefault();
				if (!hasContent || !isSignedIn || !user) return;

				setIsPosting(true);
				try {
					// Import the database utility
					const { feedsDB } = await import("../utils/indexedDB");

					await feedsDB.addPost({
						content: content.trim(),
						emoji: selectedEmoji,
						author: user.email,
						authorAvatar: COMPOSER_CONFIG.DEFAULT_AVATAR_URL,
					});

					setContent("");
					onPostCreated();
					console.log("Post created successfully!");
				} catch (error) {
					console.error("Failed to create post:", error);
				} finally {
					setIsPosting(false);
				}
			},
			[
				hasContent,
				isSignedIn,
				user,
				content,
				selectedEmoji,
				onPostCreated,
			]
		);

		const handleSendClick = useCallback(() => {
			if (!isSignedIn) {
				onAuthRequired();
				return;
			}
			handleSubmit();
		}, [isSignedIn, onAuthRequired, handleSubmit]);

		const handleTextareaClick = useCallback(() => {
			if (!isSignedIn) {
				onAuthRequired();
			}
		}, [isSignedIn, onAuthRequired]);

		const handleEmojiClick = useCallback(() => {
			if (!isSignedIn) {
				onAuthRequired();
				return;
			}
			setShowEmojiPicker(!showEmojiPicker);
		}, [isSignedIn, onAuthRequired, showEmojiPicker]);

		const handleEmojiSelect = useCallback((emoji: string) => {
			setSelectedEmoji(emoji);
			setShowEmojiPicker(false);
		}, []);

		const handleCategoryChange = useCallback(
			(category: EmojiCategoryKey) => {
				setActiveCategory(category);
			},
			[]
		);

		const handleContentChange = useCallback(
			(e: React.ChangeEvent<HTMLTextAreaElement>) => {
				setContent(e.target.value);
			},
			[]
		);

		// Close emoji picker when clicking outside
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					emojiPickerRef.current &&
					!emojiPickerRef.current.contains(event.target as Node)
				) {
					setShowEmojiPicker(false);
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, []);

		return (
			<div className="bg-white rounded-2xl shadow-sm border-4 border-gray-100 p-4 max-w-2xl mx-auto">
				{/* Top Toolbar */}
				<Toolbar
					isSignedIn={isSignedIn}
					onNotImplemented={handleNotImplemented}
				/>

				{/* Message Input Area */}
				<div className="mb-4">
					<div className="flex items-start space-x-3">
						<div
							className="flex-shrink-0 relative"
							ref={emojiPickerRef}>
							<button
								type="button"
								onClick={handleEmojiClick}
								className="text-xl leading-6 hover:bg-gray-100 rounded-lg p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
								disabled={!isSignedIn}>
								{selectedEmoji}
							</button>

							{/* Emoji Picker Dropdown */}
							<EmojiPicker
								showEmojiPicker={showEmojiPicker}
								activeCategory={activeCategory}
								onCategoryChange={handleCategoryChange}
								onEmojiSelect={handleEmojiSelect}
							/>
						</div>
						<div className="flex-1">
							<textarea
								value={content}
								onChange={handleContentChange}
								onClick={handleTextareaClick}
								placeholder={UI_TEXT.COMPOSER.PLACEHOLDER}
								className="w-full min-h-[100px] p-0 border-none resize-none outline-none text-gray-800 placeholder-gray-400 bg-transparent text-base leading-6"
								maxLength={COMPOSER_CONFIG.MAX_CONTENT_LENGTH}
								readOnly={!isSignedIn}
								style={{ fontSize: "16px", lineHeight: "24px" }}
							/>
						</div>
					</div>
				</div>

				{/* Action Bar */}
				<ActionBar
					onNotImplemented={handleNotImplemented}
					onSendClick={handleSendClick}
					isPosting={isPosting}
					hasContent={hasContent}
				/>
			</div>
		);
	}
);

// Set display names for better debugging
Toolbar.displayName = "Toolbar";
EmojiPicker.displayName = "EmojiPicker";
ActionBar.displayName = "ActionBar";
PostComposer.displayName = "PostComposer";

export default PostComposer;
