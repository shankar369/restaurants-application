import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from "./contexts/authContext"
import UtilContextProvider from './contexts/utilContext';

ReactDOM.render(
  <AuthContextProvider>
    <UtilContextProvider>
      <App />
    </UtilContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);


