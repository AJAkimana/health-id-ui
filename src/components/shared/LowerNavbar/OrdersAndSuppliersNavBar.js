import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LowerNavbar from './LowerNavbar';

class OrdersAndSuppliersNavBar extends Component {
  constructor({ activeGrid }) {
    super(activeGrid);
    this.state = {
      activeGrid,
      menu: [
        { grid: 'grid1', label: 'Orders', url: '/orders' },
        { grid: 'grid2', label: 'Suppliers', url: '/suppliers' }
      ]
    };
  }


  render() {
    const { activeGrid, menu } = this.state;
    return <LowerNavbar activeGrid={activeGrid} menu={menu} />;
  }
}

OrdersAndSuppliersNavBar.propTypes = {
  activeGrid: PropTypes.string
};
OrdersAndSuppliersNavBar.defaultProps = {
  activeGrid: ''
};

export default OrdersAndSuppliersNavBar;
