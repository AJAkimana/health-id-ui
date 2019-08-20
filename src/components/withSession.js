import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_INFO from '../queries/userDataQuery';

const withSession = Component => props => (
  <Query query={GET_USER_INFO}>
    {({ data, loading }) => {
      if (loading) return null;

      if (data && data.me.activeOutlet) {
        localStorage.setItem('outletId', data.me.activeOutlet.id);
      }

      return (
        <Component {...props} session={data} />
      );
    }}
  </Query>
);

export default withSession;
