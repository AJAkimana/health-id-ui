import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { columns } from './Templates/Table/Colums';
import {
  SEARCH_PRODUCTS,
  GET_PRODUCTS
} from './productQueries';
import { ProductsStyles } from '../../assets/styles/products/products';
import DataTableLoader from '../dataTable/dataTableLoader';
import withProductSearch from './ProductSearch';
import DataTable from './Templates/Table/DataTable';
import { getProducts } from './filter';

export class Products extends Component {
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

  handleViewProposed = (status) => {
    const { history } = this.props;
    history.push(`/products/${status}`);
  }

  handleSearch = async ({ target: { value: searchText } }, client) => {
    if (searchText && searchText.length > 2) {
      const { data } = await client.query({
        query: SEARCH_PRODUCTS,
        variables: { searchValue: searchText }
      });
      await this.setState({ searchResults: getProducts(data, 'search'), searchText, searchActive: true });
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

  handleOnRowClick = (id) => {
    const { session } = this.props;
    const { name: role } = session.me.role;
    const { history, match: { params: { status: statusCheck } } } = this.props;
    if (statusCheck !== 'approved' && role === 'Master Admin') {
      history.push(`/products/${id}/approve`);
    } else {
      history.push(`/products/${id}/details`);
    }
  }

  render() {
    const {
      rowsCount,
      pageNumber,
      searchResults,
      searchActive,
      status
    } = this.state;
    const { session } = this.props;
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
            let products = getProducts(data, status);
            if (searchResults && searchActive) {
              products = searchResults;
            }
            const title = products ? `${products.length} Products ${status === 'all' || status === undefined ? '' : status}` : '';
            return (
              <div>
                <DataTable
                  title={title}
                  data={products}
                  onRowClick={this.handleOnRowClick}
                  client={client}
                  loading={loading}
                  handleSearch={this.handleSearch}
                  handleViewProposed={this.handleViewProposed}
                  currentPath={this.props.location.pathname}
                  handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                  status={status}
                  totalCount={data.totalProductsPagesCount * rowsCount}
                  handleRequestSort={this.handleRequestSort}
                  rowsCount={rowsCount}
                  pageNumber={pageNumber}
                  columns={columns}
                  handleChangePage={this.handleChangePage}
                  handleTextChange={this.handleTextChange}
                  session={session}
                />
              </div>
            );
          }
        }
      </Query>
    );
  }
}

Products.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Products.defaultProps = {
  session: { me: {} },
  history: {},
};

export default withProductSearch(withStyles(ProductsStyles)(withRouter(Products)));
