import React from 'react';
import { shallow } from 'enzyme';
import SupplierForm from '../../../../components/suppliers/AddSupplier/SupplierForm';

describe('Render Supplier Form component', () => {
  const props = {
    state: {
      name: '',
      email: '',
      mobileNumber: '',
      addressLine1: '',
      addressLine2: '',
      lga: '',
      commentary: '',
      countryValue: '',
      cities: '',
      cityValue: '',
      cityId: '',
      tierId: '',
      logo: '',
      paymentTermsId: '1',
      creditDays: '',
      loading: false,
      imageFile: '',
      fileName: '',
      src: null,
      crop: {
        aspect: 1 / 1
      },
      open: false
    },
    initialData: {
      outlet: {
        city: {
          id: '4',
          name: 'Lagos',
          country: {
            name: 'Nigeria_2019-09-04 14:29:24.435848+00:00'
          }
        }
      },
      countries: [
        {
          id: '4',
          name: 'South Sudan',
          citySet: [
            {
              id: '10',
              name: 'Juba'
            },
            {
              id: '11',
              name: 'Yambio'
            }
          ]
        },
        {
          id: '9',
          name: 'Nigeria',
          citySet: [
            {
              id: '19',
              name: 'Ido'
            },
            {
              id: '20',
              name: 'Lagos'
            },
            {
              id: '21',
              name: 'Abuja'
            }
          ]
        },
        {
          id: '11',
          name: 'Kenya',
          citySet: [
            {
              id: '22',
              name: 'Nairobi'
            },
            {
              id: '23',
              name: 'Mombasa'
            },
            {
              id: '24',
              name: 'Kitui'
            }
          ]
        }
      ]
    },
    handleChange: jest.fn(),
    handleAddition: jest.fn(),
    handleDelete: jest.fn(),
    onDrop: jest.fn(),
    handleFile: jest.fn(),
    handleOnCropChange: jest.fn(),
    handleOnDrop: jest.fn(),
    onSelectFile: jest.fn(),
    handleClose: jest.fn(),
    handleSave: jest.fn(),
    handleAddAnotherSupplier: jest.fn(),
    handleSendForApproval: jest.fn(),
    handleTierChange: jest.fn(),
    handleCountryChange: jest.fn(),
    handleCityChange: jest.fn(),
    handleMobileChange: jest.fn(),
    handleEmailChange: jest.fn()
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<SupplierForm {...props} />);
    const phoneInput = wrapper.find('PhoneInput');
    expect(wrapper.find('ImageUpload').length).toBe(1);
    expect(wrapper.find('ActionButtons').length).toBe(1);
  });

  it('renders with filled select fields without crashing ', () => {
    const wrapper = shallow(<SupplierForm {...props} />);
    expect(wrapper.find('ImageUpload').length).toBe(1);
    expect(wrapper.find('ActionButtons').length).toBe(1);
  });
});
