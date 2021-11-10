const baseURL = 'http://api.exchangeratesapi.io/v1/latest';
const accessKey = process.env.REACT_APP_ACCESS_KEY;

export const getRates = async () => {
  let response = await fetch(
    `${baseURL}?access_key=${accessKey}&symbols=USD,EUR,GBP`
  );

  if (response.ok) {
    let json = await response.json();
    return json.rates;
  } else {
    console.log('Error HTTP: ' + response.status);
  }
};
