import React from 'react';
import { Query } from 'react-apollo';
import GET_ALL_CURRENCIES from '../../queries/getCurrencies';
import GET_ALL_TIMEZONES from '../../queries/getTimezones';

const ComposeInitial = Component => (
  <Query query={GET_ALL_TIMEZONES}>
    {
      ({ data: { timezones } }) => (
        <Query query={GET_ALL_CURRENCIES}>
          {({ data: { currencies } }) => (
            <Component
              currencies={currencies}
              timezones={timezones}
            />
          )}
        </Query>
      )
    }
  </Query>
);


export default ComposeInitial;
