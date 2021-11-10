import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExchangeRate from './components/exchangeRate';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="app__title">Currency Exchange</h1>
      <ExchangeRate />
      <ToastContainer />
    </div>
  );
}

export default App;
