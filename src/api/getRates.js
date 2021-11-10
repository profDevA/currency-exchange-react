const baseURL = 'https://v6.exchangerate-api.com/v6/';
const accessKey = process.env.REACT_APP_ACCESS_KEY;

export const getRates = async () => {
  let response = await fetch(`${baseURL}${accessKey}/latest/EUR`);

  if (response.ok) {
    let json = await response.json();
    const rates = {
      EUR: json.conversion_rates.EUR,
      USD: json.conversion_rates.USD,
      GBP: json.conversion_rates.GBP,
    };
    return rates;
  } else {
    console.log('Error HTTP: ' + response.status);
  }
};
