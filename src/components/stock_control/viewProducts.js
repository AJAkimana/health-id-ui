import React, { Fragment, Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { GET_ALL_APPROVED_PRODUCTS } from '../../queries/stockProducts';
import withAuth from '../withAuth';
import DataTable from './Table/DataTable';
import DataTableLoader from '../dataTable/dataTableLoader';
import '../../assets/styles/stock/stock_products.scss';

import { StateContext } from '../../providers/stateProvider';

export class ViewProducts extends Component {
  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
  }

  createColumns = columns => columns.map(title => ({
    id: title.replace(/ +/g, ''),
    label: title.toUpperCase()
  }));

  static contextType = StateContext;

  render() {
    const { history, session } = this.props;
    const columnHeaders = ['name', 'sku', ' measurement unit', 'quantity'];

    return (
      <Fragment>
        <Query query={GET_ALL_APPROVED_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <DataTableLoader />
              );
            }
            if (error) return `Error! ${error.message}`;

            const products = data.approvedProducts.map((product) => {
              if (product.batchInfo.length >= 1) {
                return {
                  id: product.id,
                  name: product.productName,
                  quantity: product.productQuantity,
                  sku: product.skuNumber,
                  measurementunit: product.measurementUnit.name,
                  description: product.description,
                  image: product.image,
                  tags: product.tags,
                  batchId: product.batchInfo
                };
              }
              return false;
            }).filter(product => product !== false);

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
