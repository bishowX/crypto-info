import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import { CoinProvider } from "./context/coins-context";
import CoinDetail from "./pages/coin-detail";
import Home from "./pages/home";

const App = () => {
	return (
		<div className="container mx-auto px-4 lg:px-8">
			<Navbar />
			<CoinProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/coins/:uuid" element={<CoinDetail />} />
				</Routes>
			</CoinProvider>
		</div>
	);
};

export default App;
