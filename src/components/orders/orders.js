import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import OrdersAndSuppliersNavBar from '../shared/LowerNavbar/OrdersAndSuppliersNavBar';
import Dashboard from '../shared/Dashboard/Dashboard';
import withAuth from '../withAuth';

// eslint-disable-next-line react/prefer-stateless-function
export class OrderPage extends Component {
  render() {
    const { session } = this.props;

    return (
      <div>
        <Dashboard isActive="grid4" session={session} />
        <OrdersAndSuppliersNavBar activeGrid="grid1" />
        <h2>Order page</h2>
      </div>
    );
  }
}
OrderPage.propTypes = {
  session: PropTypes.objectOf(PropTypes.object)
};
OrderPage.defaultProps = {
  session: { me: {} }
};
export default withAuth(withRouter(OrderPage));
