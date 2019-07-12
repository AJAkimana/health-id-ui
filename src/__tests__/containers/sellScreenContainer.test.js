import React from 'react';
import { shallow, mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import MockComponent from '../../../__mocks__/mockComponent';
import SellScreenContainerData, { SellScreenContainer } from '../../containers/sellScreenContainer';
import GET_USER_INFO from '../../queries/userDataQuery';
import GET_ALL_COUNTRIES from '../../queries/countryQuery';
import APPROVED_PRODUCTS_QUERY from '../../queries/approvedProductQuery';
import GET_ALL_CUSTOMERS from '../../queries/customersQuery';

jest.mock('../../components/sell/returnTableRow', () => MockComponent);

const props = {
  products: [
    { id: 1, productName: 'Panadol', outlet: [{ outletpreference: { outletCurrency: 'symbol' } }] },
    { id: 2, productName: 'Panadol', outlet: [{ outletpreference: { outletCurrency: 'symbol' } }] },
  ],
  session: {
    me: {
      users: [{ id: 1 }]
    }
  },
  countries: [{
    id: 1, name: 'Uganda', citySet: [{ id: '1', name: 'Kampala' }]
  }],
  cities: [{ id: '1', name: 'Kampala' }],
  customers: [{ id: 1, name: 'Ronald' }]
};

describe('SellScreenContainer with InitialData', () => {
  const authMocks = [
    {
      request: { query: GET_USER_INFO },
      result: {
        data: {
          me: {
            id: 'aul5xrp73',
            email: 'you.for@example.com',
            mobileNumber: '07834562781',
            username: 'Ronnie',
            role: {
              name: 'Master Admin',
              __typename: '',
            },
            users: [{
              id: 1,
              __typename: '',
            }],
            __typename: ''
          },
        }
      },
    },
  ];

  const mocks = [
    {
      request: { query: GET_ALL_COUNTRIES },
      result: {
        data: {
          countries: [{
            id: '4',
            name: 'South Sudan',
            citySet: [{ id: '10', name: 'Juba', __typename: '' }],
            __typename: ''
          }],
        },
      },
    },
    {
      request: { query: APPROVED_PRODUCTS_QUERY },
      result: {
        data: {
          approvedProducts: [{
            outlet: [{
              outletpreference: {
                outletCurrency: {
                  symbol: '₦'
                }
              }
            }],
            brand: 'ventolinlike',
            description: '',
            id: '39',
            image: '',
            loyaltyWeight: 0,
            manufacturer: 'vpn',
            measurementUnit: { name: 'syrup', __typename: '' },
            nearestExpiryDate: '2019-12-09',
            productCategory: { name: 'prescription', __typename: '' },
            productName: 'podophyllon',
            productQuantity: null,
            salesPrice: 1000,
            skuNumber: '000039',
            tags: ['painkillers', 'panadol'],
            vatStatus: 'VAT',
            __typename: ''
          }],
        },
      },
    },
    {
      request: { query: GET_ALL_CUSTOMERS },
      result: {
        data: {
          customers: [{
            addressLine1: null,
            city: { id: '6', name: 'Abuja', __typename: '' },
            country: { id: '3', name: 'Nigeria', __typename: '' },
            email: 'jimmychu@mailinator.net',
            emergencyContactEmail: null,
            emergencyContactName: null,
            emergencyContactNumber: null,
            firstName: 'Jimmy',
            id: '48',
            lastName: 'Chu',
            localGovernmentArea: null,
            loyaltyMember: false,
            primaryMobileNumber: '256784498389',
            secondaryMobileNumber: '256784498389',
            __typename: ''
          }],
        },
      },
    },
  ];
  it('renders without crashing', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks}>
        <MockedProvider mocks={authMocks}>
          <BrowserRouter>
            <SellScreenContainerData />
          </BrowserRouter>
        </MockedProvider>
      </MockedProvider>
    ));
    await wait(0);
  });
});

describe('SellScreenContainer', () => {
  const wrapper = shallow(
    <SellScreenContainer {...props} />
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
  it('filter Products', () => {
    const spy = jest.spyOn(wrapper.instance(), 'renderCartTotal');
    const products = [{
      productName: 'Panadol',
      productCategory: {},
      skuNumber: '098',
      tags: 'panadol'
    }];
    wrapper.setState({
      products,
      searchValue: 'Panadol'
    });
    wrapper.instance().filterProducts();
    expect(wrapper.state('searchValue')).toBeTruthy();
  });
  it('filter Clicked Product with same product', () => {
    const spy = jest.spyOn(wrapper.instance(), 'updateProductQuantity');
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
      measurementUnit: 'packets'
    };
    const cartItem = {
      productName: 'Panadol',
      quantity: 10
    };
    const cartItems = [cartItem];
    wrapper.setState({ cartItems });
    wrapper.instance().handleClickToAddProduct(product);
    expect(spy).toHaveBeenCalled();
  });
  it('render Product Card', () => {
    const products = [{ id: 1, productName: 'Panadol' }];
    const currency = '';
    wrapper.instance().renderProductCard(products, currency);
    expect(wrapper.state('products')).toBeTruthy();
  });
  it('render Search Bar', () => {
    const searchValue = 'pana';
    const classes = {};
    wrapper.instance().renderSearchBar(classes, searchValue);
    expect(wrapper.state('searchValue')).toBeTruthy();
  });
  it('switch Component Rendering with search value', () => {
    const spy = jest.spyOn(wrapper.instance(), 'filterProducts');
    const classes = {};
    wrapper.setState({
      searchValue: 'pana',
      preferedProducts: [],
      currency: ''
    });
    wrapper.instance().switchComponentRendering(classes);
    expect(spy).toHaveBeenCalled();
  });
  it('switch Component Rendering without search value', () => {
    const spy = jest.spyOn(wrapper.instance(), 'filterProducts');
    const classes = {};
    wrapper.setState({
      searchValue: '',
      preferedProducts: [],
      currency: ''
    });
    wrapper.instance().switchComponentRendering(classes);
    expect(spy).toHaveBeenCalled();
  });
});
