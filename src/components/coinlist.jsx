import { Alert, Avatar, Loader, Pagination, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCoin } from "../context/coins-context";
import CoinTable from "./coin-table";

const Coinlist = () => {
	const [activePage, setPage] = useState(1);

	const {
		state: { coins },
		dispatch,
		getCoins,
	} = useCoin();

	useEffect(() => {
		getCoins(dispatch);
	}, []);

	const handlePageChange = (page) => {
		getCoins(dispatch, page);
		setPage(page);
		window.scrollTo(0, 0);
	};

	return (
		<div>
			{coins.loading && (
				<div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Loader variant="dots" />
				</div>
			)}
			{coins.error && (
				<Alert
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					}
					title="Error!"
					color="red"
					radius="xs"
				>
					Something Wrong happened, Connect to the internet and refresh the page
				</Alert>
			)}
			<div style={{ minHeight: "720px" }}>
				<CoinTable coins={coins.data} />
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: "1rem",
				}}
			>
				<Pagination
					classNames={{ active: "bg-blue-700 text-white" }}
					page={activePage}
					onChange={handlePageChange}
					total={Math.ceil(coins.totalCoins / 50)}
				/>
			</div>
		</div>
	);
};

export default Coinlist;
