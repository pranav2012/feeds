import React from "react";
import { type FeedPost as FeedPostType } from "../utils/indexedDB";

interface FeedPostProps {
	post: FeedPostType;
	onInteraction: (
		postId: string,
		action: "like" | "comment" | "share"
	) => void;
}

const FeedPost: React.FC<FeedPostProps> = ({ post, onInteraction }) => {
	const formatTimeAgo = (timestamp: number) => {
		const now = Date.now();
		const diff = now - timestamp;
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (days > 0) {
			return `${days} day${days > 1 ? "s" : ""} ago`;
		} else if (hours > 0) {
			return `${hours} hour${hours > 1 ? "s" : ""} ago`;
		} else if (minutes > 0) {
			return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
		} else {
			return "Just now";
		}
	};

	return (
		<div className="bg-gray-100 rounded-2xl p-2 mb-4">
			{/* White inner container for post content */}
			<div className="bg-white rounded-2xl p-6 mb-4">
				<div className="flex items-start space-x-3 mb-4">
					<img
						src={post.authorAvatar}
						alt={post.author}
						className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
					/>
					<div className="flex-1 min-w-0">
						<div className="flex items-center space-x-2">
							<h3 className="font-semibold text-gray-900 text-base">
								{post.author}
							</h3>
							<span className="text-sm text-gray-500">
								{formatTimeAgo(post.timestamp)}
							</span>
						</div>
					</div>
				</div>

				<div className="flex items-start space-x-3">
					<span className="text-2xl flex-shrink-0">{post.emoji}</span>
					<p className="text-gray-800 leading-relaxed text-base flex-1">
						{post.content}
					</p>
				</div>
			</div>

			{/* Action buttons in gray container */}
			<div className="flex items-center space-x-1 px-2">
				<button
					className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200 p-2 rounded-lg hover:bg-white"
					onClick={() => onInteraction(post.id, "like")}>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
					{post.likes > 0 && (
						<span className="text-sm font-medium">
							{post.likes}
						</span>
					)}
				</button>

				<button
					className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 p-2 rounded-lg hover:bg-white"
					onClick={() => onInteraction(post.id, "comment")}>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					</svg>
					{post.comments > 0 && (
						<span className="text-sm font-medium">
							{post.comments}
						</span>
					)}
				</button>

				<button
					className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors duration-200 p-2 rounded-lg hover:bg-white"
					onClick={() => onInteraction(post.id, "share")}>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
						/>
					</svg>
					{post.shares > 0 && (
						<span className="text-sm font-medium">
							{post.shares}
						</span>
					)}
				</button>
			</div>
		</div>
	);
};

export default FeedPost;
