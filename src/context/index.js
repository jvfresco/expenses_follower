import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import en from '../translations/en.json';
import es from '../translations/es.json';
import { IntlProvider } from 'react-intl';
import {AuthProvider} from './auth-context'

const AppProviders = ({ children }) => {
  //TODO ADD ERROR BOUNDARIES
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
      },
      mutations: {
        useErrorBoundary: false
      }
    },
  });

  var locale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    "en-US";
  const msg = {
    "en-US": en,
    "es-ES": es,
  };

  const message = locale === "en-US" ? en : Object.assign({}, en, msg[locale]);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <IntlProvider locale="en" messages={message}>
              {children}
              <ReactQueryDevtools initialIsOpen />
            </IntlProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default AppProviders