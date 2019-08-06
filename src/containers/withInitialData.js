import React from 'react';
import { Query } from 'react-apollo';
import GET_COUNTRIES_PRODUCTS_CUSTOMERS from '../queries/countryProductsCustomerQuery';
import DataTableLoader from '../components/dataTable/dataTableLoader';

const WithInitialData = Component => props => (
  <Query
    query={GET_COUNTRIES_PRODUCTS_CUSTOMERS}
  >
    {({
      loading, data, error
    }) => {
      if (loading) return <DataTableLoader />;
      if (error) return null;

      const { approvedProducts } = data;
      const { customers } = data;
      const { countries } = data;

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
);

export default WithInitialData;
