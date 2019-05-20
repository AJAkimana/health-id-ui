import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import GET_USER_INFO from '../queries/userDataQuery';


const withAuth = conditionFunc => Component => props => (
  <Query query={GET_USER_INFO}>
    {({ data, loading }) => {
      if (loading) return null;

      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />);
    }}
  </Query>
);

export default withAuth;
