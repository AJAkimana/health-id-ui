import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import {
  Grid,
  Button,
  Typography,
  Paper,
  TextField,
  Switch,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Lock from '@material-ui/icons/Lock';
import Dashboard from '../shared/Dashboard/Dashboard';
import Categories from './productCategories';
import notify from '../shared/Toaster';
import { MainPreferencesStyles } from '../../assets/styles/setup';
import Loader from './preferencesLoader';
import GET_ALL_CURRENCIES from '../../queries/getCurrencies';
import GET_ALL_TIMEZONES from '../../queries/getTimezones';
import GET_OUTLET_PREFERENCES from '../../queries/outletPreferences';
import UPDATE_OUTLET_PREFERENCES from '../../mutations/setup/updateOutletPreferences';
import AutoSuggest from './autoSuggestPopper';
import withAuth from '../withAuth';

export class Preferences extends Component {
  state = {
    nearExpiry: true,
    selectedCurrency: '',
    selectedTimezone: {
      id: '',
      label: '',
      timeZone: ''
    },
    vat: 0,
    prescription: 1,
    otc: 1,
    dailyEssentials: 1,
    beauty: 1,
    sendEmail: true,
    barcodeScanning: false,
    currencies: [],
    timezones: [],
    minimumWeeksForSalesVelocity: 1,
    salesVelocity: 1,
    reorderPoint: 3,
    reorderMax: 4,
    preferenceId: '',
    keepSale: false,
    salesHold: 0,
    selectedPayment: 'cash',
    loading: true,
    changesMade: false,
    alertNearExpiry: false,
    alertLowInventory: false,
    weeksToStartSupplyAlert: 0,
  }

  static getDerivedStateFromProps(props, state) {
    const {
      getAllCurrencies,
      getAllTimezones,
      getPreferences,
    } = props;
    const { loading: loadingCurrencies } = getAllCurrencies;
    const { loading: loadingTimezones } = getAllTimezones;
    const { loading: loadingPreferences } = getPreferences;

    const loading = loadingCurrencies
      || loadingTimezones
      || loadingPreferences;

    if (
      !loading
      && getAllCurrencies.currencies !== state.currencies
      && getAllTimezones.timezones !== state.timezones
    ) {
      const { currencies } = getAllCurrencies;
      const { timezones } = getAllTimezones;
      const { outletPreference } = getPreferences;


      return outletPreference
        ? {
          currencies,
          timezones,
          preferenceId: outletPreference.id,
          selectedCurrency: outletPreference.outletCurrency.name,
          selectedTimezone: {
            id: outletPreference.outletTimezone.id,
            label: outletPreference.outletTimezone.timeZone,
          },
          vat: outletPreference.vatRate.rate,
          minimumWeeksForSalesVelocity: outletPreference.minimumWeeksForSalesVelocity,
          salesVelocity: outletPreference.salesVelocity,
          reorderPoint: outletPreference.reorderPoint,
          reorderMax: outletPreference.reorderMax,
          barcodeScanning: outletPreference.barcodePreference,
          sendEmail: outletPreference.emailPreference,
          salesHold: outletPreference.salesHold,
          selectedPayment: outletPreference.paymentMethod,
          alertNearExpiry: outletPreference.alertNearExpiry,
          alertLowInventory: outletPreference.alertLowInventory,
          weeksToStartSupplyAlert: outletPreference.weeksToStartSupplyAlert,
          loading,
        }
        : null;
    }
  }

  handleChangeSwitch = name => event => this.setState(
    { [name]: event.target.checked, changesMade: true }
  );

  handleChange = name => event => this.setState({ [name]: event.target.value, changesMade: true });

  handlePayment = name => () => this.setState({ selectedPayment: name, changesMade: true });

  handleCurrencyChange = name => event => this.setState({ [name]: event.label, changesMade: true });

  handleTimezoneChange = () => event => this.setState(
    {
      selectedTimezone: {
        label: event.label,
        id: event.id,
      },
      changesMade: true,
    }
  )

  handleSubmit = () => {
    const { updatePreferences, getPreferences } = this.props;
    const {
      selectedCurrency,
      selectedTimezone,
      vat,
      minimumWeeksForSalesVelocity,
      salesVelocity,
      reorderPoint,
      reorderMax,
      barcodeScanning,
      sendEmail,
      preferenceId,
      salesHold,
      selectedPayment,
      alertLowInventory,
      alertNearExpiry,
      weeksToStartSupplyAlert,
    } = this.state;
    const selectedTimezoneID = selectedTimezone.id;

    updatePreferences({
      variables: {
        preferenceId,
        selectedCurrency,
        selectedTimezoneID,
        vat,
        minimumWeeksForSalesVelocity,
        salesVelocity,
        reorderPoint,
        reorderMax,
        barcodeScanning,
        sendEmail,
        salesHold,
        selectedPayment,
        alertLowInventory,
        alertNearExpiry,
        weeksToStartSupplyAlert,
      }
    }).then(() => {
      notify('Outlet Preferences updated successfully');
      getPreferences.refetch();
    }).catch((error) => {
      notify(error.message.slice(14));
    });
  }

  render() {
    const { session } = this.props;
    const {
      selectedCurrency,
      selectedTimezone,
      vat,
      currencies,
      timezones,
      nearExpiry,
      sendEmail,
      minimumWeeksForSalesVelocity,
      salesVelocity,
      reorderPoint,
      reorderMax,
      barcodeScanning,
      salesHold,
      selectedPayment,
      alertLowInventory,
      alertNearExpiry,
      weeksToStartSupplyAlert,
      loading,
    } = this.state;

    return (
      <Fragment>
        <Dashboard isActive="grid9" session={session} />
        <Grid container style={MainPreferencesStyles.container}>
          <Grid item xs={1} style={MainPreferencesStyles.backBox}>
            <Button style={MainPreferencesStyles.backButton}>
              <Link to="/main_setup/outlets_registers" style={MainPreferencesStyles.link}>
                <ArrowBack fontSize="large" />
              </Link>
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Grid style={MainPreferencesStyles.profileHeader}>
              <Typography variant="h5">
                Preferences
              </Typography>
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                Save Changes
              </Button>
            </Grid>
            <Paper>
              {
                !loading
                  ? (
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h6" style={MainPreferencesStyles.sectionHeader}>
                          General Preferences
                        </Typography>
                        <Grid container style={MainPreferencesStyles.sectionContent}>
                          <Grid item xs={4} style={MainPreferencesStyles.selectBox}>
                            <AutoSuggest
                              label="Default Currency"
                              options={
                                currencies.map(
                                  currency => (
                                    {
                                      label: currency.name,
                                    }
                                  )
                                )
                              }
                              value={{ label: selectedCurrency }}
                              disableUnderline={false}
                              onOptionChange={this.handleCurrencyChange('selectedCurrency')}
                              isLoading={loading}
                            />
                          </Grid>
                          <Grid item xs={4} style={MainPreferencesStyles.selectBox}>
                            <AutoSuggest
                              label="Default Timezone"
                              options={
                                timezones.map(
                                  timezone => (
                                    {
                                      label: timezone.timeZone,
                                      id: timezone.id
                                    }
                                  )
                                )
                              }
                              value={
                                {
                                  label: selectedTimezone.label
                                }
                              }
                              disableUnderline={false}
                              onOptionChange={this.handleTimezoneChange('selectedTimezone')}
                              isLoading={loading}
                            />
                          </Grid>
                          <Grid item xs={4} style={MainPreferencesStyles.selectBox}>
                            <TextField
                              type="number"
                              label="VAT Rate (%)"
                              value={vat}
                              onChange={this.handleChange('vat')}
                              margin="normal"
                              fullWidth
                              InputProps={{ inputProps: { min: 0, max: 100 } }}
                              style={MainPreferencesStyles.vat}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" style={MainPreferencesStyles.sectionHeader}>
                          <span>Dashboard Preferences</span>
                          <Lock style={MainPreferencesStyles.lock} />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" style={MainPreferencesStyles.sectionHeader}>
                          Product Preferences
                        </Typography>
                        <Grid container style={MainPreferencesStyles.sectionContent}>
                          <Grid item xs={12} style={MainPreferencesStyles.section}>
                            <Paper>
                              <Categories />
                            </Paper>
                          </Grid>
                          <Grid item xs={12} style={MainPreferencesStyles.section}>
                            <Paper>
                              <Grid item xs={12}>
                                <Paper style={MainPreferencesStyles.paperTitle}>
                                  <Typography variant="subtitle2">
                                    Sales Velocity Settings
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} style={MainPreferencesStyles.sectionContent}>
                                <Typography style={MainPreferencesStyles.description}>
                                  An estimate of how many units of the products are
                                  sold each week for an outlet
                                </Typography>
                                <Grid container style={MainPreferencesStyles.formContainer}>
                                  <Grid item xs={10}>
                                    <Typography variant="body2">
                                      Minimum # of weeks&apos; history for calculating
                                      product sales velocity from an outlet
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={2}
                                    style={MainPreferencesStyles.textFieldBox}
                                  >
                                    <Grid item xs={2}>
                                      <TextField
                                        value={minimumWeeksForSalesVelocity}
                                        type="number"
                                        onChange={this.handleChange('minimumWeeksForSalesVelocity')}
                                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                                        fullWidth
                                      />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="body1" style={MainPreferencesStyles.textFieldTitle}>
                                        week(s)
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid item xs={10}>
                                    <Typography variant="body2">
                                      Default sales velocity for new products
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={2}
                                    style={MainPreferencesStyles.textFieldBox}
                                  >
                                    <Grid item xs={2}>
                                      <TextField
                                        value={salesVelocity}
                                        type="number"
                                        onChange={this.handleChange('salesVelocity')}
                                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                                        fullWidth
                                      />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="body1" style={MainPreferencesStyles.textFieldTitle}>
                                        unit per week
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} style={MainPreferencesStyles.section}>
                            <Paper>
                              <Grid item xs={12}>
                                <Paper style={MainPreferencesStyles.paperTitle}>
                                  <Typography variant="subtitle2">
                                    Product Notifications
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} style={MainPreferencesStyles.sectionContent}>
                                <Typography style={MainPreferencesStyles.description}>
                                  An estimate of how many units of the products are
                                  sold each week for an outlet
                                </Typography>
                                <Grid container style={MainPreferencesStyles.formContainer}>
                                  <Grid item xs={10} style={MainPreferencesStyles.formRow}>
                                    <Typography variant="body2">
                                      Alerts for low inventory
                                    </Typography>
                                  </Grid>
                                  <Grid container item xs={2}>
                                    <Grid item xs={6}>
                                      <Switch
                                        checked={alertLowInventory}
                                        onChange={this.handleChangeSwitch('alertLowInventory')}
                                        value="lowInventory"
                                        color="primary"
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid container style={MainPreferencesStyles.formContainer}>
                                  <Grid item xs={10}>
                                    <Typography variant="body2">
                                      Start alerts for how many weeks of supply?
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={2}
                                    style={MainPreferencesStyles.textFieldBox}
                                  >
                                    <Grid item xs={2}>
                                      <TextField
                                        value={weeksToStartSupplyAlert}
                                        type="number"
                                        fullWidth
                                        onChange={this.handleChange('weeksToStartSupplyAlert')}
                                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                                      />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="body1" style={MainPreferencesStyles.textFieldTitle}>
                                        week(s)
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid item xs={10} style={MainPreferencesStyles.formRow}>
                                    <Typography variant="body2">
                                      Alerts for near expiry
                                    </Typography>
                                  </Grid>
                                  <Grid container item xs={2}>
                                    <Grid item xs={6}>
                                      <Switch
                                        checked={alertNearExpiry}
                                        onChange={this.handleChangeSwitch('alertNearExpiry')}
                                        value={nearExpiry}
                                        color="primary"
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" style={MainPreferencesStyles.sectionHeader}>
                          Orders &amp; Suppliers
                        </Typography>
                        <Grid container style={MainPreferencesStyles.sectionContent}>
                          <Grid item xs={12} style={MainPreferencesStyles.section}>
                            <Paper style={MainPreferencesStyles.paperTitle}>
                              <Typography variant="subtitle2">
                                Suppliers
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} style={MainPreferencesStyles.section}>
                            <Paper>
                              <Grid item xs={12}>
                                <Paper style={MainPreferencesStyles.paperTitle}>
                                  <Typography variant="subtitle2">
                                    Orders
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} style={MainPreferencesStyles.sectionContent}>
                                <Typography style={MainPreferencesStyles.description}>
                                  Set parameters for automated ordering
                                </Typography>
                                <Grid container style={MainPreferencesStyles.formContainer}>
                                  <Grid item xs={10}>
                                    <Typography variant="body2">
                                      Reorder Point
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={2}
                                    style={MainPreferencesStyles.textFieldBox}
                                  >
                                    <Grid item xs={2}>
                                      <TextField
                                        name="reorderPoint"
                                        value={reorderPoint}
                                        type="number"
                                        fullWidth
                                        onChange={this.handleChange('reorderPoint')}
                                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                                      />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="body1" style={MainPreferencesStyles.textFieldTitle}>
                                        week(s)
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid container style={MainPreferencesStyles.formContainer}>
                                  <Grid item xs={10}>
                                    <Typography variant="body2">
                                      Reorder Max
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={2}
                                    style={MainPreferencesStyles.textFieldBox}
                                  >
                                    <Grid item xs={2}>
                                      <TextField
                                        name="reorderMax"
                                        value={reorderMax}
                                        type="number"
                                        fullWidth
                                        onChange={this.handleChange('reorderMax')}
                                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                                      />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="body1" style={MainPreferencesStyles.textFieldTitle}>
                                        week(s)
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid item xs={10} style={MainPreferencesStyles.formRow}>
                                    <Typography variant="body2">
                                      Send Email copy to Managers and Operations Admin
                                      after each order
                                    </Typography>
                                  </Grid>
                                  <Grid container item xs={2}>
                                    <Grid item xs={6}>
                                      <Switch
                                        checked={sendEmail}
                                        onChange={this.handleChangeSwitch('sendEmail')}
                                        value={sendEmail}
                                        color="primary"
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid item xs={10} style={MainPreferencesStyles.formRow}>
                                    <Typography variant="body2">
                                      Barcode Scanning
                                    </Typography>
                                  </Grid>
                                  <Grid container item xs={2}>
                                    <Grid item xs={6}>
                                      <Switch
                                        checked={barcodeScanning}
                                        onChange={this.handleChangeSwitch('barcodeScanning')}
                                        value="nearExpiry"
                                        color="primary"
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" style={MainPreferencesStyles.sectionHeader}>
                          Sell Screen
                        </Typography>
                        <Grid container style={MainPreferencesStyles.sectionContent}>
                          <Grid item xs={12} style={MainPreferencesStyles.section}>
                            <Paper>
                              <Grid item xs={12}>
                                <Paper style={MainPreferencesStyles.paperTitle}>
                                  <Typography variant="subtitle2">
                                    Sell Screen
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} style={MainPreferencesStyles.sectionContent}>
                                <Typography style={MainPreferencesStyles.description}>
                                  General
                                </Typography>
                                <Grid container style={MainPreferencesStyles.formContainer}>
                                  <Grid item xs={10}>
                                    <Typography variant="body2">
                                      Hold sale for how many days?
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={2}
                                    style={MainPreferencesStyles.textFieldBox}
                                  >
                                    <Grid item xs={2}>
                                      <TextField
                                        value={salesHold}
                                        name="salesHold"
                                        type="number"
                                        fullWidth
                                        onChange={this.handleChange('salesHold')}
                                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                                      />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="body1" style={MainPreferencesStyles.textFieldTitle}>
                                        day(s)
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid container style={MainPreferencesStyles.formContainer}>
                                  <Grid item xs={9}>
                                    <Typography variant="body2">
                                      Payment Supported
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={3}
                                    style={MainPreferencesStyles.paymentButtons}
                                  >
                                    <Button
                                      variant="contained"
                                      color={selectedPayment === 'cash' ? 'primary' : 'default'}
                                      onClick={this.handlePayment('cash')}
                                    >
                                      Cash
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color={selectedPayment === 'card' ? 'primary' : 'default'}
                                      onClick={this.handlePayment('card')}
                                    >
                                      Card
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color={selectedPayment === 'both' ? 'primary' : 'default'}
                                      onClick={this.handlePayment('both')}
                                    >
                                      Both
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" style={MainPreferencesStyles.sectionHeader}>
                          Expenses
                          <Lock style={MainPreferencesStyles.lock} />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" style={MainPreferencesStyles.sectionHeader}>
                          Customers
                          <Lock style={MainPreferencesStyles.lock} />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" style={MainPreferencesStyles.sectionHeader}>
                          Team
                          <Lock style={MainPreferencesStyles.lock} />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" style={MainPreferencesStyles.sectionHeader}>
                          Reports
                          <Lock style={MainPreferencesStyles.lock} />
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                  : <Loader />
              }
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Preferences.defaultProps = {
  getAllCurrencies: {
    currencies: []
  },
  getAllTimezones: {
    timezones: []
  },
  getPreferences: {},
  refetch: () => {},
};

Preferences.propTypes = {
  session: PropTypes.shape({}).isRequired,
  getAllCurrencies: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.object)
  }),
  getAllTimezones: PropTypes.shape({
    timezones: PropTypes.arrayOf(PropTypes.object)
  }),
  getPreferences: PropTypes.shape(
    {
      refetch: PropTypes.func.isRequired,
    }
  ),
  updatePreferences: PropTypes.func.isRequired,
  refetch: PropTypes.func,
};

export default withAuth(compose(
  graphql(GET_ALL_TIMEZONES, { name: 'getAllTimezones' }),
  graphql(GET_ALL_CURRENCIES, { name: 'getAllCurrencies' }),
  graphql(GET_OUTLET_PREFERENCES, {
    name: 'getPreferences',
    options: () => ({ variables: { outletId: window.location.href.split('/')[5] } })
  }),
  graphql(UPDATE_OUTLET_PREFERENCES, { name: 'updatePreferences' })
)(Preferences));
