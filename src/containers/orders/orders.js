import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Dashboard from '../../components/shared/Dashboard/Dashboard';
import OrdersAndSuppliersNavBar from '../../components/shared/LowerNavbar/OrdersAndSuppliersNavBar';
import Orders from '../../components/ordersAndSuppliers/orders/orders';
import { GET_OPEN_ORDERS, GET_CLOSED_ORDERS } from '../../components/ordersAndSuppliers/queries/fetchOrdersQuery';
import DataTableLoader from '../../components/dataTable/dataTableLoader';

export class OrdersAndSuppliers extends Component {
  state = {
    isOrder: true,
    isLoading: true,
    openOrders: [],
    closedOrders: []
  }

  static getDerivedStateFromProps = ({ openOrdersResults, closedOrdersResults }, prevState) => {
    const { openOrders, loading: openOrdersLoading } = openOrdersResults;
    const {
      closedOrders, loading: closedOrdersLoading
    } = closedOrdersResults;

    const loading = openOrdersLoading || closedOrdersLoading;

    if (!loading
      && openOrders.length !== prevState.openOrders.length
      && closedOrders.length !== prevState.closedOrders.length) {
      return { openOrders, closedOrders, isLoading: false };
    }
    return { isLoading: false };
  }

  handleMenuSwitch = (_, value) => {
    this.setState({ isOrder: !value });
  }

  render() {
    const { session, history, match: { params: { status } } } = this.props;
    const {
      isOrder, openOrders, closedOrders, isLoading
    } = this.state;

    const bodyContent = isOrder ? (
      <Orders
        openOrders={openOrders}
        closedOrders={closedOrders}
        isLoading={isLoading}
        history={history}
        status={status}
      />
    ) : (<div>Suppliers</div>);

    return (
      <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <Dashboard isActive="grid4" session={session} />
        <OrdersAndSuppliersNavBar activeGrid="grid1" />
        {
          isLoading ? <DataTableLoader /> : (bodyContent)
        }
      </div>
    );
  }
}

OrdersAndSuppliers.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  match: PropTypes.objectOf(PropTypes.any).isRequired
};

OrdersAndSuppliers.defaultProps = {
  session: { me: {} },
  history: {}
};

const OPEN_ORDERS = graphql(GET_OPEN_ORDERS, { name: 'openOrdersResults' });
const CLOSED_ORDERS = graphql(GET_CLOSED_ORDERS, { name: 'closedOrdersResults' });

export default compose(
  OPEN_ORDERS,
  CLOSED_ORDERS
)(withRouter(OrdersAndSuppliers));
