export const findNextCode = (code) => {
  switch (code) {
    case "USD":
      return "EUR";
    case "EUR":
      return "GBP";
    case "GBP":
      return "USD";
    default:
      break;
  }
};