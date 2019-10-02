import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SingleSupplierPageLoader from '../../../../components/suppliers/Templates/SingleSupplierPageLoader';

const props = {
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

describe('SingleSupplierPageLoader', () => {
  it('should render the SingleSupplierPageLoader component properly', () => {
    const setupSingleSupplierPageLoader = () => {
      const wrapper = shallow(<SingleSupplierPageLoader {...props} />)
      return wrapper
    }

    let wrapper;
    wrapper = setupSingleSupplierPageLoader();
    expect(toJson(wrapper)).toMatchSnapshot();
  })
});
