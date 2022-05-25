import {
	LOAD_COINS_LOADING,
	LOAD_COINS_SUCCESS,
	LOAD_COINS_ERROR,
	LOAD_COIN_DETAIL_LOADING,
	LOAD_COIN_DETAIL_SUCCESS,
	LOAD_COIN_DETAIL_ERROR,
	LOAD_COIN_PRICE_HISTORY_LOADING,
	LOAD_COIN_PRICE_HISTORY_SUCCESSS,
	LOAD_COIN_PRICE_HISTORY_ERROR,
} from "../action-types";
import { API_BASE_URL, RAPIDAPI_HEADERS } from "../config/api";

export const getCoins = async (dispatch, page = 1) => {
	const LIMIT = 50;

	dispatch({ type: LOAD_COINS_LOADING });

	const options = {
		headers: RAPIDAPI_HEADERS,
	};
	// offset used for pagination
	const offset = (page - 1) * LIMIT;

	try {
		const response = await fetch(`${API_BASE_URL}/coins?limit=${LIMIT}&offset=${offset}`, options);
		const result = await response.json();
		dispatch({
			type: LOAD_COINS_SUCCESS,
			payload: { coins: result.data.coins, totalCoins: result.data.stats.totalCoins },
		});
	} catch (error) {
		dispatch({ type: LOAD_COINS_ERROR, payload: error.message });
	}
};

export const getCoinDetail = async (dispatch, uuid) => {
	dispatch({ type: LOAD_COIN_DETAIL_LOADING });

	const options = {
		headers: RAPIDAPI_HEADERS,
	};

	try {
		const response = await fetch(`${API_BASE_URL}/coin/${uuid}`, options);
		const result = await response.json();
		dispatch({
			type: LOAD_COIN_DETAIL_SUCCESS,
			payload: result.data.coin,
		});
	} catch (error) {
		dispatch({ type: LOAD_COIN_DETAIL_ERROR, payload: error.message });
	}
};

export const getCoinPriceHistory = async (dispatch, uuid, timePeriod) => {
	dispatch({ type: LOAD_COIN_PRICE_HISTORY_LOADING });

	const options = {
		headers: RAPIDAPI_HEADERS,
	};

	try {
		const response = await fetch(`${API_BASE_URL}/coin/${uuid}/history?timePeriod=${timePeriod}`, options);
		const result = await response.json();
		dispatch({
			type: LOAD_COIN_PRICE_HISTORY_SUCCESSS,
			payload: result.data.history,
		});
	} catch (error) {
		dispatch({ type: LOAD_COIN_PRICE_HISTORY_ERROR, payload: error.message });
	}
};
