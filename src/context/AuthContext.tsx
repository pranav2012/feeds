import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
	isSignedIn: boolean;
	signIn: () => void;
	signOut: () => void;
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

	const signIn = () => {
		setIsSignedIn(true);
	};

	const signOut = () => {
		setIsSignedIn(false);
	};

	return (
		<AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};
