import { fetchCurrenciesApi, fetchExchangeRateApi } from '../services';

const actions = {
  GET_EMAIL: 'GET_EMAIL',
  REQUEST_API: 'REQUEST_API',
  CURRENCIES: 'CURRENCIES',
  FAILED_REQUEST: 'FAILED_REQUEST',
  EXCHANGE_RATES: 'EXCHANGE_RATES',
  SUM_CURRENCIES: 'SUM_CURRENCIES',
};

export const requestApi = () => ({
  type: actions.REQUEST_API,
});

export const failedRequest = (error) => ({
  type: actions.FAILED_REQUEST, payload: error,
});

export const getCurrencies = (payload) => ({
  type: actions.CURRENCIES, payload,
});

export const sumCurrencies = (payload) => ({
  type: actions.SUM_CURRENCIES, payload,
});

export const getExchangeRates = (payload) => ({
  type: actions.EXCHANGE_RATES, payload,
});

export const getEmail = (payload) => ({
  type: actions.GET_EMAIL, payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestApi());

  try {
    const currencies = await fetchCurrenciesApi();
    dispatch(getCurrencies(currencies));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export const fetchExchangeRates = (payload) => async (dispatch, getState) => {
  dispatch(requestApi());

  try {
    console.log(getState());
    const { expenses } = getState().wallet;
    const exchangeRates = await fetchExchangeRateApi();
    dispatch(getExchangeRates({ ...payload, id: expenses.length, exchangeRates }));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default actions;
