import React from 'react';
import { shallow } from 'enzyme';
import BusinessSetUp from '../components/setup/businessSetup';

const props = {
  state: {
    legalName: '',
    tradingName: '',
    email: '',
    address: '',
    phoneNumber: '',
    website: '',
    twitter: '',
    instagram: '',
    logo: '',
    facebook: '',
    isError: '',
  },
  handleInputChange: jest.fn(),
  checked: jest.fn(),
  errorHandler: jest.fn(),
  serverErrorHandler: jest.fn(),
  handleImageDrop: jest.fn(),
  onSelectFile: jest.fn(),
  onCropChange: jest.fn(),
  handleClose: jest.fn(),
  handleSave: jest.fn(),
};

describe('Render businessSetup component', () => {
  it('renders nine text fields', () => {
    const wrapper = shallow(<BusinessSetUp {...props} />);
    const textFields = wrapper.find('TextField').length;
    expect(textFields).toBe(13);
  });
});
