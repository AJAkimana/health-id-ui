import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import AfterSelectToolBar from './afterSelectToolBar';
import ToolBar from './toolBar';
import {
  GET_PRODUCTS_COUNT,
  SEARCH_PRODUCTS,
  GET_APPROVED_AND_PROPOSED_PRODUCTS
} from './productQueries';
import { ProductsStyles } from '../../assets/styles/products/products';
import DataTableLoader from '../dataTable/dataTableLoader';
import withProductSearch from './ProductSearch';
import DataTable from '../dataTable/dataTable';
import CustomFooter from './productsTableFooter';

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchActive: false,
      searchResults: [],
      rowsCount: 10,
      pageNumber: 1,
      totalPages: 0,
    };
  }

  handleViewProposed = (viewStatus) => {
    const { history } = this.props;

    const status = (viewStatus.approved && '/approved') || (viewStatus.proposed && '/proposed') || '';
    const statusRoute = (viewStatus.approved && viewStatus.proposed) ? '/all' : status;

    history.push(`/products${statusRoute}`);
  }

  changePage = name => () => {
    const { pageNumber } = this.state;
    if (name === 'prev' && pageNumber !== 1) {
      this.setState(prevState => ({ ...prevState, pageNumber: prevState.pageNumber - 1 }));
    }
    if (name === 'next') {
      return this.setState(prevState => ({ ...prevState, pageNumber: prevState.pageNumber + 1 }));
    }
  };

  changeRows = refetch => (event) => {
    refetch({
      pageCount: event.target.value
    });
    this.setState({ rowsCount: event.target.value });
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
    const { session } = this.props;
    const {
      rowsCount, pageNumber, searchResults, searchText, searchActive
    } = this.state;
    const { name: role } = session.me.role;

    return (
      <Query
        query={GET_PRODUCTS_COUNT}
        variables={
          {
            pageCount: rowsCount,
            pageNumber
          }
        }
      >
        {({
          loading: loadingOne, error: errorOne, data: dataOne
        }) => {
          if (loadingOne) return <DataTableLoader />;
          if (errorOne) {
            return <div> Something went wrong, try refreshing the page </div>;
          }
          return (
            <Query
              query={GET_APPROVED_AND_PROPOSED_PRODUCTS}
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
                    loading, error, data, refetch
                  }
                ) => {
                  if (loading) return <DataTableLoader />;
                  if (error) {
                    return <div> Something went wrong, try refreshing the page </div>;
                  }
                  const { totalProductsPagesCount } = dataOne;
                  // this.handleSetTotalPagesCount(totalProductsPagesCount);

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
                    rowsPerPage: rowsCount,
                    rowsPerPageOptions: [10, 25, 50, 100],
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
                    customFooter: () => {
                      const { pageNumber: customPageNumber } = this.state;
                      return (
                        <CustomFooter
                          handleChangePage={this.changePage}
                          handleChangeRows={this.changeRows}
                          refetch={refetch}
                          rowsCount={rowsCount}
                          pageNumber={customPageNumber}
                          totalProductsPagesCount={totalProductsPagesCount}
                        />
                      );
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
                }
              }
            </Query>
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
};

Products.defaultProps = {
  session: { me: {} },
  history: {},
};

export default withProductSearch(withStyles(ProductsStyles)(withRouter(Products)));
