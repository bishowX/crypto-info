import { Loader, Select } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, RAPIDAPI_HEADERS } from "../config/api";
import { debounce } from "../utils";
import SelectItem from "./select-item";

const Navbar = () => {
	const [loading, setLoading] = useState(false);
	const [coins, setCoins] = useState([]);

	const navigate = useNavigate();

	const searchCoin = async (query) => {
		try {
			setLoading(true);
			const response = await fetch(`${API_BASE_URL}/search-suggestions?query=${query}`, {
				headers: RAPIDAPI_HEADERS,
			});
			const result = await response.json();
			setCoins(result.data.coins);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const debounceSearch = debounce((query) => {
		searchCoin(query);
	}, 1000);

	const handleInputChange = (query) => {
		if (!query) return;
		debounceSearch(query);
	};

	const handleSearchValueChanged = (value) => {
		if (value) {
			navigate(`/coins/${value}`);
		}
	};

	return (
		<nav className="w-full flex flex-col md:flex-row gap-4 items-center justify-between py-4">
			<h1 className="text-2xl font-bold">Crypto Info</h1>
			<div className="w-full max-w-md relative z-50">
				<Select
					className="w-full"
					placeholder="Search coin name"
					data={coins.map((coin) => ({
						value: coin.uuid,
						label: coin.name,
						price: coin.price,
						iconUrl: coin.iconUrl,
					}))}
					searchable
					clearable
					onSearchChange={handleInputChange}
					itemComponent={SelectItem}
					rightSection={loading ? <Loader size="xs" /> : null}
					onChange={handleSearchValueChanged}
					filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
