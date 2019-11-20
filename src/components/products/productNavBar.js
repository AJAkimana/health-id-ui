import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LowerNavbar from '../shared/LowerNavbar/LowerNavbar';

class ProductNavBar extends Component {
  constructor({ activeGrid }) {
    super(activeGrid);
    this.state = {
      activeGrid,
      menu: [
        { grid: 'grid1', label: 'Products', url: '/products' },
        { grid: 'grid2', label: 'Promotion & Sales Prompt', url: '/productmenucomingsoon' },
        { grid: 'grid3', label: 'Pricing & Loyalty', url: '/product/pricing' },
        { grid: 'grid4', label: 'Stock Control', url: '/productmenucomingsoon' },
        { grid: 'grid5', label: 'Consultations', url: '/productmenucomingsoon' }
      ]
    };
  }


  render() {
    const { activeGrid, menu } = this.state;
    return <LowerNavbar activeGrid={activeGrid} menu={menu} />;
  }
}

ProductNavBar.propTypes = {
  activeGrid: PropTypes.string
};
ProductNavBar.defaultProps = {
  activeGrid: ''
};

export default ProductNavBar;
