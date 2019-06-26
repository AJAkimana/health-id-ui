import React, { Fragment, Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import GET_ALL_APPROVED_PRODUCTS from '../../queries/stockProducts';
import Dashboard from '../shared/Dashboard/Dashboard';
import withAuth from '../withAuth';
import DataTable from './Table/DataTable';
import ProductLoader from '../products/productLoader';
import sortAscendingIcon from '../../assets/images/stock/sort_ascending_icon.png';
import sortDescendingIcon from '../../assets/images/stock/sort_descending_icon.png';
import stockControlStyles from '../../assets/styles/stock/stock';
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
  };

  createColumns = columns => columns.map(title => ({
    id: title.replace(/ +/g, ''),
    label: title.toUpperCase()
  }));

  render() {
    const { history, session } = this.props;
    const columnHeaders = ['name', 'sku', ' measurement unit', 'quantity'];

    return (
      <Fragment>
        <Dashboard isActive="grid3" session={session} />
        <Query query={GET_ALL_APPROVED_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <ProductLoader />
              );
            }
            if (error) return `Error! ${error.message}`;

            const products = data.approvedProducts.map(product => ({
              id: product.id,
              name: product.productName,
              quantity: product.productQuantity,
              sku: product.skuNumber,
              measurementunit: product.measurementUnit.name,
              description: product.description,
              image: product.image,
              tags: product.tags
            }));

            return (
              <div name="stock_products">
                <DataTable
                  title='Products'
                  columns={this.createColumns(columnHeaders)}
                  data={products}
                  onRowClick={(rowData) => {
                    history.push(`products/${rowData}`);
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
