import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContainer from './authentication/Container';
import ResetPassword from './authentication/PasswordReset';
import StepperNav from './setup/Stepper';
import Dashboard from './shared/Dashboard/Dashboard';
import ViewProducts from './stock_control/viewProducts';
import Products from './products/productsTable';
import UserProfile from './profile/Profile';
import ApproveProductDetail from '../container/products/approveProduct';
import ProductDetail from '../containers/productDetail';
import SellScreenContainer from '../containers/sellScreenContainer';
import AddProduct from './products/AddProduct/AddProduct';
import ImportProduct from './products/ImportProduct/ImportProduct';
import SalesHistory from '../containers/salesHistoryContainer';

const App = ({ session }) => (
  <div>
    <Switch>
      <Route exact path="/" component={AuthContainer} />
      <Route exact path="/register" component={AuthContainer} />
      <Route exact path="/setup" component={StepperNav} />
      <Route exact path="/dashboard" render={() => <Dashboard session={session} />} />
      <Route exact path="/reset_password/:uid65/:token" component={ResetPassword} />
      <Route exact path="/products/:id/approve" render={() => <ApproveProductDetail session={session} />} />
      <Route exact path="/products" render={() => <Products session={session} />} />
      <Route exact path="/products/:status" render={() => <Products session={session} />} />
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/products/:id/details" render={() => <ProductDetail session={session} />} />
      <Route exact path="/stock" render={() => <ViewProducts session={session} />} />
      <Route exact path="/sell" render={() => <SellScreenContainer session={session} />} />
      <Route exact path="/sell/history" render={() => <SalesHistory session={session} />} />
      <Route exact path="/product/add" render={() => <AddProduct session={session} />} />
      <Route exact path="/product/import" render={() => <ImportProduct session={session} />} />
    </Switch>
  </div>
);

App.propTypes = {
  session: PropTypes.objectOf(PropTypes.object)
};

App.defaultProps = {
  session: {}
};

export default App;
