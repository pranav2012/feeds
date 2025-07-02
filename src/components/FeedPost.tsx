import React, { useMemo, useCallback } from "react";
import { type FeedPost as FeedPostType } from "../utils/indexedDB";
import { HeartIcon, CommentIcon, ShareIcon } from "./shared/Icons";
import ActionButton from "./shared/ActionButton";
import { formatTimeAgo } from "../utils/timeUtils";

interface FeedPostProps {
	post: FeedPostType;
	onInteraction: (
		postId: string,
		action: "like" | "comment" | "share"
	) => void;
}

const FeedPost = React.memo<FeedPostProps>(({ post, onInteraction }) => {
	// Memoize time calculation to prevent recalculation on every render
	const timeAgo = useMemo(
		() => formatTimeAgo(post.timestamp),
		[post.timestamp]
	);

	// Memoize interaction handlers to prevent unnecessary re-renders of child components
	const handleLike = useCallback(() => {
		onInteraction(post.id, "like");
	}, [post.id, onInteraction]);

	const handleComment = useCallback(() => {
		onInteraction(post.id, "comment");
	}, [post.id, onInteraction]);

	const handleShare = useCallback(() => {
		onInteraction(post.id, "share");
	}, [post.id, onInteraction]);

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
								{timeAgo}
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
				<ActionButton
					icon={<HeartIcon />}
					count={post.likes}
					hoverColor="hover:text-red-500"
					onClick={handleLike}
				/>
				<ActionButton
					icon={<CommentIcon />}
					count={post.comments}
					hoverColor="hover:text-blue-500"
					onClick={handleComment}
				/>
				<ActionButton
					icon={<ShareIcon />}
					count={post.shares}
					hoverColor="hover:text-green-500"
					onClick={handleShare}
				/>
			</div>
		</div>
	);
});

// Add display name for better debugging
FeedPost.displayName = "FeedPost";

export default FeedPost;
