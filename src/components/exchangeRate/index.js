import { useState, useEffect } from 'react';
import { MdOutlineSwapVerticalCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import ExchangeRateItem from './exchangeRateItem';
import { getRates } from '../../api/getRates';
import { round, currencyFormat } from '../../utils';

export default function ExchangeRate() {
  const [balance, setBalance] = useState({
    USD: 200,
    EUR: 150,
    GBP: 10,
  });
  const [state, setState] = useState({
    fromCode: 'USD',
    fromAmount: 0,
    toCode: 'EUR',
    toAmount: 0,
  });
  const [rates, setRates] = useState({
    USDEUR: 0.8626,
    USDGBP: 0.7375,
    EURUSD: 1.1593,
    EURGBP: 0.8549,
    GBPUSD: 1.356,
    GBPEUR: 1.1697,
  });

  const { fromCode, toCode, fromAmount } = state;

  // Get the exchange rate on first load. Because API data is updated daily,
  // there is no need to fetch exchange rates in real time (Also free plan does not support it).
  useEffect(() => {
    getRates().then(rates => {
      // calculate rates and store
      setRates({
        USDEUR: round(rates.EUR / rates.USD, 4),
        USDGBP: round(rates.GBP / rates.USD, 4),
        EURUSD: round(rates.USD, 4),
        EURGBP: round(rates.GBP, 4),
        GBPUSD: round(rates.USD / rates.GBP, 4),
        GBPEUR: round(rates.EUR / rates.GBP, 4),
      });
    });
  }, []);

  // warn if fromAmount is grater than fromBalance
  useEffect(() => {
    if (state.fromAmount > balance[state.fromCode]) {
      toast.warn('Exceeds balance');
    }
  }, [state, balance]);

  useEffect(() => {
    if (fromAmount > 0) {
      setState({
        ...state,
        toAmount: round(fromAmount * rates[fromCode + toCode]),
      });
    }
  }, [fromCode, toCode, fromAmount, rates]);

  const exchangeCurrency = () => {
    const { fromCode, toCode, fromAmount, toAmount } = state;

    // Warn if currency is not selected
    if (fromCode === toCode) {
      toast.info('Select a currency to exchange');
      return;
    }

    // Warn if amount to exchange is 0
    if (!fromAmount) {
      toast.info('Input amount to exchange');
      return;
    }

    // Warn if balance is not enough
    if (fromAmount > balance[fromCode]) {
      toast.error("Can't exchange. Balance is not enough.");
      return;
    }
    // fromBalance = frombalance - fromamount
    setBalance({
      ...balance,
      [fromCode]: round(balance[fromCode] - fromAmount, 2),
      [toCode]: round(balance[toCode] + toAmount, 2),
    });

    clearExchangeAmount();

    toast.success('Successfully exchanged!');
  };

  const clearExchangeAmount = () => {
    setState({ ...state, fromAmount: 0, toAmount: 0 });
  };

  const handleCode = (type, code) => {
    if (type === 'quote') {
      setState({ ...state, fromCode: code });
    } else {
      setState({ ...state, toCode: code });
    }
  };

  const handleInput = (type, amount) => {
    const { fromCode, toCode } = state;

    if (type === 'quote') {
      setState({
        ...state,
        fromAmount: amount,
        toAmount: round(amount * rates[fromCode + toCode], 2),
      });
    } else {
      setState({
        ...state,
        fromAmount: round(amount / rates[fromCode + toCode], 2),
        toAmount: amount,
      });
    }
  };

  const baseStr = currencyFormat(1, state.fromCode, 0);

  const convertStr =
    state.fromCode === state.toCode
      ? currencyFormat(1, state.fromCode, 0)
      : currencyFormat(rates[state.fromCode + state.toCode], state.toCode, 4);

  return (
    <>
      <div className="exchange-rate">
        <div>
          <ExchangeRateItem
            type="quote"
            balance={balance}
            setState={setState}
            state={state}
            handleCode={handleCode}
            handleInput={handleInput}
          />
          <ExchangeRateItem
            type="base"
            balance={balance}
            setState={setState}
            state={state}
            handleCode={handleCode}
            handleInput={handleInput}
          />
        </div>
        <span className="rate">
          {baseStr} = <span>{!convertStr.includes('NaN') && convertStr}</span>
        </span>
        <i className="swap-icon">
          <MdOutlineSwapVerticalCircle color="green" />
        </i>
      </div>
      <div className="exchange-btn">
        <button onClick={exchangeCurrency}>Exchange</button>
      </div>
    </>
  );
}
