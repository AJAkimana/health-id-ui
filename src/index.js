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
import StateProvider from './providers/stateProvider';
import mainReducer from './providers/mainReducer';
import initialState from './providers/initialState';

config();
const AppwithSession = withSession(App);
// Link apollo client to react
ReactDOM.render(
  <MuiThemeProvider theme={AppTheme}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <StateProvider initialState={initialState} reducer={mainReducer}>
          <AppwithSession />
        </StateProvider>
      </ApolloProvider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);
