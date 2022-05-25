import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

const SelectItem = forwardRef(({ label, price, iconUrl, ...other }, ref) => (
	<div ref={ref} {...other}>
		<Group noWrap>
			<Avatar src={iconUrl} />

			<div className="flex gap-4 items-center">
				<Text size="sm">{label}</Text>
				<Text size="sm">
					<span className="text-md font-medium">$ </span>
					{price}
				</Text>
			</div>
		</Group>
	</div>
));

export default SelectItem;
