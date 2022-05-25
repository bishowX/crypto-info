const FilterButton = ({ children, active, ...otherProps }) => {
	return (
		<button
			className={`border-0 outline-none px-2 py-1 ${active && "bg-white"} hover:bg-slate-200 rounded`}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default FilterButton;
