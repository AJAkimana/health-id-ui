import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import withAuth from '../withAuth';
import { ProductsStyles } from '../../assets/styles/products/products';
import Dashboard from '../shared/Dashboard/Dashboard';
import Products from './productsTable';

export class ProductPage extends PureComponent {
  render() {
    const { session } = this.props;

    return (
      <div style={ProductsStyles.div}>
        <Dashboard isActive="grid3" session={session} />
        <Products session={session} />
      </div>
    );
  }
}

ProductPage.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
};

ProductPage.defaultProps = {
  session: { me: {} },
};

export default withAuth(withStyles(ProductsStyles)(withRouter(ProductPage)));
