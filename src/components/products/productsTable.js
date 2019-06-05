import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import AfterSelectToolBar from './afterSelectToolBar';
import ToolBar from './toolBar';
import GET_APPROVED_PRODUCTS from './productQueries';
import { ProductsStyles } from '../../assets/css/products';
import withAuth from '../withAuth';
import Dashboard from '../shared/Dashboard/Dashboard';

export class Products extends Component {
  state = {
    approvedProducts: [],
  }

  componentWillReceiveProps(nextProps) {
    this.fetchProducts(nextProps);
  }

  fetchProducts = ({ getApprovedProducts }) => {
    let { approvedProducts } = getApprovedProducts;
    const { loading: loadingApproved } = getApprovedProducts;

    if (loadingApproved) {
      return;
    }

    if (approvedProducts === null) {
      approvedProducts = [];
    }
    this.setState({ approvedProducts });
  }

  render() {
    const { approvedProducts: products } = this.state;
    const title = `${products.length} Products`;

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
        preferedSupplier, backupSupplier, id, productQuantity, loyaltyWeight,
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
          preferedSupplier: preferedSupplier.name,
          backupSupplier: backupSupplier.name,
          productQuantity,
          loyaltyWeight,
        }
      );
    });
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
        window.location.assign(`products/${rowData[0]}`);
      },
      customToolbar: () => (<ToolBar />)
    };
    const { session } = this.props;
    return (
      <div style={ProductsStyles.div}>
        <Dashboard isActive="grid3" session={session} />
        <MUIDataTable
          title={title}
          data={productsList}
          columns={columns}
          options={options}
        />
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

export default compose(
  APPROVED_PRODUCTS,
)(withAuth(session => session && session.me)(withStyles(ProductsStyles)(Products)));
