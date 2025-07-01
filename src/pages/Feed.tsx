import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";
import PostComposer from "../components/PostComposer";
import FeedPost from "../components/FeedPost";
import { feedsDB, type FeedPost as FeedPostType } from "../utils/indexedDB";

const Feed = () => {
	const { isSignedIn } = useAuth();
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [posts, setPosts] = useState<FeedPostType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadPosts();
	}, []);

	const loadPosts = async () => {
		try {
			setLoading(true);
			await feedsDB.init();
			await feedsDB.seedInitialData();
			const allPosts = await feedsDB.getAllPosts();
			setPosts(allPosts);
		} catch (error) {
			console.error("Failed to load posts:", error);
		} finally {
			setLoading(false);
		}
	};

	const handlePostCreated = () => {
		loadPosts(); // Refresh posts when a new one is created
	};

	const handleInteraction = async (
		postId: string,
		action: "like" | "comment" | "share"
	) => {
		if (!isSignedIn) {
			setShowAuthModal(true);
			return;
		}

		try {
			await feedsDB.updatePostStats(
				postId,
				`${action}s` as "likes" | "comments" | "shares"
			);
			loadPosts(); // Refresh posts to show updated stats
		} catch (error) {
			console.error(`Failed to ${action} post:`, error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="max-w-2xl mx-auto px-4 py-6">
				<div className="space-y-4">
					{/* Post Composer */}
					<PostComposer
						onPostCreated={handlePostCreated}
						onAuthRequired={() => setShowAuthModal(true)}
					/>

					{/* Loading State */}
					{loading && (
						<div className="bg-white rounded-xl shadow-sm border p-8">
							<div className="flex items-center justify-center">
								<svg
									className="w-8 h-8 animate-spin text-blue-600"
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
								<span className="ml-2 text-gray-600">
									Loading posts...
								</span>
							</div>
						</div>
					)}

					{/* Feed Posts */}
					{!loading && posts.length === 0 && (
						<div className="bg-white rounded-xl shadow-sm border p-8">
							<div className="text-center text-gray-500">
								<p className="text-lg mb-2">No posts yet!</p>
								<p>
									Be the first to share something with the
									community.
								</p>
							</div>
						</div>
					)}

					{!loading &&
						posts.map((post) => (
							<FeedPost
								key={post.id}
								post={post}
								onInteraction={handleInteraction}
							/>
						))}
				</div>
			</main>

			<AuthModal
				isOpen={showAuthModal}
				onClose={() => setShowAuthModal(false)}
			/>
		</div>
	);
};

export default Feed;
