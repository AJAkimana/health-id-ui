import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContainer from './authentication/Container';
import ResetPassword from './authentication/PasswordReset';
import StepperNav from './setup/Stepper';
import Dashboard from './shared/Dashboard/Dashboard';
import ComingSoon from './shared/ComingSoon';
import ViewProducts from './stock_control/viewProducts';
import ProductPage from './products/ProductPage';
import UserProfile from './profile/Profile';
import ApproveProductDetail from '../container/products/approveProduct';
import ProductDetail from '../containers/productDetail';
import SellScreenContainer from '../containers/sellScreenContainer';
import AddProduct from './products/AddProduct/AddProduct';
import ImportProduct from './products/ImportProduct/ImportProduct';
import AddSupplier from './suppliers/AddSupplier/AddSupplier';
import SalesHistory from '../containers/salesHistoryContainer';
import MainSetup from './main_setup/mainSetup';
import MainProfile from './main_setup/mainProfileSetup';
import ManageProfile from './main_setup/manageProfileSetup';
import MainPreferences from './main_setup/mainPreferences';
import MainBusinessInformation from './main_setup/mainBusinessSetup';
import MainBusinessView from './main_setup/mainBusinessSetupView';
import MainOutletSetup from './main_setup/mainOutletSetup';
import MainOutletSetupForm from './main_setup/mainOutletSetupForm';
import MainInvitedUsers from './main_setup/mainInvitedUsers';
import SuppliersPage from './suppliers/SuppliersPage';
import SingleSupplierPage from './suppliers/SingleSupplierPage';
import OrdersAndSuppliers from '../containers/orders/orders';
import ImportSuppliers from './suppliers/Templates/ImportSuppliers/ImportSuppliers';

const App = ({ session }) => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={AuthContainer} />
      <Route exact path="/register" component={AuthContainer} />
      <Route exact path="/setup" component={StepperNav} />
      <Route exact path="/comingsoon" render={() => <ComingSoon session={session} />} />
      <Route exact path="/main_setup" render={() => <MainSetup session={session} />} />
      <Route exact path="/main_setup/profile" render={() => <MainProfile session={session} />} />
      <Route exact path="/main_setup/profile/manage_profile_user" render={() => <ManageProfile session={session} />} />
      <Route exact path="/main_setup/preferences/:outletID" render={() => <MainPreferences session={session} />} />
      <Route exact path="/main_setup/business_information" render={() => <MainBusinessInformation session={session} />} />
      <Route exact path="/main_setup/business_information/:businessID" render={() => <MainBusinessView session={session} />} />
      <Route exact path="/main_setup/outlets_registers" render={() => <MainOutletSetup session={session} />} />
      <Route exact path="/main_setup/outlets_registers/new" render={() => <MainOutletSetupForm session={session} />} />
      <Route exact path="/main_setup/users" render={() => <MainInvitedUsers session={session} />} />
      <Route exact path="/dashboard" render={() => <Dashboard session={session} />} />
      <Route exact path="/reset_password/:uid65/:token" component={ResetPassword} />
      <Route exact path="/products/:id/approve" render={() => <ApproveProductDetail session={session} />} />
      <Route exact path="/products" render={() => <ProductPage session={session} />} />
      <Route exact path="/products/:status" render={() => <ProductPage session={session} />} />
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/products/:id/details" render={() => <ProductDetail session={session} />} />
      <Route exact path="/stock" render={() => <ViewProducts session={session} />} />
      <Route exact path="/suppliers/add" render={() => <AddSupplier session={session} />} />
      <Route
        exact
        path="/suppliers"
        render={() => <Redirect to="/suppliers/approved" />}
      />
      <Route
        exact
        path="/suppliers/:status"
        render={() => <SuppliersPage session={session} />}
      />
      <Route
        exact
        path="/suppliers/suppliers/:id/details"
        render={() => <SingleSupplierPage session={session} />}
      />
      <Route
        exact
        path="/suppliers/:id/details"
        render={() => <SingleSupplierPage session={session} />}
      />
      <Route exact path="/suppliers/new/import" render={() => <ImportSuppliers session={session} />} />
      <Route exact path="/sell" render={() => <SellScreenContainer session={session} />} />
      <Route exact path="/sell/history" render={() => <SalesHistory session={session} />} />
      <Route exact path="/product/add" render={() => <AddProduct session={session} />} />
      <Route exact path="/product/import" render={() => <ImportProduct session={session} />} />
      <Route exact path="/orders/:status" render={() => <OrdersAndSuppliers session={session} />} />
      <Route exact path="/orders" render={() => <OrdersAndSuppliers session={session} />} />
    </Switch>
  </Fragment>
);

App.propTypes = {
  session: PropTypes.objectOf(PropTypes.object)
};

App.defaultProps = {
  session: {}
};

export default App;
