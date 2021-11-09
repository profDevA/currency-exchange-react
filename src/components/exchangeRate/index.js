import { useState, useEffect } from "react";
import ExchangeRateItem from "./exchangeRateItem";
import { MdOutlineSwapVerticalCircle } from "react-icons/md";
import { findNextCode } from "../../utils";
import { getRates } from "../../api/getRates";

export default function ExchangeRate() {
  const [balance, setBalance] = useState({
    USD: 200,
    EUR: 150,
    GBP: 10,
  });
  const [state, setState] = useState({
    fromCode: "USD",
    fromAmount: 0,
    toCode: "EUR",
    toAmount: 0,
  });
  const [rates, setRates] = useState({

  })

  // Get the exchange rate on first load. Because API data is updated daily,
  // there is no need to fetch exchange rates in real time (Also free plan does not support it).
  useEffect(() => {
    getRates().then(rates => {
      // calculate rates and store
      setRates({
        USDEUR: Number(parseFloat(rates.EUR / rates.USD).toFixed(6)),
        USDGBP: Number(parseFloat(rates.GBP / rates.USD).toFixed(6)),
        EURUSD: rates.USD,
        EURGBP: rates.GBP,
        GBPUSD: Number(parseFloat(rates.USD / rates.GBP).toFixed(6)),
        GBPEUR: Number(parseFloat(rates.EUR / rates.GBP).toFixed(6)),
      })
    })
  }, []);

  const exchangeCurrency = () => {
    console.log("Exchange Function");
  };

  const handleCode = (type, code) => {
    if (type === "quote") {
      if (state.toCode === code) {
        setState({ ...state, fromCode: code, toCode: findNextCode(code) });
      } else {
        setState({ ...state, fromCode: code });
      }
    } else {
      setState({ ...state, toCode: code });
    }
  };

  const baseStr = Number(1).toLocaleString('en-US', {style: 'currency', currency: state.fromCode});
  const convertStr = Number(rates[state.fromCode + state.toCode]).toLocaleString('en-US', {style: 'currency', currency: state.toCode});

  console.log("convertStr", convertStr)

  console.log("state", state);

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
          />
          <ExchangeRateItem
            type="base"
            balance={balance}
            setState={setState}
            state={state}
            handleCode={handleCode}
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
