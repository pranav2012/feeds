import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { feedsDB, type User } from "../utils/indexedDB";
import {
	setAuthCookie,
	getAuthCookie,
	clearAuthCookie,
} from "../utils/cookies";

interface AuthContextType {
	isSignedIn: boolean;
	user: User | null;
	signIn: (email: string, password: string) => Promise<boolean>;
	signUp: (userData: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
	}) => Promise<boolean>;
	signOut: () => Promise<void>;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Initialize auth state on app load
	useEffect(() => {
		const initializeAuth = async () => {
			try {
				// Initialize database and seed default users
				await feedsDB.seedInitialData();

				// Check for existing auth state in cookies
				const savedUserId = getAuthCookie();
				if (savedUserId) {
					const savedUser = await feedsDB.getUserById(savedUserId);
					if (savedUser) {
						setUser(savedUser);
						setIsSignedIn(true);
					} else {
						// User not found, clear invalid cookie
						clearAuthCookie();
					}
				}
			} catch (error) {
				console.error("Failed to initialize auth:", error);
			} finally {
				setLoading(false);
			}
		};

		initializeAuth();
	}, []);

	const signIn = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const authenticatedUser = await feedsDB.authenticateUser(
				email,
				password
			);
			if (authenticatedUser) {
				setUser(authenticatedUser);
				setIsSignedIn(true);
				setAuthCookie(authenticatedUser.id);
				return true;
			}
			return false;
		} catch (error) {
			console.error("Sign in failed:", error);
			return false;
		}
	};

	const signUp = async (userData: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
	}): Promise<boolean> => {
		try {
			const newUser = await feedsDB.addUser(userData);
			setUser(newUser);
			setIsSignedIn(true);
			setAuthCookie(newUser.id);
			return true;
		} catch (error) {
			console.error("Sign up failed:", error);
			return false;
		}
	};

	const signOut = async (): Promise<void> => {
		try {
			clearAuthCookie();
			setUser(null);
			setIsSignedIn(false);
		} catch (error) {
			console.error("Sign out failed:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ isSignedIn, user, signIn, signUp, signOut, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
