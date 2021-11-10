export const round = (n, digits) => {
  return Number(parseFloat(n).toFixed(digits));
};

export const currencyFormat = (n, code, maximumFractionDigits) => {
  return Number(n).toLocaleString('en-US', {
    maximumFractionDigits,
    style: 'currency',
    currency: code,
  });
};
