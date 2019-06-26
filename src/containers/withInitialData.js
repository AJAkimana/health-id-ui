import React from 'react';
import { Query } from 'react-apollo';
import GET_ALL_COUNTRIES from '../queries/countryQuery';
import APPROVED_PRODUCTS_QUERY from '../queries/approvedProductQuery';
import GET_ALL_CUSTOMERS from '../queries/customersQuery';

const WithInitialData = Component => props => (
  <Query query={GET_ALL_COUNTRIES}>
    {({ loading: loadingOne, data: { countries } }) => (
      <Query query={GET_ALL_CUSTOMERS}>
        {({ loading: loadingTwo, data: { customers } }) => (
          <Query query={APPROVED_PRODUCTS_QUERY}>
            {({ loading: loadingThree, data: { approvedProducts } }) => {
              if (loadingOne || loadingTwo || loadingThree) return null;
              return (
                <Component
                  {...props}
                  countries={countries}
                  products={approvedProducts}
                  customers={customers}
                />
              );
            }}
          </Query>
        )}
      </Query>
    )}
  </Query>
);

export default WithInitialData;
