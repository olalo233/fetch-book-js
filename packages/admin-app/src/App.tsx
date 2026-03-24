import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NovelList from "./pages/NovelList";

export default function App() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/novels" element={<NovelList />} />
				<Route path="/" element={<NovelList />} />
			</Routes>
		</div>
	);
}
