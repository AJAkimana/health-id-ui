import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import MockComponent from '../../../__mocks__/mockComponent';
import toJson from 'enzyme-to-json';
import ComingSoon from '../../components/shared/ComingSoon';

jest.mock('../../components/shared/ComingSoon', () => MockComponent);

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

describe('ComingSoon', () => {
  it('renders without crashing', async() => {
    const wrapper = mount(
      <MockedProvider addTypeName={false}>
        <BrowserRouter>
          <ComingSoon {...props} />
        </BrowserRouter>
      </MockedProvider>
    );
  
    expect(wrapper).toHaveLength(1);
  });

  it('should render the ComingSoon component properly', () => {
    const setupComingSoon = () => {
      const wrapper = shallow(<ComingSoon {...props} />)
      return wrapper
    }

    let wrapper;
    wrapper = setupComingSoon();
    expect(toJson(wrapper)).toMatchSnapshot();
  })
});
