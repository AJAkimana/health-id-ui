import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import MockComponent from '../../../__mocks__/mockComponent';
import toJson from 'enzyme-to-json';
import ProductMenuComingSoon from '../../components/products/productMenuComingSoon';

jest.mock('../../components/products/productMenuComingSoon', () => MockComponent);

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
            name: "Rwanda/Kigali"
          }
        }
      }
    }
  }
};

describe('ProductMenuComingSoon', () => {
  it('renders without crashing', async() => {
    const wrapper = mount(
      <MockedProvider addTypeName={false}>
        <BrowserRouter>
          <ProductMenuComingSoon {...props} />
        </BrowserRouter>
      </MockedProvider>
    );
  
    expect(wrapper).toHaveLength(1);
  });

  it('should render the ProductMenuComingSoon component properly', () => {
      const wrapper = shallow(<ProductMenuComingSoon {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot();
  })
});
