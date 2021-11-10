import { currencyCodes } from "../../constants";

export default function ExchangeRateItem({
  type,
  balance,
  state,
  handleCode,
  handleInput,
}) {
  const currentCode = type === "quote" ? state.fromCode : state.toCode; // set default code
  const amount = type === 'quote' ? state.fromAmount : state.toAmount;

  console.log("amount", amount)

  return (
    <div className={`exchange-rate__${type}`}>
      <div className="balance">
        <select
          name=""
          className="currency-select"
          onChange={(e) => handleCode(type, e.target.value)}
          defaultValue={currentCode}
        >
          {currencyCodes.map((code) => (
            <option key={code}>{code}</option>
          ))}
        </select>
        <div className="balance__amount">
          Balance: <span>{balance[currentCode]}</span>
        </div>
      </div>
      <div className="quantity">
        <input type="text" placeholder={type === 'quote' ? "-" : "+"} value={amount ? amount : ''} onChange={e => handleInput(type, e.target.value)}/>
      </div>
    </div>
  );
}
