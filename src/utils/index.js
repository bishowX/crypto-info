export const debounce = (cb, delay = 300) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			cb(...args);
		}, delay);
	};
};
