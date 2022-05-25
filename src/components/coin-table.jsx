import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import CoinRow from "./coin-row";

const CoinTable = ({ coins }) => {
	const navigate = useNavigate();

	return (
		<Table verticalSpacing="lg" fontSize="lg" highlightOnHover>
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
					<th>24h %</th>
					<th>Market Cap</th>
					<th>Volume(24h)</th>
					<th>Last 7 days</th>
				</tr>
			</thead>
			<tbody>
				{coins.map((coin) => (
					<CoinRow onClick={() => navigate(`/coins/${coin.uuid}`)} key={coin.uuid} coin={coin} />
				))}
			</tbody>
		</Table>
	);
};

export default CoinTable;
