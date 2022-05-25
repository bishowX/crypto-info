import { createContext, useContext, useReducer } from "react";
import initialCoinState from "../initial-states/coin-initial-state";
import coinReducer from "../reducer/coin-reducer";
import { getCoins, getCoinDetail, getCoinPriceHistory } from "../actions/coin-actions";

const CoinContext = createContext();

export const useCoin = () => useContext(CoinContext);

export const CoinProvider = ({ children }) => {
	const [state, dispatch] = useReducer(coinReducer, initialCoinState);
	const value = { state, dispatch, getCoins, getCoinDetail, getCoinPriceHistory };
	return <CoinContext.Provider value={value}>{children}</CoinContext.Provider>;
};
