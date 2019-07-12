import React from 'react';
import { Query } from 'react-apollo';
import GET_ALL_COUNTRIES from '../queries/countryQuery';
import APPROVED_PRODUCTS_QUERY from '../queries/approvedProductQuery';
import GET_ALL_CUSTOMERS from '../queries/customersQuery';

const WithInitialData = Component => props => (
  <Query query={GET_ALL_COUNTRIES}>
    {countriesResult => (
      <Query query={GET_ALL_CUSTOMERS}>
        {customersResult => (
          <Query query={APPROVED_PRODUCTS_QUERY}>
            {(productsResult) => {
              const { loading: loadingThree, error: productsError } = productsResult;
              const { loading: loadingTwo, error: customersError } = customersResult;
              const { loading: loadingOne, error: countriesError } = countriesResult;

              if (loadingOne || loadingTwo || loadingThree) return null;
              if (productsError || customersError || countriesError) return null;

              const { data: { approvedProducts } } = productsResult;
              const { data: { customers } } = customersResult;
              const { data: { countries } } = countriesResult;
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
