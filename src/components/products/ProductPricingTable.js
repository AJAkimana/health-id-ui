import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { columns } from './Templates/Table/ColumsPricing';
import {
  SEARCH_PRODUCTS,
  GET_PRODUCTS
} from './productQueries';
import { ProductsStyles } from '../../assets/styles/products/products';
import DataTableLoader from '../dataTable/dataTableLoader';
import withProductSearch from './ProductSearch';
import DataTablePricing from './Templates/Table/DataTablePricing';
import { getProductsPricing } from './PricingFilter';

export class ProductsPricing extends Component {
  state = {
    searchText: '',
    searchActive: false,
    searchResults: [],
    rowsCount: 5,
    pageNumber: 1,
    totalPages: 0,
    status: 'approved'
  }

  static getDerivedStateFromProps(props, state) {
    const { match: { params: { status } } } = props;
    if (status !== state.status) {
      return { status: status || 'approved' };
    }
    return null;
  }

  handleSearch = async ({ target: { value: searchText } }, client) => {
    if (searchText && searchText.length > 2) {
      const { data } = await client.query({
        query: SEARCH_PRODUCTS,
        variables: { searchValue: searchText }
      });
      await this.setState({ searchResults: getProductsPricing(data, 'search'), searchText, searchActive: true });
    } else if (!searchText) {
      await this.setState({ searchActive: false, searchText: '' });
    }
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsCount: event.target.value });
  }

  handleChangePage = (_, newPage) => {
    this.setState({ pageNumber: newPage + 1 });
  };

  render() {
    const {
      rowsCount,
      pageNumber,
      searchResults,
      searchActive,
      status
    } = this.state;
    return (
      <Query
        query={GET_PRODUCTS(status)}
        variables={
          {
            pageCount: rowsCount,
            pageNumber
          }
        }
      >
        {
          (
            {
              loading, data, client
            }
          ) => {
            if (loading) return <DataTableLoader />;
            let products = getProductsPricing(data, status);
            if (searchResults && searchActive) {
              products = searchResults;
            }
            const title = products ? `${products.length} Products` : '';
            return (
              <div>
                <DataTablePricing
                  title={title}
                  data={products}
                  client={client}
                  loading={loading}
                  handleSearch={this.handleSearch}
                  handleViewProposed={this.handleViewProposed}
                  handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                  status={status}
                  totalCount={data.totalProductsPagesCount * rowsCount}
                  handleRequestSort={this.handleRequestSort}
                  rowsCount={rowsCount}
                  pageNumber={pageNumber}
                  columns={columns}
                  handleChangePage={this.handleChangePage}
                  handleTextChange={this.handleTextChange}
                />
              </div>
            );
          }
        }
      </Query>
    );
  }
}

ProductsPricing.defaultProps = {
  session: { me: {} },
  history: {},
};

export default withProductSearch(withStyles(ProductsStyles)(withRouter(ProductsPricing)));
