import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

// Apollo-client manual setup
const appLink = 'https://healthid-web-api.herokuapp.com/healthid/';
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL, error]: message: ${message}, 
                location: ${locations}, path: ${path}`));

        if (networkError) {
          console.log(`[Network Error]: ${networkError}`);
        }
      }
    }),

    new HttpLink({
      uri: appLink,
    }),
  ]),

  cache: new InMemoryCache(),
});

export default client;
