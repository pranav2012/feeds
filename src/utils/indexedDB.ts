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

export interface User {
    id: string;
    email: string;
    password: string;
    createdAt: number;
}

const DB_NAME = 'FeedsDB';
const DB_VERSION = 1;
const POSTS_STORE = 'posts';
const USERS_STORE = 'users';

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

                // Create posts store
                if (!db.objectStoreNames.contains(POSTS_STORE)) {
                    const postsStore = db.createObjectStore(POSTS_STORE, { keyPath: 'id' });
                    postsStore.createIndex('timestamp', 'timestamp', { unique: false });
                }

                // Create users store
                if (!db.objectStoreNames.contains(USERS_STORE)) {
                    const usersStore = db.createObjectStore(USERS_STORE, { keyPath: 'id' });
                    usersStore.createIndex('email', 'email', { unique: true });
                }
            };
        });
    }

    // User management methods
    async addUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
        if (!this.db) {
            await this.init();
        }

        const newUser: User = {
            ...userData,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            createdAt: Date.now(),
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([USERS_STORE], 'readwrite');
            const store = transaction.objectStore(USERS_STORE);
            const request = store.add(newUser);

            request.onsuccess = () => {
                resolve(newUser);
            };

            request.onerror = () => {
                reject(new Error('Failed to add user - email might already exist'));
            };
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([USERS_STORE], 'readonly');
            const store = transaction.objectStore(USERS_STORE);
            const index = store.index('email');
            const request = index.get(email);

            request.onsuccess = () => {
                resolve(request.result || null);
            };

            request.onerror = () => {
                reject(new Error('Failed to get user'));
            };
        });
    }

    async authenticateUser(email: string, password: string): Promise<User | null> {
        const user = await this.getUserByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async getUserById(userId: string): Promise<User | null> {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([USERS_STORE], 'readonly');
            const store = transaction.objectStore(USERS_STORE);
            const request = store.get(userId);

            request.onsuccess = () => {
                resolve(request.result || null);
            };

            request.onerror = () => {
                reject(new Error('Failed to get user'));
            };
        });
    }

    // Post management methods (existing functionality)
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
            const transaction = this.db!.transaction([POSTS_STORE], 'readwrite');
            const store = transaction.objectStore(POSTS_STORE);
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
            const transaction = this.db!.transaction([POSTS_STORE], 'readonly');
            const store = transaction.objectStore(POSTS_STORE);
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
            const transaction = this.db!.transaction([POSTS_STORE], 'readwrite');
            const store = transaction.objectStore(POSTS_STORE);
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
        await this.init();

        // Seed default users
        const defaultUsers = [
            {
                email: 'demo@example.com',
                password: 'password123'
            },
            {
                email: 'test@user.com',
                password: 'testpass'
            }
        ];

        for (const userData of defaultUsers) {
            try {
                const existingUser = await this.getUserByEmail(userData.email);
                if (!existingUser) {
                    await this.addUser(userData);
                }
            } catch (error) {
                // User might already exist, continue
                console.log(`User ${userData.email} already exists or error occurred:`, error);
            }
        }
    }
}

export const feedsDB = new FeedsDB(); 