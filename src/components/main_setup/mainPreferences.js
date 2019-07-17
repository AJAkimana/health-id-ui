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
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Switch,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Lock from '@material-ui/icons/Lock';
import Dashboard from '../shared/Dashboard/Dashboard';
import notify from '../shared/Toaster';
import { MainPreferencesStyles } from '../../assets/styles/setup';
import GET_ALL_CURRENCIES from '../../queries/getCurrencies';
import GET_ALL_TIMEZONES from '../../queries/getTimezones';
import GET_OUTLET_PREFERENCES from '../../queries/outletPreferences';
import UPDATE_OUTLET_PREFERENCES from '../../mutations/setup/updateOutletPreferences';
import AutoSuggest from './autoSuggestPopper';

class Preferences extends Component {
  state = {
    lowInventory: true,
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
          loading,
        }
        : null;
    }
    return null;
  }

  handleChangeSwitch = name => event => this.setState({ [name]: event.target.checked });

  handleChange = name => event => this.setState({ [name]: event.target.value });

  handlePayment = name => () => this.setState({ selectedPayment: name });

  handleCurrencyChange = name => event => this.setState({ [name]: event.label });

  handleTimezoneChange = () => event => this.setState(
    {
      selectedTimezone: {
        label: event.label,
        id: event.id,
      }
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
      selectedPayment
    } = this.state;
    const selectedTimezoneID = selectedTimezone.id;

    const { refetch } = getPreferences;

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
        selectedPayment
      }
    }).then(() => {
      notify('Outlet Preferences updated successfully');
      refetch();
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
      prescription,
      otc,
      dailyEssentials,
      beauty,
      currencies,
      timezones,
      nearExpiry,
      lowInventory,
      sendEmail,
      minimumWeeksForSalesVelocity,
      salesVelocity,
      reorderPoint,
      reorderMax,
      barcodeScanning,
      salesHold,
      selectedPayment,
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
                        <Grid item xs={12}>
                          <Paper style={MainPreferencesStyles.paperTitle}>
                            <Typography variant="subtitle2">
                              Category Settings
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} style={MainPreferencesStyles.tableBox}>
                          <Table style={MainPreferencesStyles.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell align="center">Default Sales Markup (%)</TableCell>
                                <TableCell align="center">VAT Applicable</TableCell>
                                <TableCell align="center">Loyalty Calculator</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell component="th" scope="row">Prescription</TableCell>
                                <TableCell align="center">10</TableCell>
                                <TableCell align="center">Yes</TableCell>
                                <TableCell align="center">
                                  <TextField
                                    type="number"
                                    value={prescription}
                                    onChange={this.handleChange('prescription')}
                                    margin="normal"
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">OTC</TableCell>
                                <TableCell align="center">10</TableCell>
                                <TableCell align="center">Yes</TableCell>
                                <TableCell align="center">
                                  <TextField
                                    type="number"
                                    value={otc}
                                    onChange={this.handleChange('otc')}
                                    margin="normal"
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Daily Essentials</TableCell>
                                <TableCell align="center">10</TableCell>
                                <TableCell align="center">Yes</TableCell>
                                <TableCell align="center">
                                  <TextField
                                    type="number"
                                    value={dailyEssentials}
                                    onChange={this.handleChange('dailyEssentials')}
                                    margin="normal"
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Beauty</TableCell>
                                <TableCell align="center">10</TableCell>
                                <TableCell align="center">Yes</TableCell>
                                <TableCell align="center">
                                  <TextField
                                    type="number"
                                    value={beauty}
                                    onChange={this.handleChange('beauty')}
                                    margin="normal"
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Grid>
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
                              <Typography variant="h6">
                                Minimum # of weeks&apos; history for calculating
                                product sales velocity from an outlet
                              </Typography>
                            </Grid>
                            <Grid container item xs={2} style={MainPreferencesStyles.textFieldBox}>
                              <Grid item xs={2}>
                                <TextField
                                  value={minimumWeeksForSalesVelocity}
                                  type="number"
                                  onChange={this.handleChange('minimumWeeksForSalesVelocity')}
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
                              <Typography variant="h6">
                                Default sales velocity for new products
                              </Typography>
                            </Grid>
                            <Grid container item xs={2} style={MainPreferencesStyles.textFieldBox}>
                              <Grid item xs={2}>
                                <TextField
                                  value={salesVelocity}
                                  type="number"
                                  onChange={this.handleChange('salesVelocity')}
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
                              <Typography variant="h6">
                                Alerts for low inventory
                              </Typography>
                            </Grid>
                            <Grid container item xs={2}>
                              <Grid item xs={6}>
                                <Switch
                                  checked={lowInventory}
                                  onChange={this.handleChangeSwitch('lowInventory')}
                                  value="lowInventory"
                                  color="primary"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container style={MainPreferencesStyles.formContainer}>
                            <Grid item xs={10}>
                              <Typography variant="h6">
                                Start alerts for how many weeks of supply?
                              </Typography>
                            </Grid>
                            <Grid container item xs={2} style={MainPreferencesStyles.textFieldBox}>
                              <Grid item xs={2}>
                                <TextField
                                  value={1}
                                  type="number"
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
                            <Grid item xs={10} style={MainPreferencesStyles.formRow}>
                              <Typography variant="h6">
                                Alerts for near expiry
                              </Typography>
                            </Grid>
                            <Grid container item xs={2}>
                              <Grid item xs={6}>
                                <Switch
                                  checked={nearExpiry}
                                  onChange={this.handleChangeSwitch('nearExpiry')}
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
                              <Typography variant="h6">
                                Reorder Point
                              </Typography>
                            </Grid>
                            <Grid container item xs={2} style={MainPreferencesStyles.textFieldBox}>
                              <Grid item xs={2}>
                                <TextField
                                  name="reorderPoint"
                                  value={reorderPoint}
                                  type="number"
                                  fullWidth
                                  onChange={this.handleChange('reorderPoint')}
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
                              <Typography variant="h6">
                                Reorder Max
                              </Typography>
                            </Grid>
                            <Grid container item xs={2} style={MainPreferencesStyles.textFieldBox}>
                              <Grid item xs={2}>
                                <TextField
                                  name="reorderMax"
                                  value={reorderMax}
                                  type="number"
                                  fullWidth
                                  onChange={this.handleChange('reorderMax')}
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
                              <Typography variant="h6">
                                Send Email copy to Managers and Operations Admin after each order
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
                              <Typography variant="h6">
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
                              <Typography variant="h6">
                                Hold sale for how many days?
                              </Typography>
                            </Grid>
                            <Grid container item xs={2} style={MainPreferencesStyles.textFieldBox}>
                              <Grid item xs={2}>
                                <TextField
                                  value={salesHold}
                                  name="salesHold"
                                  type="number"
                                  fullWidth
                                  onChange={this.handleChange('salesHold')}
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
                              <Typography variant="h6">
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
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Preferences.defaultProps = {
  getAllCurrencies: [],
  getAllTimezones: [],
  getPreferences: {},
};

Preferences.propTypes = {
  session: PropTypes.shape({}).isRequired,
  getAllCurrencies: PropTypes.shape({}),
  getAllTimezones: PropTypes.shape({}),
  getPreferences: PropTypes.shape({}),
  updatePreferences: PropTypes.func.isRequired,
};

export default compose(
  graphql(GET_ALL_TIMEZONES, { name: 'getAllTimezones' }),
  graphql(GET_ALL_CURRENCIES, { name: 'getAllCurrencies' }),
  graphql(GET_OUTLET_PREFERENCES, {
    name: 'getPreferences',
    options: () => ({ variables: { outletId: window.location.href.split('/')[5] } })
  }),
  graphql(UPDATE_OUTLET_PREFERENCES, { name: 'updatePreferences' })
)(Preferences);
