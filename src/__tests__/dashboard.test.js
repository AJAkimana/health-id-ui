import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import SVGIcon from '../components/shared/Dashboard/Icons';
import { Dashboard } from '../components/shared/Dashboard/Dashboard';
import GET_USER_INFO from '../queries/userDataQuery';

const event = {
  currentTarget: 'target'
};

const event1 = {
  currentTarget: {
    id: 'grid1'
  }
};
const event2 = {
  currentTarget: {
    id: 'grid2'
  }
};

const event3 = {
  currentTarget: {
    id: 'grid3'
  }
};

const event4 = {
  currentTarget: {
    id: 'grid4'
  }
};

const event5 = {
  currentTarget: {
    id: 'grid5'
  }
};

const event6 = {
  currentTarget: {
    id: 'grid6'
  }
};

const event7 = {
  currentTarget: {
    id: 'grid7'
  }
};

const event8 = {
  currentTarget: {
    id: 'grid8'
  }
};

const event9 = {
  currentTarget: {
    id: 'grid9'
  }
};

const mocks = [
  {
    request: {
      query: GET_USER_INFO,
    },
    userData: {
      me: {
        mobileNumber: '256704505050',
        email: 'example@gmail.com',
        username: 'myth',
        role: { name: 'Master Admin' },
      }
    },
  }
];

const props = {
  history: { push: jest.fn()},
  session: {
    me: {
      mobileNumber: '256704505050',
      email: 'example@gmail.com',
      username: 'myth',
      role: { name: 'Master Admin' },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: "Africa/Nairobi"
          }
        }
      }
    },
  }
};

describe('Render Dashboard component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount((
      <Router>
      <MockedProvider mocks={mocks} addTypename>
        <Dashboard {...props} />
        </MockedProvider>
        </Router>
    ));
  });

  it('invokes handleClose method and sets state', () => {
    wrapper.find('Dashboard').instance().handleClose(event);
    expect(wrapper.find('Dashboard').instance().state.anchorEl).toBeFalsy();
  });

  it('invokes handleOnClick method with a truthy isActive state property and sets state', () => {
    wrapper.find('Dashboard').instance().handleOnClick(event);
    expect(wrapper.find('Dashboard').instance().state.isActive).toBeFalsy();
  });

  it('invokes handleOnClick method with a falsy isActive perform a switch to update state property and sets state', () => {
    wrapper.find('Dashboard').instance().setState({ isActive: '' });
    wrapper.find('Dashboard').instance().handleOnClick(event1);
    expect(wrapper.find('Dashboard').instance().state.isActive).toBeTruthy();
    wrapper.find('Dashboard').instance().handleOnClick(event2);
    expect(wrapper.find('Dashboard').instance().state.isActive).toEqual('grid2');
    wrapper.find('Dashboard').instance().handleOnClick(event3);
    expect(wrapper.find('Dashboard').instance().state.isActive).toEqual('grid3');
    wrapper.find('Dashboard').instance().handleOnClick(event4);
    expect(wrapper.find('Dashboard').instance().state.isActive).toEqual('grid4');
    wrapper.find('Dashboard').instance().handleOnClick(event5);
    expect(wrapper.find('Dashboard').instance().state.isActive).toEqual('grid5');
    wrapper.find('Dashboard').instance().handleOnClick(event6);
    expect(wrapper.find('Dashboard').instance().state.isActive).toEqual('grid6');
    wrapper.find('Dashboard').instance().handleOnClick(event7);
    expect(wrapper.find('Dashboard').instance().state.isActive).toEqual('grid7');
    wrapper.find('Dashboard').instance().handleOnClick(event8);
    expect(wrapper.find('Dashboard').instance().state.isActive).toEqual('grid8');
    wrapper.find('Dashboard').instance().handleOnClick(event9);
    expect(wrapper.find('Dashboard').instance().state.isActive).toEqual('grid9');
  });
});

describe('Test icon functions', () => {
  it('renders a customer icon', () => {
    shallow(<SVGIcon name="Customer" style={{}} fill="" />);
  });

  it('renders a product icon', () => {
    shallow(<SVGIcon name="Product" style={{}} fill="" />);
  });

  it('renders a Cash icon', () => {
    shallow(<SVGIcon name="Cash" style={{}} fill="" />);
  });

  it('renders a Dashboard icon', () => {
    shallow(<SVGIcon name="Dashboard" style={{}} fill="" />);
  });

  it('renders a Report icon', () => {
    shallow(<SVGIcon name="Report" style={{}} fill="" />);
  });

  it('renders a Sell icon', () => {
    shallow(<SVGIcon name="Sell" style={{}} fill="" />);
  });

  it('renders a Settings icon', () => {
    shallow(<SVGIcon name="Settings" style={{}} fill="" />);
  });

  it('renders a Suppliers icon', () => {
    shallow(<SVGIcon name="Suppliers" style={{}} fill="" />);
  });

  it('renders a Team icon', () => {
    shallow(<SVGIcon name="Team" style={{}} fill="" />);
  });

  it('renders the default path if no matching name is passed', () => {
    shallow(<SVGIcon name="No match" style={{}} fill="" />);
  });
});
