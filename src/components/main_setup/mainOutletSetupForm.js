import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  Grid,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Paper,
  Button,
  MenuItem,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

import {
  MainOutletSetupStyles,
  ContentWrapper,
  SetupHeader,
  RadioGroupStyles
} from '../../assets/styles/setup';
import withAuth from '../withAuth';
import CREATE_OUTLET from '../../mutations/outletSetupMutation';
import GET_ALL_COUNTRIES from '../../queries/countryQuery';
import GET_ALL_CITIES from '../../queries/citiesQuery';

import { StateContext } from '../../providers/stateProvider';

class MainOutletSetupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      cities: [],
      outletName: '',
      addressLine1: '',
      addressLine2: '',
      selectedCountry: '',
      selectedCity: '',
      localGovernmentArea: '',
      phoneNumber: '',
      dateLaunched: '',
      outletType: '',
    };
  }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid9'
    });
  }

  static getDerivedStateFromProps(props, state) {
    const {
      getAllCities,
      getAllCountries,
    } = props;


    const { loading: loadingCities } = getAllCities;
    const { loading: loadingCountries } = getAllCountries;

    const loading = loadingCities || loadingCountries;

    if (
      !loading
      && getAllCountries.countries.length !== state.countries.length
    ) {
      const { countries } = getAllCountries;
      const { cities } = getAllCities;
      return {
        countries,
        cities
      };
    }
    return null;
  }

  handleInputChange = name => event => this.setState({ [name]: event.target.value });

  static contextType = StateContext;

  render() {
    const {
      countries,
      cities,
      outletName,
      addressLine1,
      addressLine2,
      selectedCountry,
      selectedCity,
      localGovernmentArea,
      phoneNumber,
      dateLaunched,
      outletType,
    } = this.state;

    return (
      <Fragment>
        <Grid container style={SetupHeader.container}>
          <Grid item xs={1} style={SetupHeader.backBox}>
            <Button style={SetupHeader.backButton}>
              <Link to="/main_setup/outlets_registers" style={SetupHeader.link}>
                <ArrowBack fontSize="large" />
              </Link>
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Grid style={SetupHeader.profileHeader}>
              <Typography variant="h5">
                Preferences
              </Typography>
              <Button variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
            <Paper>
              <form>
                <Typography variant="h6" style={SetupHeader.formTitle}>
                  Create New Outlet
                </Typography>
                <Grid container spacing={24} justify="center">
                  <Grid item container spacing={24} xs={10}>
                    <Grid item xs={12}>
                      <TextField
                        id="outletname"
                        required
                        name="outletName"
                        label="Outlet Name"
                        fullWidth
                        value={outletName}
                        onChange={this.handleInputChange('outletName')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="addressline1"
                        required
                        name="addressLine1"
                        label="Address Line 1"
                        fullWidth
                        value={addressLine1}
                        onChange={this.handleInputChange('addressLine1')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="addressline2"
                        name="addressLine2"
                        label="Address Line 2"
                        fullWidth
                        value={addressLine2}
                        onChange={this.handleInputChange('addressLine2')}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        select
                        name="selectedCountry"
                        label="Country"
                        margin="normal"
                        value={selectedCountry}
                        onChange={this.handleInputChange('selectedCountry')}
                        fullWidth
                      >
                        {countries && countries.map(option => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        select
                        name="selectedCity"
                        label="City/Town"
                        margin="normal"
                        value={selectedCity}
                        onChange={this.handleInputChange('selectedCity')}
                        fullWidth
                      >
                        {cities && cities.filter(
                          option => (option.country.name === selectedCountry)
                        ).map(option => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="lga"
                        name="localGovernmentArea"
                        label="Region"
                        margin="normal"
                        fullWidth
                        autoComplete="local Government Area"
                        value={localGovernmentArea}
                        onChange={this.handleInputChange('localGovernmentArea')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="phoneno"
                        required
                        name="phoneNumber"
                        label="Phone #"
                        fullWidth
                        autoComplete="Phone #"
                        value={phoneNumber}
                        onChange={this.handleInputChange('phoneNumber')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="datelaunched"
                        required
                        name="dateLaunched"
                        label="Date Launched"
                        type="date"
                        value={dateLaunched}
                        style={ContentWrapper.pickers}
                        onChange={this.handleInputChange('dateLaunched')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" style={MainOutletSetupStyles.outletTypeTitle}>
                      Outlet Type
                    </Typography>
                    <Grid container item xs={10} style={MainOutletSetupStyles.outletType}>
                      <RadioGroup
                        name="outletType"
                        aria-label="outlet"
                        value={outletType}
                        style={RadioGroupStyles.radioGroup}
                        onChange={this.handleInputChange('outletType')}
                        row
                      >
                        <FormControlLabel
                          value="storefront"
                          control={<Radio />}
                          label="Storefront"
                        />
                        <FormControlLabel
                          value="warehouse"
                          control={<Radio />}
                          label="Warehouse"
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

MainOutletSetupForm.propTypes = {
  session: PropTypes.shape({}).isRequired,
};

export default withAuth(compose(
  graphql(CREATE_OUTLET, { name: 'createOutlet' }),
  graphql(GET_ALL_COUNTRIES, { name: 'getAllCountries' }),
  graphql(GET_ALL_CITIES, { name: 'getAllCities' }),
)(MainOutletSetupForm));
