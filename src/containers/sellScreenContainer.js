import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Typography, Grid, TextField, Paper, InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { createFilter } from 'react-search-input';
import withAuth from '../components/withAuth';
import notify from '../components/shared/Toaster';
import SellScreen from '../components/sell/sellScreen';
import {
  validateName, validateEmail, validatePhone, validateInterger
} from '../components/utils/validations';
import stringToColor from '../components/utils/stringToColor';
import initialState from '../components/sell/sellScreenState';
import ReturnSingleCustomer from '../components/sell/returnSingleCustomer';
import ReturnTableRow from '../components/sell/returnTableRow';
import ReturnQuantity from '../components/sell/returnQuantity';
import ProductCard from '../components/sell/productCard';
import SearchList from '../components/sell/searchList';
import WithInitialData from './withInitialData';
import PaymentContainer from '../components/payment/container/paymentContainer';
import viewProductStyles from '../assets/css/viewProductsStyles';
import GET_FILTERED_PRODUCTS from '../queries/filteredProductsQuery';

import { StateContext } from '../providers/stateProvider';

export class SellScreenContainer extends Component {
  state = {
    ...initialState
  };

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid2'
    });

    this.setLocations();
    this.setInitialData();
  }

  setInitialData = () => {
    const { products, customers } = this.props;
    const productsWithQuantity = products.filter(product => product.quantityInStock > 0);
    const currency = products.length > 0
      ? products[0].outlet.outletpreference.outletCurrency.symbol
      : initialState.currency;

    this.setState({
      customers,
      products,
      currency,
      preferedProducts: productsWithQuantity.slice(0, 8),
    });
  };

  handleChange = (event, client) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === 'searchValue' && value.length > 2) {
      this.setState({ searching: true });
      this.filterProducts(client, value);
    }
  };


  filterProducts = (client, value) => {
    client.query({
      query: GET_FILTERED_PRODUCTS,
      variables: { productName: value }
    }).then(({ data: { filterProducts: { edges } } }) => {
      this.setState({
        filteredProducts: edges,
        searching: false
      });
    }).catch(() => {
      this.setState({
        filteredProducts: [],
        searching: false
      });
    });
  }

  handleDiscountButton = () => {
    const { discountValue } = this.state;
    this.setState({
      discount: discountValue,
      openDicountPopper: false
    });
  }

  renderTableRow = (item) => {
    const { currency } = this.state;
    return (
      <ReturnTableRow
        key={item.id}
        item={item}
        currency={currency}
        renderQuantity={this.renderQuantity}
        handleCartItemNote={this.handleCartItemNote}
        handleCartItemDelete={this.handleCartItemDelete}
        calculateTotal={this.calculateTotal}
      />
    );
  }

  handleCartItemDelete = (item) => {
    const { cartItems } = this.state;
    const index = cartItems.findIndex(x => x.id === item.id);
    this.setState({
      cartItems: [
        ...cartItems.slice(0, index),
        ...cartItems.slice(index + 1)
      ]
    });
  }

  handleCartItemNote = (event) => {
    const { currentTarget } = event;
    const placement = 'bottom-end';
    this.setState({
      productNoteAnchorEl: currentTarget,
      openNotePopper: true,
      placement,
    });
  }

  handleNoteBackButton = () => {
    this.setState({
      openNotePopper: false,
      cartItemNoteValue: '',
    });
  };

  handleNoteAddButton = (id) => {
    const { cartItems, cartItemNoteValue } = this.state;
    const note = cartItemNoteValue;
    const item = cartItems.find(x => x.id === Number(id));
    const newItem = { ...item, note };
    const index = cartItems.findIndex(x => x.id === item.id);
    this.setState({
      cartItems: [
        ...cartItems.slice(0, index),
        Object.assign({}, cartItems[index], newItem),
        ...cartItems.slice(index + 1)
      ],
    });
    notify(`Note added to cart item: ${item.productName}`);
    this.handleNoteBackButton();
  };

  handleAddHeldSaleButton = () => {
    const { cartItems, mainCartNote, salesOnHold } = this.state;
    const heldSale = {
      mainCartNote,
      cartItems
    };
    this.setState({
      salesOnHold: [...salesOnHold, heldSale],
      cartItems: []
    });
    this.handleCartNoteDialogClose();
  };

  handleReturnSaleToCart = (mainCartNote, cartItems) => {
    this.setState({
      cartItems,
      salesOnHold: [],
      mainCartNote
    });
    this.handleCartNoteDialogClose();
  };

  handleCartNoteDialogClose = () => {
    this.setState({
      openHoldSaleDialog: false,
      openSalesOnHoldDialog: false,
      mainCartNote: '',
    });
  };

  handleHoldNoteInPutChange = (event) => {
    const { value } = event.target;
    this.setState({ mainCartNote: value });
  }

  renderQuantity = item => (
    <ReturnQuantity
      item={item}
      handleQuantityButtons={this.handleQuantityButtons}
      handleQuantityOnChange={this.handleQuantityOnChange}
    />
  );

  handleQuantityOnChange = (event, item) => {
    let { value } = event.target;
    if (!validateInterger(value)) value = 1;
    else value = Number(value);
    this.updateQuantityInStock(item, value);
  }

  handleQuantityButtons = (item, action) => {
    let { quantity } = item;
    const ceiling = 99;
    const step = 1;
    if (action === 'add' && quantity < ceiling) {
      quantity += step;
    } else if (action === 'remove' && quantity > step) {
      quantity -= step;
    }
    this.updateQuantityInStock(item, quantity);
  }

  updateQuantityInStock = (item, quantity) => {
    const { cartItems } = this.state;
    const newItem = { ...item, quantity };
    const index = cartItems.findIndex(x => x.id === item.id);
    this.setState({
      cartItems: [
        ...cartItems.slice(0, index),
        Object.assign({}, cartItems[index], newItem),
        ...cartItems.slice(index + 1)
      ]
    });
  }

  handleCustomerInputChange = placement => (event) => {
    const { currentTarget, target: { value } } = event;
    this.setState({
      customerAnchorEl: currentTarget,
      openCustomerPopper: !!value,
      placement,
      firstName: value,
    });
    this.handleCustomerSearch(value);
  }

  handleCustomerSearch = (value) => {
    const { customers } = this.state;
    const KEYS_TO_FILTER = ['firstName', 'lastName', 'primaryMobileNumber'];
    const filteredCustomers = value && customers.filter(createFilter(value, KEYS_TO_FILTER));
    this.setState({ filteredCustomers });
  };

  getInitials = ({ firstName, lastName }) => {
    const newLastName = lastName || 'xavier';
    const initials = firstName.charAt(0).toUpperCase()
      + newLastName.charAt(0).toUpperCase();
    return initials;
  };

  handleDiscardSaleButton = () => {
    this.setState({
      cartItems: [],
      mainCartNote: ''
    });
  };

  handleHoldSaleButton = () => {
    this.setState({
      openHoldSaleDialog: true
    });
  };

  handleSalesOnHoldButton = () => {
    this.setState({
      openSalesOnHoldDialog: true
    });
  };

  handleDiscountClick = placement => (event) => {
    const { currentTarget } = event;
    if (currentTarget.id === 'discount-input') {
      this.setState({
        discountAnchorEl: currentTarget,
        openDicountPopper: true,
        placement,
      });
    }
  };

  handleDiscountPopperClickAway = () => {
    this.setState({
      openDicountPopper: false
    });
  }

  handleNotePopperClickAway = () => {
    this.setState({
      openNotePopper: false
    });
  }

  handleCustomerPopperClickAway = () => {
    this.setState({
      openCustomerPopper: false,
      firstName: ''
    });
  }

  handleAddNewCustomer = () => {
    this.setState({
      openCustomerDialog: true,
      openCustomerPopper: false
    });
  };

  handleCustomerDialogClose = () => {
    this.setState({
      openCustomerDialog: false,
      openCustomerDetailsDialog: false,
      firstName: '',
      lastName: '',
      isSelected: '',
      email: '',
      primaryMobileNumber: '',
      secondaryMobileNumber: '',
      loyaltyMember: false,
      region: '',
      emergencyContactName: '',
      emergencyContactEmail: '',
      emergencyContactNumber: '',
    });
  };

  handleCustomerDialogInPutChange = (event) => {
    const { name, checked } = event.target;
    let { value } = event.target;
    if (name === 'firstName') {
      const checkName = validateName(value);
      this.setState({
        nameHelper: checkName[0],
        nameError: checkName[1],
        formError: checkName[1],
      });
    }

    if (name === 'loyaltyMember') value = checked;

    if (name === 'email') {
      const checkEmail = validateEmail(value);
      this.setState({
        emailHelper: checkEmail[0],
        emailError: checkEmail[1],
        formError: checkEmail[1],
      });
    }

    if (name === 'primaryMobileNumber') {
      const checkPhone = validatePhone(value);
      this.setState({
        mobileHelper: checkPhone[0],
        mobileError: checkPhone[1],
        formError: checkPhone[1]
      });
    }

    if (name === 'secondaryMobileNumber') {
      const checkPhone = validatePhone(value);
      this.setState({
        phoneHelper: checkPhone[0],
        phoneError: checkPhone[1],
        formError: checkPhone[1]
      });
    }

    if (name === 'country') {
      this.setLocale(value);
    }

    if (name === 'city') {
      this.setCityId(value);
    }

    this.setState({
      [name]: value
    });
  };

  handlePrimaryPhoneChange = (value) => {
    this.setState({
      primaryMobileNumber: value,
      formError: false,
      mobileError: false,
    });
  }

  handleSecondaryPhoneChange = (value) => {
    this.setState({
      secondaryMobileNumber: value,
    });
  }

  handleContactPhoneChange = (value) => {
    this.setState({
      emergencyContactNumber: value,
    });
  }

  setLocale = (value) => {
    const { countries } = this.props;
    countries.map((country) => {
      if (country.name === value) {
        const randomCity = _.sample(country.citySet);
        this.setState({
          cities: country.citySet,
          city: randomCity.name,
          cityId: Number(randomCity.id),
          countryId: Number(country.id)
        });
      }
      return value;
    });
  }

  setCityId = (value) => {
    const { cities } = this.state;
    cities && cities.map((city) => {
      if (city.name === value) {
        this.setState({ cityId: Number(city.id) });
      }
      return value;
    });
  }

  updateCustomers = (cache, data) => {
    const { isSelected, customers } = this.state;
    if (!isSelected) {
      const { data: { createCustomer: { customer } } } = data;
      this.setState({
        customers: [customer, ...customers]
      });
      this.handleDisplaySelectedCustomer(customer);
    } else {
      const { data: { editCustomerBasicProfile: { customer } } } = data;
      const index = customers.findIndex(x => x.id === customer.id);
      this.setState({
        customers: [
          ...customers.slice(0, index),
          Object.assign({}, customers[index], customer),
          ...customers.slice(index + 1)
        ]
      });
      this.handleDisplaySelectedCustomer(customer);
    }
  };

  renderSingleCustomer = (customer, isSelected = '') => (
    <React.Fragment key={customer.id}>
      <ReturnSingleCustomer
        customer={customer}
        isSelected={isSelected}
        handleDisplaySelectedCustomer={this.handleDisplaySelectedCustomer}
        stringToColor={stringToColor}
        getInitials={this.getInitials}
        removeSelectedCustomer={this.removeSelectedCustomer}
      />
    </React.Fragment>
  );

  removeSelectedCustomer = () => {
    this.setState({
      selectedCustomer: '',
      firstName: ''
    });
  };

  handleDisplaySelectedCustomer = (customer, isSelected) => {
    this.setState({
      selectedCustomer: customer,
      filteredCustomers: [],
      openCustomerPopper: false,
    });
    isSelected && this.handleDisplayCustomerDetails(customer, isSelected);
  };

  handleDisplayCustomerDetails = async ({
    id, firstName, lastName, email, primaryMobileNumber,
    secondaryMobileNumber, loyaltyMember, region, city, country,
    emergencyContactName, emergencyContactEmail, emergencyContactNumber,
  }, isSelected) => {
    await this.setState({
      openCustomerDetailsDialog: true,
      isSelected,
      id,
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      primaryMobileNumber: primaryMobileNumber || '',
      secondaryMobileNumber: secondaryMobileNumber || '',
      loyaltyMember,
      region: region || '',
      country: country.name,
      city: city.name,
      emergencyContactName: emergencyContactName || '',
      emergencyContactEmail: emergencyContactEmail || '',
      emergencyContactNumber: emergencyContactNumber || '',
    });
    this.setLocations();
    this.setCityId(city.name);
  };

  handleEditSelectedCustomer = () => {
    this.setState({
      openCustomerDialog: true,
      openCustomerDetailsDialog: false
    });
  };

  validateCustomerDialogInputs = () => {
    const {
      firstName,
      cityId,
      countryId,
      formError,
      serverError,
    } = this.state;
    const isInvalid = !firstName || firstName.length < 3 || !cityId
      || !countryId || formError || serverError;
    return isInvalid;
  };

  formValidation = () => {
    const {
      customers, primaryMobileNumber = 'xxpqlv', email = 'xxpqlv', id
    } = this.state;
    if (customers.some(customer => customer.primaryMobileNumber === primaryMobileNumber
      && customer.id !== id)) {
      this.setState({
        formError: true,
        mobileError: true,
        mobileHelper: 'customer with this number exists'
      });
      return false;
    }
    if (customers.some(customer => customer.email === email
      && customer.id !== id)) {
      this.setState({
        formError: true,
        emailError: true,
        emailHelper: 'customer with this email exists'
      });
      return false;
    }
    return true;
  };

  removeEmptyFields = (obj) => {
    Object.keys(obj).forEach(key => (obj[key] == null || obj[key] === '') && delete obj[key]);
    return obj;
  }

  handleAddCustomerButton = (event, createCustomer, editCustomerBasicProfile) => {
    event.preventDefault();
    const isValidated = this.formValidation();

    isValidated && this.mutateCustomer(createCustomer, editCustomerBasicProfile);
  };

  mutateCustomer = (createCustomer, editCustomerBasicProfile) => {
    const {
      id,
      cityId,
      countryId,
      email,
      emergencyContactEmail,
      emergencyContactName,
      emergencyContactNumber,
      firstName,
      lastName,
      loyaltyMember,
      primaryMobileNumber,
      secondaryMobileNumber,
      isSelected,
    } = this.state;

    const data = {
      cityId,
      countryId,
      email,
      emergencyContactEmail,
      emergencyContactName,
      emergencyContactNumber,
      id,
      firstName,
      lastName,
      loyaltyMember,
      primaryMobileNumber,
      secondaryMobileNumber
    };
    this.removeEmptyFields(data);

    if (!isSelected) {
      createCustomer({
        variables: {
          ...data
        }
      }).then((results) => {
        notify(results.data.createCustomer.message);
        this.setState({
          openCustomerDialog: false
        });
      }).catch((error) => {
        const errMsg = error.message.slice(14);
        notify(errMsg);
        this.setState({
          mobileError: true,
          formError: true,
          mobileHelper: errMsg
        });
        this.handleAddNewCustomer();
      });
    } else {
      editCustomerBasicProfile({
        variables: {
          ...data
        }
      }).then((results) => {
        notify(results.data.editCustomerBasicProfile.message);
        this.setState({
          openCustomerDialog: false,
          isSelected: '',
          id: '',
          email: '',
          emergencyContactEmail: '',
          emergencyContactName: '',
          emergencyContactNumber: '',
          firstName: '',
          lastName: '',
          loyaltyMember: false,
          primaryMobileNumber: '',
          secondaryMobileNumber: '',
        });
      }).catch((error) => {
        const errMsg = error.message.slice(14);
        notify(errMsg);
        this.setState({
          mobileError: true,
          formError: true,
          mobileHelper: errMsg
        });
        this.handleAddNewCustomer();
      });
    }
  };

  setLocations = () => {
    const { countries } = this.props;
    const { country } = this.state;
    let cities;
    let countryId;
    const newCountry = country || 'Nigeria';
    countries && countries.map((item) => {
      if (item.name === newCountry) {
        cities = item.citySet;
        countryId = item.id;
      }
      return cities;
    });
    this.setState({
      country: newCountry,
      countryId,
      countries,
      cities,
    });
  };

  updateItems = itemsArray => itemsArray.map(({
    id, productName, quantity, salesPrice, discount, dispensingSize
  }) => {
    const total = this.calculateTotal(quantity, salesPrice);
    const discountedTotal = this.calculateDiscountedTotal(total, discount);
    return {
      id, productName, quantity, salesPrice, discount, discountedTotal, dispensingSize
    };
  });

  calculateTotal = (quantity, salesPrice) => quantity * salesPrice;

  calculateDiscountedTotal = (salesPrice, discount) => {
    const calculatedDiscount = this.calculateDiscount(salesPrice, discount);
    return (salesPrice - calculatedDiscount);
  }

  calculateDiscount = (salesPrice, discount) => {
    const percentage = 100;
    return (salesPrice * (discount / percentage));
  }

  totalSum = items => items.map(
    ({ discountedTotal }) => discountedTotal
  ).reduce((sum, i) => sum + i, 0);

  renderCartTotal = (cartItems) => {
    const updatedCartItems = this.updateItems(cartItems);
    const total = this.totalSum(updatedCartItems);
    return total;
  };

  renderCartDiscount = (cartItems) => {
    const { discount } = this.state;
    const cartTotal = this.renderCartTotal(cartItems);
    const cartDiscount = this.calculateDiscount(cartTotal, discount);
    return cartDiscount;
  };

  renderGrandTotal = () => {
    const { discount, cartItems } = this.state;
    const cartTotal = this.renderCartTotal(cartItems);
    const cartDiscount = this.calculateDiscount(cartTotal, discount);
    const grandTotal = cartTotal - cartDiscount;
    return grandTotal;
  };

  filterClickedProduct = (cartItem) => {
    const { cartItems } = this.state;
    const step = 1;
    cartItems.map(({ productName, quantity }) => {
      if (productName === cartItem.productName) {
        this.updateQuantityInStock(cartItem, quantity + step);
        return null;
      }
      return cartItem;
    });
  }

  handleClickToAddProduct = (product) => {
    const { cartItems } = this.state;
    const {
      productName,
      salesPrice,
      image,
      dispensingSize,
      quantityInStock
    } = product;
    let { id } = product;
    const newFields = {
      quantity: 1, discount: 0, note: '',
    };
    id = Number(id);
    const cartItem = {
      id, productName, salesPrice, image, dispensingSize, ...newFields
    };

    if (quantityInStock > 0) {
      if (!this.filterClickedProduct(cartItem)) {
        this.setState({
          ...cartItems.unshift(cartItem)
        });
      }
    }
  };

  renderProductCard = (products, currency) => products.map(product => (
    <Grid item key={product.productName} xs={4}>
      <ProductCard
        product={product}
        currency={currency}
        handleClickViewDetails={this.handleClickViewDetails}
        handleClickToAddProduct={this.handleClickToAddProduct}
      />
    </Grid>
  ));

  renderSearchBar = (searchValue) => {
    const { searching } = this.state;

    return (
      <ApolloConsumer>
        {
          client => (
            <Fragment>
              <TextField
                name="searchValue"
                placeholder="Search or scan products...."
                value={searchValue}
                onChange={event => this.handleChange(event, client)}
                variant="filled"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" style={viewProductStyles.searchIcon}>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    searching && <CircularProgress disableShrink />
                  ),
                  classes: {
                    root: viewProductStyles.inputRoot,
                  }
                }}
              />
            </Fragment>
          )}
      </ApolloConsumer>
    );
  };

  switchComponentRendering = () => {
    const {
      searchValue, preferedProducts, currency, filteredProducts
    } = this.state;

    if (searchValue && filteredProducts) {
      return (
        <Grid item xs={12}>
          <Paper
            elevation={0}
            style={viewProductStyles.filteredProductsPaper}
          >
            {
              filteredProducts.length > 0
                ? filteredProducts.map(
                  product => (
                    <SearchList
                      key={product.node.id}
                      id={product.node.name}
                      product={product.node}
                      currency={currency}
                      handleClickToAddProduct={this.handleClickToAddProduct}
                    />
                  )
                )
                : (
                  <div className={viewProductStyles.filteredProducts}>
                    Unable to find products that match
                    {' '}
                    {' '}
                    {searchValue}

                  </div>
                )
            }
          </Paper>
        </Grid>
      );
    }
    return (
      <Fragment>
        <Grid item xs={12} style={viewProductStyles.frequentProducts}>
          <Typography
            variant="inherit"
            style={viewProductStyles.frequentProducts1}
          >
            Frequently Bought Products
          </Typography>
        </Grid>
        <Grid item container spacing={24} xs={12} style={viewProductStyles.renderProductCardGrid}>
          {this.renderProductCard(preferedProducts, currency)}
        </Grid>
      </Fragment>
    );
  };

  handleClickToPay = () => {
    const totalToPay = this.renderGrandTotal();
    this.setState(state => ({
      ...state, openPaymentDialog: true, totalToPay
    }));
  }

  handleClosePaymentDialog = () => {
    this.setState(state => ({
      ...state,
      openPaymentDialog: false,
      cartItems: [],
      mainCartNote: '',
      selectedCustomer: '',
      searchValue: '',
      discount: 0,
      discountValue: '',
      isSelected: '',
      firstName: ''
    }));
  }

  handleBackToSellScreen = () => {
    this.setState(state => ({
      ...state,
      openPaymentDialog: false,
    }));
  }

  static contextType = StateContext;

  render() {
    const { session } = this.props;
    const { me } = session;
    const {
      openPaymentDialog, cartItems, currency,
      totalToPay, discount, mainCartNote, selectedCustomer
    } = this.state;
    return (
      <Fragment>
        {
          openPaymentDialog && (
            <PaymentContainer
              openPaymentDialog={openPaymentDialog}
              products={cartItems}
              currency={currency}
              totalToPay={totalToPay}
              discount={Number(discount)}
              selectedCustomer={selectedCustomer}
              me={me}
              mainCartNote={mainCartNote}
              outletId={me.outlets[0].id}
              handleClosePaymentDialog={this.handleClosePaymentDialog}
              renderCartTotal={this.renderCartTotal}
              renderCartDiscount={this.renderCartDiscount}
              updateItems={this.updateItems}
              handleBackToSellScreen={this.handleBackToSellScreen}
            />

          )
        }
        <SellScreen
          state={this.state}
          handleChange={this.handleChange}
          handleDiscountButton={this.handleDiscountButton}
          renderTableRow={this.renderTableRow}
          handleNoteBackButton={this.handleNoteBackButton}
          handleNoteAddButton={this.handleNoteAddButton}
          handleAddHeldSaleButton={this.handleAddHeldSaleButton}
          handleReturnSaleToCart={this.handleReturnSaleToCart}
          handleCartNoteDialogClose={this.handleCartNoteDialogClose}
          handleHoldNoteInPutChange={this.handleHoldNoteInPutChange}
          handleCustomerInputChange={this.handleCustomerInputChange}
          handleCustomerDialogInPutChange={this.handleCustomerDialogInPutChange}
          handleDiscardSaleButton={this.handleDiscardSaleButton}
          handleHoldSaleButton={this.handleHoldSaleButton}
          handleSalesOnHoldButton={this.handleSalesOnHoldButton}
          handleDiscountClick={this.handleDiscountClick}
          handleDiscountPopperClickAway={this.handleDiscountPopperClickAway}
          handleNotePopperClickAway={this.handleNotePopperClickAway}
          handleCustomerPopperClickAway={this.handleCustomerPopperClickAway}
          handleAddNewCustomer={this.handleAddNewCustomer}
          handleEditSelectedCustomer={this.handleEditSelectedCustomer}
          handleCustomerDialogClose={this.handleCustomerDialogClose}
          renderSingleCustomer={this.renderSingleCustomer}
          handleAddCustomerButton={this.handleAddCustomerButton}
          renderCartTotal={this.renderCartTotal}
          renderCartDiscount={this.renderCartDiscount}
          renderGrandTotal={this.renderGrandTotal}
          validateCustomerDialogInputs={this.validateCustomerDialogInputs}
          setCountries={this.setCountries}
          updateCustomers={this.updateCustomers}
          filterProducts={this.filterProducts}
          renderSearchBar={this.renderSearchBar}
          switchComponentRendering={this.switchComponentRendering}
          handlePrimaryPhoneChange={this.handlePrimaryPhoneChange}
          handleSecondaryPhoneChange={this.handleSecondaryPhoneChange}
          handleContactPhoneChange={this.handleContactPhoneChange}
          handleClickToPay={this.handleClickToPay}
        />
      </Fragment>
    );
  }
}

SellScreenContainer.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.instanceOf(Array),
  customers: PropTypes.instanceOf(Array),
};

SellScreenContainer.defaultProps = {
  session: {},
  countries: [],
  products: [],
  customers: [],
};

export default withAuth(WithInitialData(SellScreenContainer));
