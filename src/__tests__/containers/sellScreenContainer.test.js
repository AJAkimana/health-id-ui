import React from 'react';
import { shallow, mount } from 'enzyme';
import wait from 'waait';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import MockComponent from '../../../__mocks__/mockComponent';
import GET_FILTERED_PRODUCTS from '../../queries/filteredProductsQuery';
import PropTypes from 'prop-types';
import { SellScreenContainer } from '../../containers/sellScreenContainer';

import { StateContext } from '../../providers/stateProvider';

jest.mock('../../components/sell/returnTableRow', () => MockComponent);

const context = ['kitty', jest.fn()]

const props = {
  products: [
    { id: 1, productName: 'Panadol', outlet: { outletpreference: { outletCurrency: { symbol: '#' } } } },
    { id: 2, productName: 'Panadol', outlet: { outletpreference: { outletCurrency: { symbol: '#' } } } },
  ],
  session: {
    me: {
      users: [{ id: 1 }],
      activeOutlet: { outletpreference: { outletTimezone: { name: 'Africa/Nairobi' } } }
    }
  },
  countries: [{
    id: 1, name: 'Uganda', citySet: [{ id: '1', name: 'Kampala' }]
  }],
  cities: [{ id: '1', name: 'Kampala' }],
  customers: [{ id: 1, name: 'Ronald' }]
};

describe('SellScreenContainer with InitialData', () => {

  it('renders without crashing', async () => {
    const client = {
      query: ({ }) => jest.fn(),
      watchQuery: jest.fn(),
    }

    const wrapper = mount((
      <BrowserRouter>
        <ApolloProvider client={client}>
          <StateContext.Provider value={context}>
            <SellScreenContainer {...props} />
          </StateContext.Provider>
        </ApolloProvider>
      </BrowserRouter>
    ));
    await wait(0);
  });
});

describe('SellScreenContainer', () => {
  SellScreenContainer.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const wrapper = shallow(
    <SellScreenContainer {...props} />, { context }
  );
  beforeEach(() => {
    wrapper.instance().setState({
      customer: [],
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
  });
  it('handles input change', () => {
    const event = { target: { value: 'self', name: 'buyingForValue' } };
    wrapper.instance().handleChange(event);
    expect(wrapper.state('buyingForValue')).toEqual('self');
  });
  it('does not filter products when searchValue is less than 2 characters', async () => {
    const funcMock = (value) => new Promise((resolve, reject) => {
      if (value.length > 2) {
        resolve([{ name: "name" }]);
      } else {
        reject();
      }
    });
    const client = { query: () => funcMock('t') }
    wrapper.instance().filterProducts(client, 't');
    await wait(0);
    expect(wrapper.instance().state.filteredProducts.length).toBe(0);
  });
  it('filters products when searchValue is more than 2 characters', async () => {
    const mocks = [
      {
        request: {
          query: GET_FILTERED_PRODUCTS
        },
        result: {
          data: {
            filterProducts: {
              edges: [
                {
                  node: {
                    id: "261",
                    productCategory: {
                      name: "pain killer"
                    },
                    productName: "Panadol",
                    dispensingSize: {
                      name: "tablets"
                    },
                    outlet: {
                      outletpreference: {
                        outletCurrency: {
                          symbol: "₦"
                        }
                      }
                    },
                    image: "https://res.cloudinary.com/dojaopytm/image/upload/v1563372103/panadol_ixpcjf.jpg",
                    skuNumber: "000261",
                    description: "Nice meds, they mess you real good",
                    brand: "Stans",
                    manufacturer: "Stans",
                    quantityInStock: 85,
                    salesPrice: 408.0,
                    tags: []
                  }
                }
              ]
            }
          }
        }
      }
    ];
    const funcMock = (value) => new Promise((resolve, reject) => {
      if (value.length > 2) {
        return resolve(
          {
            data: {
              filterProducts: {
                edges: [
                  {
                    node: {
                      id: "261",
                      productCategory: {
                        name: "pain killer"
                      },
                      productName: "Panadol",
                      dispensingSize: {
                        name: "tablets"
                      },
                      outlet: {
                        outletpreference: {
                          outletCurrency: {
                            symbol: "₦"
                          }
                        }
                      },
                      image: "https://res.cloudinary.com/dojaopytm/image/upload/v1563372103/panadol_ixpcjf.jpg",
                      skuNumber: "000261",
                      description: "Nice meds, they mess you real good",
                      brand: "Stans",
                      manufacturer: "Stans",
                      quantityInStock: 85,
                      salesPrice: 408.0,
                      tags: []
                    }
                  }
                ]
              }
            }
          });
      } else {
        reject();
      }
    });
    const client = { query: () => funcMock('pana') }
    wrapper.instance().filterProducts(client, 'pana');
    await wait(0);
    expect(wrapper.instance().state.filteredProducts.length).toBe(1);
  });
  it('handle Discount Button', () => {
    const discountValue = 25;
    wrapper.setState({ discountValue });
    wrapper.instance().handleDiscountButton();
    expect(wrapper.state('discount')).toEqual(discountValue);
  });
  it('render TableRow', () => {
    const item = { id: 1, productName: 'Panadol' };
    wrapper.instance().renderTableRow(item);
  });
  it('handles CartItem Delete', () => {
    const item = { id: 1, productName: 'Panadol' };
    const cartItems = [item];
    wrapper.setState({ cartItems });
    wrapper.instance().handleCartItemDelete(item);
    expect(wrapper.state('cartItems')).toHaveLength(0);
  });
  it('handle CartItem Note', () => {
    const currentTarget = { value: 'good stuff' };
    const event = { currentTarget };
    wrapper.instance().handleCartItemNote(event);
    expect(wrapper.state('productNoteAnchorEl')).toBe(currentTarget);
  });
  it('handle Note back Button', () => {
    wrapper.instance().handleNoteBackButton();
    expect(wrapper.state('openNotePopper')).toBe(false);
  });
  it('handle Note AddButton', () => {
    const id = '1';
    const item = { id: 1, productName: 'Panadol' };
    const cartItems = [item];
    const cartItemNoteValue = 'lovely';
    wrapper.setState({ cartItems, cartItemNoteValue });
    wrapper.instance().handleNoteAddButton(id);
    expect(wrapper.state('cartItems')).toStrictEqual([{
      id: 1, productName: 'Panadol', note: 'lovely'
    }]);
  });
  it('handles note change', () => {
    const event = { target: { value: 'cool', name: 'cartItemNoteValue' } };
    wrapper.instance().handleChange(event);
    expect(wrapper.state('cartItemNoteValue')).toEqual('cool');
  });
  it('handle Add Held Sale Button', () => {
    const cartItems = [{ id: 1, productName: 'Panadol' }];
    const mainCartNote = 'lovely';
    const salesOnHold = [];
    wrapper.setState({ cartItems, mainCartNote, salesOnHold });
    wrapper.instance().handleAddHeldSaleButton();
    expect(wrapper.state('cartItems')).toHaveLength(0);
  });
  it('handle Return Sale To Cart', () => {
    const cartItems = [{ id: 1, productName: 'Panadol' }];
    const mainCartNote = 'lovely';
    wrapper.instance().handleReturnSaleToCart(mainCartNote, cartItems);
    expect(wrapper.state('cartItems')).toStrictEqual([{
      id: 1, productName: 'Panadol'
    }]);
  });
  it('handle Hold  NoteInPut Change', () => {
    const event = { target: { value: 'cool' } };
    wrapper.instance().handleHoldNoteInPutChange(event);
    expect(wrapper.state('mainCartNote')).toEqual('cool');
  });
  it('render Quantity', () => {
    const item = { id: 1, productName: 'Panadol' };
    wrapper.instance().renderQuantity(item);
  });
  it('handle Quantity OnChange with value', () => {
    const event = { target: { value: '5' } };
    const item = { id: 1, productName: 'Panadol' };
    wrapper.instance().handleQuantityOnChange(event, item);
    expect(wrapper.state('cartItems')).toStrictEqual([{
      id: 1, productName: 'Panadol', quantity: 5
    }]);
  });
  it('handle Quantity OnChange with no value', () => {
    const event = { target: { value: '0' } };
    const item = { id: 1, productName: 'Panadol' };
    wrapper.instance().handleQuantityOnChange(event, item);
    expect(wrapper.state('cartItems')).toStrictEqual([{
      id: 1, productName: 'Panadol', quantity: 1
    }]);
  });
  it('handle Quantity Buttons increament', () => {
    const action = 'add';
    const item = { id: 1, productName: 'Panadol', quantity: 5 };
    wrapper.instance().handleQuantityButtons(item, action);
    expect(wrapper.state('cartItems')).toStrictEqual([{
      id: 1, productName: 'Panadol', quantity: 6
    }]);
  });
  it('handle Quantity Buttons decrement', () => {
    const action = 'remove';
    const item = { id: 1, productName: 'Panadol', quantity: 5 };
    wrapper.instance().handleQuantityButtons(item, action);
    expect(wrapper.state('cartItems')).toStrictEqual([{
      id: 1, productName: 'Panadol', quantity: 4
    }]);
  });
  it('handle Quantity Buttons decrement failure', () => {
    const action = 'remove';
    const item = { id: 1, productName: 'Panadol', quantity: 0 };
    wrapper.instance().handleQuantityButtons(item, action);
    expect(wrapper.state('cartItems')).toStrictEqual([{
      id: 1, productName: 'Panadol', quantity: 0
    }]);
  });
  it('handle Customer Input Change', () => {
    const placement = '';
    const event = { currentTarget: '', target: { value: 'John' } };
    wrapper.instance().handleCustomerInputChange(placement)(event);
    expect(wrapper.state('firstName')).toEqual('John');
  });
  it('sets Initials', () => {
    const customer = { firstName: 'John', lastName: 'Paul' };
    wrapper.instance().getInitials(customer);
  });
  it('handle Discard Sale Button', () => {
    const cartItems = [{ id: 1, productName: 'Panadol' }];
    wrapper.setState({ cartItems });
    wrapper.instance().handleDiscardSaleButton();
    expect(wrapper.state('cartItems')).toStrictEqual([]);
  });
  it('handle Hold Sale Button', () => {
    const openHoldSaleDialog = false;
    wrapper.setState({ openHoldSaleDialog });
    wrapper.instance().handleHoldSaleButton();
    expect(wrapper.state('openHoldSaleDialog')).toBe(true);
  });
  it('handle Sales OnHold Button', () => {
    const openSalesOnHoldDialog = false;
    wrapper.setState({ openSalesOnHoldDialog });
    wrapper.instance().handleSalesOnHoldButton();
    expect(wrapper.state('openSalesOnHoldDialog')).toBe(true);
  });
  it('handle Discount Click', () => {
    const placement = '';
    const currentTarget = { id: 'discount-input' };
    const event = { currentTarget };
    wrapper.instance().handleDiscountClick(placement)(event);
    expect(wrapper.state('discountAnchorEl')).toStrictEqual(currentTarget);
  });
  it('handle Discount Click', () => {
    const placement = '';
    const currentTarget = { id: '' };
    wrapper.setState({ discountAnchorEl: '' });
    const event = { currentTarget };
    wrapper.instance().handleDiscountClick(placement)(event);
    expect(wrapper.state('discountAnchorEl')).toStrictEqual('');
  });
  it('handle Discount Popper ClickAway', () => {
    const openDicountPopper = true;
    wrapper.setState({ openDicountPopper });
    wrapper.instance().handleDiscountPopperClickAway();
    expect(wrapper.state('openDicountPopper')).toBe(false);
  });
  it('handle Note Popper ClickAway', () => {
    const openNotePopper = true;
    wrapper.setState({ openNotePopper });
    wrapper.instance().handleNotePopperClickAway();
    expect(wrapper.state('openNotePopper')).toBe(false);
  });
  it('handle Customer Popper ClickAway', () => {
    const openCustomerPopper = true;
    wrapper.setState({ openCustomerPopper });
    wrapper.instance().handleCustomerPopperClickAway();
    expect(wrapper.state('openCustomerPopper')).toBe(false);
  });
  it('handle Add New Customer', () => {
    const openCustomerDialog = false;
    wrapper.setState({ openCustomerDialog });
    wrapper.instance().handleAddNewCustomer();
    expect(wrapper.state('openCustomerDialog')).toBe(true);
  });
  it('handle Customer Dialog Close', () => {
    const openCustomerDialog = true;
    wrapper.setState({ openCustomerDialog });
    wrapper.instance().handleCustomerDialogClose();
    expect(wrapper.state('openCustomerDialog')).toBe(false);
  });
  it('handle Customer Dialog InPut Change for firstName', () => {
    const event = { target: { name: 'firstName', checked: false, value: 'John' } };
    wrapper.instance().handleCustomerDialogInPutChange(event);
    expect(wrapper.state('firstName')).toStrictEqual('John');
  });
  it('handle Customer Dialog InPut Change for loyaltyMember', () => {
    const event = { target: { name: 'loyaltyMember', checked: true } };
    wrapper.instance().handleCustomerDialogInPutChange(event);
    expect(wrapper.state('loyaltyMember')).toStrictEqual(true);
  });
  it('handle Customer Dialog InPut Change for email', () => {
    const event = { target: { name: 'email', checked: false, value: 'john@mail.com' } };
    wrapper.instance().handleCustomerDialogInPutChange(event);
    expect(wrapper.state('emailError')).toStrictEqual(false);
  });
  it('handle Customer Dialog InPut Change for wrong email', () => {
    const event = { target: { name: 'email', checked: false, value: 'john@mail.' } };
    wrapper.instance().handleCustomerDialogInPutChange(event);
    expect(wrapper.state('emailError')).toStrictEqual(true);
  });
  it('handle Customer Dialog InPut Change for primary Mobile Number', () => {
    const event = { target: { name: 'primaryMobileNumber', checked: false, value: '256789339883' } };
    wrapper.instance().handleCustomerDialogInPutChange(event);
    expect(wrapper.state('primaryMobileNumber')).toStrictEqual('256789339883');
  });
  it('handle Customer Dialog InPut Change for secondary Mobile Number', () => {
    const event = { target: { name: 'secondaryMobileNumber', checked: false, value: '256789339883' } };
    wrapper.instance().handleCustomerDialogInPutChange(event);
    expect(wrapper.state('secondaryMobileNumber')).toStrictEqual('256789339883');
  });
  it('handle Customer Dialog InPut Change for country', () => {
    const event = { target: { name: 'country', checked: false, value: 'Uganda' } };
    wrapper.instance().handleCustomerDialogInPutChange(event);
    expect(wrapper.state('country')).toStrictEqual('Uganda');
  });
  it('handle Customer Dialog InPut Change for city', () => {
    const cities = [{ id: '1', name: 'Kampala' }];
    wrapper.setState({ cities });
    const event = { target: { name: 'city', checked: false, value: 'Kampala' } };
    wrapper.instance().handleCustomerDialogInPutChange(event);
    expect(wrapper.state('city')).toStrictEqual('Kampala');
  });
  it('handle Primary Phone Change', () => {
    const value = '0782456734';
    wrapper.instance().handlePrimaryPhoneChange(value);
    expect(wrapper.state('primaryMobileNumber')).toStrictEqual('0782456734');
  });
  it('handle Secondary Phone Change', () => {
    const value = '0782456734';
    wrapper.instance().handleSecondaryPhoneChange(value);
    expect(wrapper.state('secondaryMobileNumber')).toStrictEqual('0782456734');
  });
  it('handle Contact Phone Change', () => {
    const value = '0782456734';
    wrapper.instance().handleContactPhoneChange(value);
    expect(wrapper.state('emergencyContactNumber')).toStrictEqual('0782456734');
  });
  it('handle setLocale', () => {
    const value = 'Uganda';
    wrapper.setState({ city: '' });
    wrapper.instance().setLocale(value);
    expect(wrapper.state('city')).toStrictEqual('Kampala');
  });
  it('handle setLocale with undefined value', () => {
    const value = 'Jambolee';
    wrapper.setState({ city: '' });
    wrapper.instance().setLocale(value);
    expect(wrapper.state('city')).toStrictEqual('');
  });
  it('handle setCityId', () => {
    const value = 'Kampala';
    wrapper.setState({ cityId: '' });
    wrapper.instance().setCityId(value);
    expect(wrapper.state('cityId')).toStrictEqual(1);
  });
  it('handle setCityId with undefined value', () => {
    const value = '';
    wrapper.setState({ cityId: '' });
    wrapper.instance().setCityId(value);
    expect(wrapper.state('cityId')).toStrictEqual('');
  });
  it('handle updateCustomers on create', () => {
    const cache = {};
    const customers = [{ id: 1 }, { id: 2 }];
    wrapper.setState({ isSelected: false, customers, });
    const data = { data: { createCustomer: { customer: { id: 3 } } } };
    wrapper.instance().updateCustomers(cache, data);
    expect(wrapper.state('customers')).toHaveLength(3);
  });
  it('handle updateCustomers on edit', () => {
    const cache = {};
    wrapper.setState({ isSelected: true, });
    const data = { data: { editCustomerBasicProfile: { customer: { id: 3 } } } };
    wrapper.instance().updateCustomers(cache, data);
    expect(wrapper.state('customers')).toHaveLength(3);
  });
  it('render Single Customer', () => {
    const customer = { id: 1, name: 'John' };
    const isSelected = '';
    wrapper.instance().renderSingleCustomer(customer, isSelected);
    expect(wrapper.state('firstName')).toStrictEqual('');
  });
  it('removes Selected Customer', () => {
    wrapper.instance().removeSelectedCustomer();
    expect(wrapper.state('firstName')).toStrictEqual('');
  });
  it('handles Display Selected Customer', () => {
    const customer = {
      id: 1,
      firstName: '',
      lastName: '',
      email: '',
      primaryMobileNumber: '',
      secondaryMobileNumber: '',
      region: '',
      loyaltyMember: true,
      city: { name: '' },
      country: { id: 1, name: '' },
      emergencyContactName: '',
      emergencyContactEmail: '',
      emergencyContactNumber: '',
    };
    const isSelected = true;
    wrapper.setState({ selectedCustomer: '' });
    wrapper.instance().handleDisplaySelectedCustomer(customer, isSelected);
    expect(wrapper.state('selectedCustomer')).toStrictEqual(customer);
  });
  it('validates  CustomerDialog Inputs', () => {
    wrapper.setState({
      firstName: 'jonnie',
      cityId: '',
      countryId: 1,
      formError: false,
      serverError: false,
    });
    wrapper.instance().validateCustomerDialogInputs();
    expect(wrapper.state('firstName')).toStrictEqual('jonnie');
  });
  it('validates form wiht mobile number', () => {
    wrapper.setState({
      customers: [{
        id: 1,
        primaryMobileNumber: '223',
        email: ''
      }],
      primaryMobileNumber: '223',
      email: '',
      id: 3
    });
    wrapper.instance().formValidation();
    expect(wrapper.state('mobileHelper')).toStrictEqual('customer with this number exists');
  });
  it('validates form with email', () => {
    wrapper.setState({
      customers: [{
        id: 1,
        primaryMobileNumber: '223',
        email: 'jo@oj.net'
      }],
      primaryMobileNumber: '998',
      email: 'jo@oj.net',
      id: 3
    });
    wrapper.instance().formValidation();
    expect(wrapper.state('mobileError')).toStrictEqual(true);
  });
  it('validates form with no matches', () => {
    wrapper.setState({
      customers: [{
        id: 1,
        primaryMobileNumber: '223',
        email: 'jo@oj.net'
      }],
      primaryMobileNumber: '998',
      email: 'jo@oj.net',
      id: 1
    });
    wrapper.instance().formValidation();
    expect(wrapper.state('formError')).toStrictEqual(true);
  });
  it('removes Empty Fields', () => {
    const obj = {
      id: 1,
      firstName: 'lolo',
      lastName: 'jp',
      email: '',
      primaryMobileNumber: '',
    };
    wrapper.instance().removeEmptyFields(obj);
    expect(wrapper.state('formError')).toStrictEqual(true);
  });
  it('handles edit Customer Button without error', () => {
    wrapper.setState({ isSelected: true });
    const results = { data: { editCustomerBasicProfile: { message: '' } } };
    const event = {
      preventDefault: jest.fn()
    };
    const createCustomer = jest.fn();
    const editCustomerBasicProfile = jest.fn().mockResolvedValue(results);
    wrapper.instance().handleAddCustomerButton(event, createCustomer, editCustomerBasicProfile);
    expect(wrapper.state('openCustomerDialog')).toStrictEqual(false);
  });
  it('handles edit Customer Button with error', () => {
    wrapper.setState({ isSelected: true });
    const error = { message: 'Async error' };
    const event = {
      preventDefault: jest.fn()
    };
    const createCustomer = jest.fn();
    const editCustomerBasicProfile = jest.fn().mockRejectedValueOnce(new Error(error));
    wrapper.instance().handleAddCustomerButton(event, createCustomer, editCustomerBasicProfile);
    expect(wrapper.state('openCustomerPopper')).toStrictEqual(false);
  });
  it('handles add Customer Button without error', () => {
    wrapper.setState({ isSelected: false });
    const results = { data: { createCustomer: { message: '' } } };
    const event = {
      preventDefault: jest.fn()
    };
    const createCustomer = jest.fn().mockResolvedValue(results);
    const editCustomerBasicProfile = jest.fn();
    wrapper.instance().handleAddCustomerButton(event, createCustomer, editCustomerBasicProfile);
    expect(wrapper.state('openCustomerDialog')).toStrictEqual(false);
  });
  it('handles add Customer Button with error', () => {
    wrapper.setState({ isSelected: false });
    const error = { message: 'Async error' };
    const event = {
      preventDefault: jest.fn()
    };
    const createCustomer = jest.fn().mockRejectedValueOnce(new Error(error));
    const editCustomerBasicProfile = jest.fn();
    wrapper.instance().handleAddCustomerButton(event, createCustomer, editCustomerBasicProfile);
    expect(wrapper.state('openCustomerPopper')).toStrictEqual(false);
  });
  it('handles set Locations', () => {
    wrapper.setState({ country: 'Uganda' });
    wrapper.instance().setLocations();
    expect(wrapper.state('country')).toStrictEqual('Uganda');
  });
  it('handles update Items', () => {
    const spy = jest.spyOn(wrapper.instance(), 'calculateTotal');
    const itemsArray = [{
      id: 1,
      productName: 'John',
      quantity: 2,
      salesPrice: 10,
      discount: 5
    }];
    wrapper.instance().updateItems(itemsArray);
    expect(spy).toHaveBeenCalled();
  });
  it('handles Cart Total', () => {
    const spy = jest.spyOn(wrapper.instance(), 'totalSum');
    const cartItems = [{
      discountedTotal: [10, 20]
    }];
    wrapper.instance().renderCartTotal(cartItems);
    expect(spy).toHaveBeenCalled();
  });
  it('render Cart Discount', () => {
    const spy = jest.spyOn(wrapper.instance(), 'renderCartTotal');
    const cartItems = [{
      discountedTotal: [10, 20]
    }];
    wrapper.instance().renderCartDiscount(cartItems);
    expect(spy).toHaveBeenCalled();
  });
  it('render Grand Total', () => {
    const spy = jest.spyOn(wrapper.instance(), 'renderCartTotal');
    const cartItems = [{
      discountedTotal: [10, 20]
    }];
    wrapper.setState({
      discount: 10,
      cartItems
    });
    wrapper.instance().renderGrandTotal();
    expect(spy).toHaveBeenCalled();
  });
  it('filter Clicked Product with same product', () => {
    const spy = jest.spyOn(wrapper.instance(), 'updateQuantityInStock');
    const cartItem = {
      productName: 'Panadol',
      quantity: 10
    };
    const cartItems = [
      cartItem
    ];
    wrapper.setState({ cartItems });
    wrapper.instance().filterClickedProduct(cartItem);
    expect(spy).toHaveBeenCalled();
  });
  it('filter Clicked Product with different product', () => {
    const cartItem = {
      productName: 'Panadol',
      quantity: 10
    };
    wrapper.setState({ cartItem });
    const cartItems = [{
      productName: 'Aspirin',
      quantity: 1
    }];
    wrapper.setState({ cartItems });
    wrapper.instance().filterClickedProduct(cartItem);
    expect(wrapper.state('cartItem')).toBeTruthy();
  });
  it('handles Click To Add a Product', () => {
    const spy = jest.spyOn(wrapper.instance(), 'filterClickedProduct');
    const product = {
      productName: 'Panadol',
      salesPrice: 10,
      image: '',
      dispensingSize: 'packets'
    };
    const cartItem = {
      productName: 'Panadol',
      quantity: 10
    };
    const cartItems = [cartItem];
    wrapper.setState({ cartItems });
    setTimeout(() => {
      wrapper.instance().handleClickToAddProduct(product);
      expect(spy).toHaveBeenCalled();
    }, 20);

  });
  it('render Product Card', () => {
    const products = [{ id: 1, productName: 'Panadol' }];
    const currency = '';
    wrapper.instance().renderProductCard(products, currency);
    expect(wrapper.state('products')).toBeTruthy();
  });
  it('switch Component Rendering with search value', async () => {
    const funcMock = (value) => new Promise((resolve, reject) => {
      if (value.length > 2) {
        resolve([{ name: "name" }]);
      } else {
        reject();
      }
    });
    const client = { query: () => funcMock('pan') }
    const spy = jest.spyOn(wrapper.instance(), 'filterProducts');
    const event = { target: { name: 'searchValue', value: 'pan' } };

    wrapper.instance().handleChange(event, client);
    expect(spy).toHaveBeenCalled();
  });
});
