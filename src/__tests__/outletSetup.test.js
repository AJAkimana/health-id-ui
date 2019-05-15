import React from 'react';
import { shallow } from 'enzyme';
import OutletSetUp from '../components/setup/outletSetup';

const props = {
  state: {
    localGovernmentArea: '',
    city: '',
    cities: [{ id: 'id', name: 'name' }],
    country: '',
    countries: [{ id: 'id', name: 'name' }],
    outletType: 'storefront',
    outletName: 'outletName',
    addressLine1: 'addressLine1',
    addressLine2: '',
    phoneNumber: 123,
    dateLaunched: '',
    registerName: 'registerName',
    formError: '',
    outletsActive: false,
    outletIsLoading: true,
    edittingOutlet: true,
  },
  handleInPutChange: jest.fn(),
  errorHandler: jest.fn(),
  serverErrorHandler: jest.fn(),
  handleReceiptTemplateOpen: jest.fn(),
  handleReceiptTemplateClose: jest.fn(),
  handleTemplateOnChange: jest.fn(),
  handleAddOutletButton: jest.fn(),
  handleAddNewOutletButton: jest.fn(),
  toggleRegisterDisplay: jest.fn(),
  handleOutletEdit: jest.fn(),
  handleOutletDelete: jest.fn(),
};

describe('Render outletSetup component', () => {
  let wrapper = shallow(<OutletSetUp {...props} />);
  it('renders all text fields', () => {
    const textFields = wrapper.find('TextField').length;
    expect(textFields).toBe(9);
  });

  it('renders OutletList component', () => {
    const newProps = { state: { outletsActive: true } };
    wrapper = shallow(<OutletSetUp {...newProps} />);
    expect(wrapper.find('OutletList').length).toBe(1);
  });
});
