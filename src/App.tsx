import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const LoadingSpinner = () => (
	<div className="min-h-screen bg-gray-50 flex items-center justify-center">
		<div className="text-center">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
			<p className="mt-4 text-gray-600">Loading...</p>
		</div>
	</div>
);

const AppContent = () => {
	const { loading } = useAuth();

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Navigation />
			<Routes>
				<Route path="/" element={<Navigate to="/feed" replace />} />
				<Route path="/feed" element={<Feed />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
};

function App() {
	return (
		<AuthProvider>
			<Router>
				<AppContent />
			</Router>
		</AuthProvider>
	);
}

export default App;
