import { LoadingOverlay, Overlay } from "@mantine/core";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import moment from "moment";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useCoin } from "../context/coins-context";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
	plugins: {
		legend: {
			display: false,
		},
	},
	interaction: { mode: "index" },
	responsive: true,
	hitRadius: 10,
	radius: 2,
	maintainAspectRatio: false,
};

const PriceChart = ({ uuid, timePeriod }) => {
	const {
		state: { coinPriceHistory },
		dispatch,
		getCoinPriceHistory,
	} = useCoin();

	const timestamp = [];
	const price = [];

	for (let i = 0; i < coinPriceHistory.data.length; i++) {
		const activeTimestamp = coinPriceHistory.data[i].timestamp;

		timestamp.push(new Date(activeTimestamp).toLocaleString());
		price.push(coinPriceHistory.data[i].price);
	}

	const data = {
		labels: timestamp,
		datasets: [
			{
				fill: true,
				label: "Price in USD",
				data: price,
				backgroundColor: "#0bd716",
				borderColor: "rgb(75, 192, 192)",
				tension: 0.2,
			},
		],
	};

	useEffect(() => {
		if (!uuid) return;
		getCoinPriceHistory(dispatch, uuid, "24h");
	}, [uuid]);

	return (
		<div className="w-full h-[500px] relative flex justify-center items-center">
			{coinPriceHistory.loading && <LoadingOverlay visible={true} />}
			{coinPriceHistory.error && (
				<>
					<p className="text-xl z-[10999] font-medium text-red-600">Error Fetching Data</p>
					<Overlay />
				</>
			)}
			{coinPriceHistory.data.length > 0 && <Line style={{ maxHeight: "500px" }} options={options} data={data} />}
		</div>
	);
};

export default PriceChart;
