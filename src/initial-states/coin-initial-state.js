const initialCoinState = {
	coins: {
		loading: false,
		error: null,
		data: [],
		totalCoins: 0,
	},

	coinDetail: {
		loading: false,
		error: null,
		data: null,
	},

	coinPriceHistory: {
		loading: false,
		error: null,
		data: [],
	},
};

export default initialCoinState;
