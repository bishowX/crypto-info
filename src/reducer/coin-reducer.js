import {
	LOAD_COINS_ERROR,
	LOAD_COINS_LOADING,
	LOAD_COINS_SUCCESS,
	LOAD_COIN_DETAIL_ERROR,
	LOAD_COIN_DETAIL_LOADING,
	LOAD_COIN_DETAIL_SUCCESS,
	LOAD_COIN_PRICE_HISTORY_ERROR,
	LOAD_COIN_PRICE_HISTORY_LOADING,
	LOAD_COIN_PRICE_HISTORY_SUCCESSS,
} from "../action-types";

const coinReducer = (state, action) => {
	switch (action.type) {
		case LOAD_COINS_LOADING:
			return {
				...state,
				coins: {
					...state.coins,
					loading: true,
					error: null,
				},
			};

		case LOAD_COINS_SUCCESS:
			return {
				...state,
				coins: {
					...state.coins,
					loading: false,
					data: action.payload.coins,
					totalCoins: action.payload.totalCoins,
					error: null,
				},
			};

		case LOAD_COINS_ERROR:
			return {
				...state,
				coins: {
					...state.coins,
					loading: false,
					error: action.payload,
				},
			};

		case LOAD_COIN_DETAIL_LOADING:
			return {
				...state,
				coinDetail: { ...state.coinDetail, loading: true, error: null },
			};

		case LOAD_COIN_DETAIL_SUCCESS:
			return {
				...state,
				coinDetail: { ...state.coinDetail, loading: false, data: action.payload, error: null },
			};

		case LOAD_COIN_DETAIL_ERROR:
			return {
				...state,
				coinDetail: { ...state.coinDetail, loading: false, data: null, error: action.payload },
			};

		case LOAD_COIN_PRICE_HISTORY_LOADING:
			return { ...state, coinPriceHistory: { ...state.coinPriceHistory, loading: true, error: null } };

		case LOAD_COIN_PRICE_HISTORY_SUCCESSS:
			return {
				...state,
				coinPriceHistory: { ...state.coinPriceHistory, loading: false, data: action.payload, error: null },
			};

		case LOAD_COIN_PRICE_HISTORY_ERROR:
			return {
				...state,
				coinPriceHistory: { ...state.coinPriceHistory, loading: false, data: [], error: action.payload },
			};

		default:
			return state;
	}
};

export default coinReducer;
