import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App';
import client from './services/hasura';
import { AuthProvider } from './contexts/AuthContext';
import { FormProvider } from './contexts/FormContext';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
