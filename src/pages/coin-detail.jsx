import { Avatar, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { getCoinPriceHistory } from "../actions/coin-actions";
import FilterButton from "../components/filter-button";
import PriceChart from "../components/price-chart";
import { useCoin } from "../context/coins-context";

const CoinDetail = () => {
	const [activeTimePeriod, setActiveTimePeriod] = useState("24h");

	const {
		state: { coinDetail },
		dispatch,
		getCoinDetail,
	} = useCoin();

	const { uuid } = useParams();

	useEffect(() => {
		if (!uuid) return;
		getCoinDetail(dispatch, uuid);
	}, [uuid]);

	const handleTimePeriodChange = (timePeriod) => {
		setActiveTimePeriod(timePeriod);
		getCoinPriceHistory(dispatch, uuid, timePeriod);
	};
	return (
		<div>
			{coinDetail.loading && <h1>Loading</h1>}
			{coinDetail.error && <h1>Error: {coinDetail.error}</h1>}
			{!coinDetail.loading && coinDetail.data && (
				<Grid>
					<Grid.Col md={4} xs={6}>
						<div className="flex items-center gap-4 py-4">
							<Avatar src={coinDetail.data.iconUrl} />
							<Text className="text-3xl">{coinDetail.data.name}</Text>
						</div>
						<Text size="sm" className="bg-slate-500 text-white px-[4px] py-[2px] rounded w-fit">
							Rank #{coinDetail.data.rank}
						</Text>
					</Grid.Col>

					<Grid.Col md={8} xs={6} className="space-y-1">
						<Text size="lg" color="dimmed">
							{coinDetail.data.name} Price
						</Text>
						<div className="flex items-center gap-6">
							<Text className="text-3xl font-bold">${coinDetail.data.price}</Text>
							<div
								className={`px-[8px] py-[2px] rounded text-white ${
									coinDetail.data.change[0] === "-" ? "bg-red-600" : "bg-green-600"
								}`}
							>
								{coinDetail.data.change}%
							</div>
						</div>
						<Text size="lg" color="dimmed">
							{coinDetail.data.btcPrice} BTC
						</Text>
					</Grid.Col>

					<Grid.Col xs={12} md={5}>
						<div className="mt-8 w-full flex items-center gap-4 flex-wrap">
							{coinDetail.data.links.map((link) => (
								<a
									href={link.url}
									className="w-fit flex items-center gap-2 px-2 py-[2px] rounded bg-slate-200 hover:bg-slate-600 hover:text-white"
								>
									<Text size="sm">{link.name}</Text>
								</a>
							))}
						</div>
					</Grid.Col>

					<Grid.Col xs={12} md={7} className="flex justify-between lg:mt-12 flex-wrap">
						<div className="space-y-1 p-2">
							<Text size="sm" className="font-medium" color="dimmed">
								Market Cap.
							</Text>
							<Text className="font-bold" size="md">
								${coinDetail.data.marketCap}
							</Text>
						</div>
						<div className="space-y-1 p-2">
							<Text size="sm" className="font-medium" color="dimmed">
								Volume
								<span className="ml-1 rounded px-1 py-[0.5] bg-slate-200">24h</span>
							</Text>
							<Text className="font-bold text-black/80" size="md">
								${coinDetail.data["24hVolume"]}
							</Text>
							<div className="flex gap-2 items-center"></div>
						</div>
						<div className="space-y-1 p-2">
							<Text size="sm" className="font-medium" color="dimmed">
								Circulating Supply
							</Text>
							<Text className="font-bold text-black/80" size="md">
								${coinDetail.data.supply.circulating}
							</Text>
							<div className="h-8"></div>
							<div className="flex gap-8 items-center"></div>
							<div className="flex gap-8 items-center">
								<Text size="sm" className="font-medium" color="dimmed">
									Total Supply
								</Text>
								<Text className="font-medium text-black/70" size="md">
									${coinDetail.data.supply.total}
								</Text>
							</div>
						</div>
					</Grid.Col>

					<Grid.Col span={12} className="space-y-4">
						<Text className="font-semibold text-2xl">Bitcoin to USD chart</Text>
						<div className="w-full flex flex-wrap gap-4 justify-between items-center">
							<div className="flex items-center gap-4 p-1 bg-slate-300 rounded">
								<FilterButton active={true}>Price</FilterButton>
								<FilterButton>Market</FilterButton>
							</div>
							<div className="flex grow sm:grow-0 justify-between items-center gap-4 p-1 bg-slate-300 rounded">
								<FilterButton
									onClick={() => handleTimePeriodChange("24h")}
									active={activeTimePeriod === "24h"}
								>
									1D
								</FilterButton>
								<FilterButton
									onClick={() => handleTimePeriodChange("7d")}
									active={activeTimePeriod === "7d"}
								>
									7D
								</FilterButton>
								<FilterButton
									onClick={() => handleTimePeriodChange("30d")}
									active={activeTimePeriod === "30d"}
								>
									1M
								</FilterButton>
								<FilterButton
									onClick={() => handleTimePeriodChange("3m")}
									active={activeTimePeriod === "3m"}
								>
									3M
								</FilterButton>
								<FilterButton
									onClick={() => handleTimePeriodChange("1y")}
									active={activeTimePeriod === "1y"}
								>
									1Y
								</FilterButton>
								<FilterButton
									onClick={() => handleTimePeriodChange("5y")}
									active={activeTimePeriod === "5y"}
								>
									5Y
								</FilterButton>
							</div>
						</div>
						<div className="w-full max-w-7xl lg:mx-auto">
							<PriceChart uuid={uuid} timePeriod={activeTimePeriod} />
						</div>

						<Grid.Col span={12}>
							<h1 className="text-xl text-indigo-800 font-bold py-3">What is {coinDetail.data.name}</h1>
							<Text className="coin-desc">{ReactHtmlParser(coinDetail.data.description)}</Text>
						</Grid.Col>
					</Grid.Col>
				</Grid>
			)}
		</div>
	);
};

export default CoinDetail;
