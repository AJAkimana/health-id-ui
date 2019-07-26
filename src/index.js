import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { config } from 'dotenv';

import AppTheme from './assets/styles/index';
import './assets/styles/style.css';
import client from './graphql/client';
import App from './components/App';
import withSession from './components/withSession';

config();
const AppwithSession = withSession(App);
// Link apollo client to react
ReactDOM.render(
  <MuiThemeProvider theme={AppTheme}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AppwithSession />
      </ApolloProvider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);
