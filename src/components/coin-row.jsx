import { Avatar } from "@mantine/core";

const CoinRow = ({ coin, ...otherProps }) => {
	return (
		<tr {...otherProps} className="cursor-pointer">
			<td>
				<div style={{ height: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
					<Avatar src={coin.iconUrl} alt={`${coin.name} logo`} />
					<span>{coin.name}</span>
				</div>
			</td>
			<td>${coin.price}</td>
			<td>{coin.change}%</td>
			<td>{coin.marketCap}</td>
			<td>
				<span>${coin["24hVolume"]}</span>
			</td>

			<td>line graph</td>
		</tr>
	);
};

export default CoinRow;
