import { currencyCodes } from '../../constants';
import { currencyFormat } from '../../utils';

export default function ExchangeRateItem({
  type,
  balance,
  state,
  handleCode,
  handleInput,
}) {
  const currentCode = type === 'quote' ? state.fromCode : state.toCode; // set default code
  const amount = type === 'quote' ? state.fromAmount : state.toAmount;

  return (
    <div className={`exchange-rate__${type}`}>
      <div className="balance">
        <select
          name=""
          className="currency-select"
          onChange={e => handleCode(type, e.target.value)}
          defaultValue={currentCode}
        >
          {currencyCodes.map(code => (
            <option key={code}>{code}</option>
          ))}
        </select>
        <div className="balance__amount">
          Balance:{' '}
          <span>{currencyFormat(balance[currentCode], currentCode, 2)}</span>
        </div>
      </div>
      <div className="quantity">
        <input
          type="text"
          placeholder={type === 'quote' ? '-' : '+'}
          value={amount ? amount : ''}
          onChange={e => handleInput(type, e.target.value)}
        />
      </div>
    </div>
  );
}
