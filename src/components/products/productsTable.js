import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
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
    isApproved: true,
    isLoading: true,
  }

  componentWillReceiveProps(nextProps) {
    this.fetchProducts(nextProps);
  }

  fetchProducts = ({ getApprovedProducts, getProposedProducts }) => {
    let { approvedProducts } = getApprovedProducts;
    const { loading: loadingApproved } = getApprovedProducts;

    let { proposedProducts } = getProposedProducts;
    const { loading: loadingProposed } = getProposedProducts;

    if (loadingApproved || loadingProposed) {
      return this.setState({ isLoading: true });
    }

    if (approvedProducts === null) {
      approvedProducts = [];
    }
    if (proposedProducts === null) {
      proposedProducts = [];
    }
    return this.setState({ approvedProducts, proposedProducts, isLoading: false });
  }

  handleViewProposed = () => {
    const { isApproved } = this.state;
    this.setState({ isApproved: !isApproved });
  }

  render() {
    const {
      approvedProducts, proposedProducts, isApproved, isLoading
    } = this.state;
    let products;
    isApproved && (products = approvedProducts);
    !isApproved && (products = proposedProducts);
    const title = `${products.length} Products ${isApproved ? 'Approved' : 'Proposed'}`;

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
        name: 'packSize',
        label: 'Pack Size',
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
        name: 'preferedSupplier',
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
        productName, productCategory, measurementUnit, packSize, skuNumber,
        description, brand, manufacturer, vatStatus, salesPrice, nearestExpiryDate,
        preferredSupplier, backupSupplier, id, productQuantity, loyaltyWeight,
      } = product;

      return (
        {
          id,
          productName,
          category: productCategory.name,
          measurementUnit: measurementUnit.name,
          packSize,
          skuNumber,
          description,
          brand,
          manufacturer,
          vatStatus,
          salesPrice,
          nearestExpiryDate,
          preferedSupplier: preferredSupplier.name,
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
        const { isApproved: approved } = this.state;
        if (!approved && role === 'Master Admin') {
          return window.location.assign(`products/${rowData[0]}/approve`);
        }
        return window.location.assign(`products/${rowData[0]}`);
      },
      customToolbar: () => {
        const { isApproved: approved } = this.state;
        return (
          <ToolBar
            handleViewProposed={this.handleViewProposed}
            isApproved={approved}
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
};

Products.defaultProps = {
  session: { me: {} },
};

const APPROVED_PRODUCTS = graphql(GET_APPROVED_PRODUCTS, { name: 'getApprovedProducts' });
const PROPOSED_PRODUCTS = graphql(GET_PROPOSED_PRODUCTS, { name: 'getProposedProducts' });

export default compose(
  APPROVED_PRODUCTS,
  PROPOSED_PRODUCTS,
)(withAuth(withStyles(ProductsStyles)(Products)));
