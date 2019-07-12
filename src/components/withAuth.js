import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import GET_USER_INFO from '../queries/userDataQuery';

const withAuth = Component => props => (
  <Query query={GET_USER_INFO}>
    {({ data, loading, error }) => {
      if (loading) return null;
      if (error) {
        return (
          <Redirect to="/login" />
        );
      }
      if (data && data.me) {
        return (
          <Component {...props} />
        );
      }
      return null;
    }}
  </Query>
);

export default withAuth;
