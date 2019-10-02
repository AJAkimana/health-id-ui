import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SupplierHeader from '../../../../components/suppliers/Templates/SupplierHeader';

const props = {
  supplier: {
    isApproved: false,
    id: 'AlphaX',
    address: '​​​​​NNPC Towers, Central Business District, Abuja.',
    name: 'Damian Inc',
    mobile: '08137519698',
    rating: '5',
    image:
      'https://justcreative.com/wp-content/uploads/2019/09/brand-strategy-workbook-1.jpg',
    email: 'test@gmail.com',
    tier: 'Manufacturer',
    paymentTerms: 'Daily',
    creditDays: '3 days',
  },
  renderTextField: jest.fn(),
  variables: {},
  classes: {},
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: "Africa/Nairobi"
          }
        }
      }
    }
  }
};

describe('SupplierHeader', () => {
  it('should render the SupplierHeader component properly', () => {
    const setupSupplierHeader = () => {
      const wrapper = shallow(<SupplierHeader {...props} />)
      return wrapper
    }

    let wrapper;
    wrapper = setupSupplierHeader();
    expect(toJson(wrapper)).toMatchSnapshot();
  })
});
