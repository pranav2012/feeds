export interface FeedPost {
    id: string;
    content: string;
    emoji: string;
    author: string;
    authorAvatar: string;
    timestamp: number;
    likes: number;
    comments: number;
    shares: number;
}

const DB_NAME = 'FeedsDB';
const DB_VERSION = 1;
const STORE_NAME = 'posts';

export class FeedsDB {
    private db: IDBDatabase | null = null;

    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                reject(new Error('Failed to open database'));
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }

    async addPost(post: Omit<FeedPost, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'>): Promise<FeedPost> {
        if (!this.db) {
            await this.init();
        }

        const newPost: FeedPost = {
            ...post,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            likes: 0,
            comments: 0,
            shares: 0,
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(newPost);

            request.onsuccess = () => {
                resolve(newPost);
            };

            request.onerror = () => {
                reject(new Error('Failed to add post'));
            };
        });
    }

    async getAllPosts(): Promise<FeedPost[]> {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const index = store.index('timestamp');
            const request = index.getAll();

            request.onsuccess = () => {
                // Sort by timestamp descending (newest first)
                const posts = request.result.sort((a, b) => b.timestamp - a.timestamp);
                resolve(posts);
            };

            request.onerror = () => {
                reject(new Error('Failed to get posts'));
            };
        });
    }

    async updatePostStats(postId: string, field: 'likes' | 'comments' | 'shares'): Promise<void> {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const getRequest = store.get(postId);

            getRequest.onsuccess = () => {
                const post = getRequest.result;
                if (post) {
                    post[field] += 1;
                    const updateRequest = store.put(post);

                    updateRequest.onsuccess = () => {
                        resolve();
                    };

                    updateRequest.onerror = () => {
                        reject(new Error('Failed to update post'));
                    };
                } else {
                    reject(new Error('Post not found'));
                }
            };

            getRequest.onerror = () => {
                reject(new Error('Failed to get post'));
            };
        });
    }

    async seedInitialData(): Promise<void> {
        // No longer seeding with initial posts - feed starts empty
        await this.init();
    }
}

export const feedsDB = new FeedsDB(); 