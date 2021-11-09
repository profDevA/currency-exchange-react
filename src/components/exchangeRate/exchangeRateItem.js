import { useState } from "react";
import { currencyCodes } from "../../constants";

export default function ExchangeRateItem({ type, balance, state, setState, handleCode }) {
  const currentCode = type === "quote" ? state.fromCode : state.toCode; // set default code

  // const [currentCode, setCurrentCode] = useState(defaultCode);

  const codes =
    type === "quote"
      ? currencyCodes
      : currencyCodes.filter((code) => code !== state.fromCode);

  return (
    <div className={`exchange-rate__${type}`}>
      <div className="balance">
        <select
          name=""
          className="currency-select"
          onChange={e => handleCode(type, e.target.value)}
          defaultValue={currentCode}
        >
          {codes.map((code, index) => (
            <option key={code}>{code}</option>
          ))}
        </select>
        <div className="balance__amount">
          Balance: <span>{balance[currentCode]}</span>
        </div>
      </div>
      <div className="quantity">
        <input type="text" placeholder="-" />
      </div>
    </div>
  );
}
