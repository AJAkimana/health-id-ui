import React from 'react';
import { ApolloConsumer } from 'react-apollo';

const withProductSearch = Component => props => (
  <ApolloConsumer>
    {(client) => {
      const mergedProps = { client, ...props };

      return (
        <Component {...mergedProps} />
      );
    }}
  </ApolloConsumer>
);

export default withProductSearch;
