import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToolBar from '../toolBar';
import DataTable from '../../dataTable';
import DataTableLoader from '../../dataTable/dataTableLoader';


class Orders extends Component {
  handleViewOrders = (viewStatus) => {
    const { history } = this.props;

    const prefix = (viewStatus.open && '/open') || (viewStatus.closed && '/closed') || '';
    const path = (viewStatus.open && viewStatus.closed) ? '/all' : prefix;

    history.push(`/orders${path}`);
  };


  render() {
    const {
      openOrders, closedOrders, isLoading, status
    } = this.props;

    // initialize the default value
    let orderSet;
    // switch between all the cases of status values and set the value of orders
    switch (status) {
    case 'open':
      orderSet = openOrders;
      break;

    case 'closed':
      orderSet = closedOrders;
      break;

    case 'all':
      orderSet = [...openOrders, ...closedOrders];
      break;

    case undefined:
      orderSet = [];
      break;

    default:
      orderSet = openOrders;
      break;
    }

    const columns = [
      {
        name: 'deliveryDate',
        label: 'Delivery Date',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'name',
        label: 'Name',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'orderNumber',
        label: 'Order #',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'supplier',
        label: 'Supplier',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'batches',
        label: 'Batches',
        options: {
          filter: true,
          sort: true,
        }
      },
    ];

    const options = {
      responsive: 'scroll',
      elevation: 0,
      print: false,
      download: false,
      filter: false,
      viewColumns: false,
      rowHover: false,
      selectableRows: 'multiple',
      customToolbar: () => {
        // eslint-disable-next-line no-shadow
        const { status } = this.props;
        const isOrderOpen = 'open';
        return (
          <ToolBar
            handleViewOrders={this.handleViewOrders}
            isOrderOpen={isOrderOpen}
            status={status}
          />
        );
      },
    };
    const orderProducts = [];

    orderSet.map((orderDetail) => {
      const {
        orderNumber, deliveryDate, name, orderdetailsSet
      } = orderDetail;
      return orderdetailsSet.map((orderDetailSet) => {
        const { product: { batchInfo }, supplier } = orderDetailSet;
        let supplierOrderName;
        if (supplier) {
          supplierOrderName = `${supplier.name} - ${name}`;
        } else {
          supplierOrderName = <em>{`unspecified supplier - ${name}`}</em>;
        }

        return (
          orderProducts.unshift({
            deliveryDate,
            name: supplierOrderName,
            orderNumber,
            supplier: supplier ? supplier.name : <em>unspecified</em>,
            batches: batchInfo.length,
          }));
      });
    });

    const title = `${orderProducts.length} Product order(s) ${status === 'all' || status === undefined ? '' : status}`;
    return (
      isLoading ? (
        <DataTableLoader />
      ) : (
        <DataTable
          title={title}
          data={orderProducts}
          columns={columns}
          options={options}
        />
      )
    );
  }
}

Orders.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  openOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  closedOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
};

Orders.defaultProps = {
  history: {}
};

export default Orders;
