import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/css/style.css';
import './assets/scss/index.scss';
import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';

// Link apollo client to react
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

