import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AfterSelectToolBar from './afterSelectToolBar';
import ToolBar from './toolBar';
import { GET_APPROVED_PRODUCTS, GET_PROPOSED_PRODUCTS } from './productQueries';
import { ProductsStyles } from '../../assets/styles/products/products';
import DataTableLoader from '../dataTable/dataTableLoader';
import withAuth from '../withAuth';
import Dashboard from '../shared/Dashboard/Dashboard';
import DataTable from '../dataTable/dataTable';

export class Products extends Component {
  state = {
    approvedProducts: [],
    proposedProducts: [],
    isLoading: true,
    error: false,
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { getApprovedProducts, getProposedProducts } = nextProps;
    const {
      approvedProducts: prevApprovedProducts,
      proposedProducts: prevProposedProducts
    } = prevState;

    const {
      approvedProducts,
      loading: loadingApprovedProducts,
      error: approvedProductsError,
      refetch: refetchApproved
    } = getApprovedProducts;

    const {
      proposedProducts,
      loading: loadingProposedProducts,
      error: proposedProductsError,
      refetch: refetchProposed
    } = getProposedProducts;

    if (approvedProductsError || proposedProductsError) {
      return { approvedProductsError, proposedProductsError, error: true };
    }

    const isLoading = loadingApprovedProducts || loadingProposedProducts;

    if (!isLoading
      && (prevApprovedProducts.length !== approvedProducts.length
      || prevProposedProducts.length !== proposedProducts.length)
    ) {
      refetchApproved();
      refetchProposed();
      return { approvedProducts, proposedProducts, isLoading };
    }
    return null;
  }

  handleViewProposed = (viewStatus) => {
    const { history } = this.props;

    const status = (viewStatus.approved && '/approved') || (viewStatus.proposed && '/proposed') || '';
    const statusRoute = (viewStatus.approved && viewStatus.proposed) ? '/all' : status;

    history.push(`/products${statusRoute}`);
  }

  render() {
    const {
      approvedProducts, proposedProducts, isLoading, error
    } = this.state;

    let { match: { params: { status } } } = this.props;

    if (error) {
      return <div>Something went wrong, try refreshing the page</div>;
    }

    let products;
    switch (status) {
    case 'approved':
      products = approvedProducts;
      break;

    case 'proposed':
      products = proposedProducts;
      break;

    case 'all':
      products = [...approvedProducts, ...proposedProducts];
      break;

    case undefined:
      products = [];
      break;

    default:
      products = approvedProducts;
      status = 'Approved';
      break;
    }

    const title = `${products.length} Products ${status === 'all' || status === undefined ? '' : status}`;

    const columns = [
      {
        name: 'id',
        label: 'Product Id',
        options: {
          filter: false,
          sort: true,
          display: false,
        }
      },
      {
        name: 'productName',
        label: 'Product Name',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'skuNumber',
        label: 'SKU',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'measurementUnit',
        label: 'Measurement Unit',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'productQuantity',
        label: 'Quantity',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'category',
        label: 'Category',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'description',
        label: 'Description',
        options: {
          filter: true,
          sort: true,
          display: false,
        }
      },
      {
        name: 'brand',
        label: 'Brand',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'manufacturer',
        label: 'Manufacturer',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'salesPrice',
        label: 'Sales Price',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'loyaltyWeight',
        label: 'Loyalty Weight',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'preferredSupplier',
        label: 'Preferred Supplier',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'backupSupplier',
        label: 'Backup Supplier',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'nearestExpiryDate',
        label: 'Nearest Expiry Date',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'vatStatus',
        label: 'VAT status',
        options: {
          filter: true,
          sort: true,
        }
      },
    ];

    const productsList = products.map((product) => {
      const {
        productName, productCategory, measurementUnit, skuNumber,
        description, brand, manufacturer, vatStatus, salesPrice, nearestExpiryDate,
        preferredSupplier, backupSupplier, id, productQuantity, loyaltyWeight,
      } = product;

      return (
        {
          id,
          productName,
          category: productCategory.name,
          measurementUnit: measurementUnit.name,
          skuNumber,
          description,
          brand,
          manufacturer,
          vatStatus,
          salesPrice,
          nearestExpiryDate,
          preferredSupplier: preferredSupplier.name,
          backupSupplier: backupSupplier.name,
          productQuantity,
          loyaltyWeight,
        }
      );
    });
    const { session } = this.props;
    const { name: role } = session.me.role;
    const options = {
      responsive: 'scroll',
      elevation: 0,
      print: false,
      download: false,
      filter: false,
      viewColumns: true,
      rowHover: false,
      selectableRows: 'multiple',
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <AfterSelectToolBar
          selectedRows={selectedRows}
          displayData={displayData}
          setSelectedRows={setSelectedRows}
        />
      ),
      onRowClick: (rowData) => {
        const { history, match: { params: { status: statusCheck } } } = this.props;
        if (statusCheck !== 'approved' && role === 'Master Admin') {
          return history.push(`/products/${rowData[0]}/approve`);
        }
        return history.push(`/products/${rowData[0]}/details`);
      },
      customToolbar: () => {
        const { match: { params: { status: statusCheck } } } = this.props;
        return (
          <ToolBar
            handleViewProposed={this.handleViewProposed}
            status={statusCheck}
          />
        );
      },
    };
    return (
      <div style={ProductsStyles.div}>
        <Dashboard isActive="grid3" session={session} />
        {
          isLoading ? <DataTableLoader /> : (
            <DataTable
              title={title}
              data={productsList}
              columns={columns}
              options={options}
            />
          )
        }
      </div>

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
  history: {}
};

const APPROVED_PRODUCTS = graphql(GET_APPROVED_PRODUCTS, { name: 'getApprovedProducts' });
const PROPOSED_PRODUCTS = graphql(GET_PROPOSED_PRODUCTS, { name: 'getProposedProducts' });

export default compose(
  APPROVED_PRODUCTS,
  PROPOSED_PRODUCTS,
)(withAuth(withStyles(ProductsStyles)(withRouter(Products))));
