import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SupplierCommentary from '../../../../components/suppliers/Templates/SupplierCommentary';

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

describe('SupplierCommentary', () => {
  it('should render the SupplierCommentary component properly', () => {
    const setupSupplierCommentary = () => {
      const wrapper = shallow(<SupplierCommentary {...props} />)
      return wrapper
    }

    let wrapper;
    wrapper = setupSupplierCommentary();
    expect(toJson(wrapper)).toMatchSnapshot();
  })
});
