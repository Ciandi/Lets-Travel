import React from 'react';
import ReactDOM from 'react-dom';
import { LoggedInUserProvider } from './contexts/LoggedInUserContext'; 
import { GlobalStyle } from './styles';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <LoggedInUserProvider> 
      <GlobalStyle />
      <App />
    </LoggedInUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
