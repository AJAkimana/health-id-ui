import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const appLink = 'https://cors-anywhere.herokuapp.com/https://healthid-web-api.herokuapp.com/healthid/';
// console.log(appLink);


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('auth_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    }
  };
});

const httpLink = new HttpLink({
  uri: appLink,
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache()
});

export default client;
