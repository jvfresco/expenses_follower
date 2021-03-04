import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'


import en from './translations/en.json'; // translation -1
import es from './translations/es.json'; // translation -2

import { IntlProvider } from 'react-intl';

const queryClient = new QueryClient()

var locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US';
const msg = {
    'en-US': en,
    'es-ES': es
};

const message = (locale === 'en-US') ? en : Object.assign({}, en, msg[locale]);



ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <IntlProvider locale="es" messages={message}> 
          <App />
        </IntlProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
