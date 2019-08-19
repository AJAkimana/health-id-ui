import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import AfterSelectToolBar from './afterSelectToolBar';
import ToolBar from './toolBar';
import { GET_APPROVED_AND_PROPOSED_PRODUCTS, SEARCH_PRODUCTS } from './productQueries';
import { ProductsStyles } from '../../assets/styles/products/products';
import DataTableLoader from '../dataTable/dataTableLoader';
import withProductSearch from './ProductSearch';
import DataTable from '../dataTable/dataTable';

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchActive: false,
      searchResults: [],
      pageCount: 10,
      pageNumber: 1
    };
  }

  handleViewProposed = (viewStatus) => {
    const { history } = this.props;

    const status = (viewStatus.approved && '/approved') || (viewStatus.proposed && '/proposed') || '';
    const statusRoute = (viewStatus.approved && viewStatus.proposed) ? '/all' : status;

    history.push(`/products${statusRoute}`);
  }

  changePage = (page, refetch) => {
    refetch({
      pageCount: page
    });
    this.setState({ pageCount: page });
  };

  handleSearch = async (searchText, client) => {
    if (searchText && searchText.length > 2) {
      const { data } = await client.query({
        query: SEARCH_PRODUCTS,
        variables: { searchValue: searchText }
      });

      await this.setState({ searchResults: data.products, searchText, searchActive: true });
    } else if (!searchText) {
      await this.setState({ searchActive: false, searchText: '' });
    }
  };

  render() {
    const { session, client } = this.props;
    const {
      pageCount, pageNumber, searchResults, searchText, searchActive
    } = this.state;
    const { name: role } = session.me.role;

    return (
      <Query
        query={GET_APPROVED_AND_PROPOSED_PRODUCTS}
        variables={
          {
            pageCount,
            pageNumber
          }
        }
      >
        {({
          loading, error, data, refetch
        }) => {
          if (loading) return <DataTableLoader />;
          if (error) {
            return <div> Something went wrong, try refreshing the page </div>;
          }
          let { match: { params: { status } } } = this.props;

          let products;
          switch (status) {
          case 'approved':
            products = data.approvedProducts;
            break;

          case 'proposed':
            products = data.proposedProducts;
            break;

          case 'all':
            products = [...data.approvedProducts, ...data.proposedProducts];
            break;

          case undefined:
            products = [];
            break;

          default:
            products = data.approvedProducts;
            status = 'approved';
            break;
          }

          if (searchResults && searchActive) {
            products = searchResults;
          }

          const title = products ? `${products.length} Products ${status === 'all' || status === undefined ? '' : status}` : '';

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
          const options = {
            responsive: 'scroll',
            elevation: 0,
            print: false,
            download: false,
            filter: false,
            viewColumns: true,
            rowHover: false,
            selectableRows: 'multiple',
            rowsPerPage: pageCount,
            rowsPerPageOptions: [10, 25, 50, 100],
            serverSide: true,
            count: pageCount,
            searchText,
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
            onTableChange: (action, tableState) => {
              switch (action) {
              case 'changeRowsPerPage':
                this.changePage(tableState.rowsPerPage, refetch);
                break;
              case 'search':
                this.handleSearch(tableState.searchText, client);
                break;
              default:
                break;
              }
            }
          };
          return (
            <DataTable
              title={title}
              data={productsList}
              columns={columns}
              options={options}
            />
          );
        }}
      </Query>
    );
  }
}

Products.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  client: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
};

Products.defaultProps = {
  session: { me: {} },
  history: {},
  client: {}
};

export default withProductSearch(withStyles(ProductsStyles)(withRouter(Products)));
