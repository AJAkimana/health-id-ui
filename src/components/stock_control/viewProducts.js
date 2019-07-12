import React, { Fragment, Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { GET_ALL_APPROVED_PRODUCTS } from '../../queries/stockProducts';
import Dashboard from '../shared/Dashboard/Dashboard';
import withAuth from '../withAuth';
import DataTable from './Table/DataTable';
import DataTableLoader from '../dataTable/dataTableLoader';
import '../../assets/styles/stock/stock_products.scss';

export class ViewProducts extends Component {
  renderSortIcon = (sortType) => {
    if (sortType === 'asc') {
      return (
        <img
          className="sort_icons"
          src={sortAscendingIcon}
          alt="sort"
          style={stockControlStyles.sortImage}
        />
      );
    }
    if (sortType === 'desc') {
      return (
        <img
          className="sort_icons"
          src={sortDescendingIcon}
          alt="sort"
          style={stockControlStyles.sortImage}
        />
      );
    }
    return null;
  };

  createColumns = columns => columns.map(title => ({
    id: title.replace(/ +/g, ''),
    label: title.toUpperCase()
  }));

  render() {
    const { history, session } = this.props;
    const columnHeaders = ['name', 'sku', ' measurement unit', 'quantity'];
    const products = [];

    return (
      <Fragment>
        <Dashboard isActive="grid3" session={session} />
        <Query query={GET_ALL_APPROVED_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <DataTableLoader />
              );
            }
            if (error) return `Error! ${error.message}`;

            data.approvedProducts.forEach((product) => {
              if (product.batchInfo.length >= 1) {
                products.push({
                  id: product.id,
                  name: product.productName,
                  quantity: product.productQuantity,
                  sku: product.skuNumber,
                  measurementunit: product.measurementUnit.name,
                  description: product.description,
                  image: product.image,
                  tags: product.tags,
                  batchId: product.batchInfo
                });
              }
              return products;
            });
            const isAuthorised = session.me.role.name.match(/^(Master Admin|Operations Admin)$/);

            return (
              <div name="stock_products">
                <DataTable
                  title="Products"
                  isAdmin={Boolean(isAuthorised)}
                  columns={this.createColumns(columnHeaders)}
                  data={products}
                  onRowClick={(rowId) => {
                    history.push(`products/${rowId}/details`);
                  }}
                />
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

ViewProducts.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
};

ViewProducts.defaultProps = {
  session: {},
  history: {}
};

export default withAuth(withRouter(ViewProducts));
