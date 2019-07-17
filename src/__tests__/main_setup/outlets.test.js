/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom'; 
import { shallow } from 'enzyme';
import { MainSetup } from '../../components/main_setup/mainSetup';

describe('Tests that the main settings page is rendered', () => {
  const dummySession = {
    me: {
      email: 'test@mail.com',
      firstName: 'test',
      id: '1234567',
      lastName: 'tester',
      mobileNumber: '+254717123456',
      role: {
        name: 'Master Admin',
        __typename: 'RoleType'
      },
      secondaryEmail: 'njihiadee@outlook.com',
      secondaryPhoneNumber: '+254717123456',
      username: 'darius',
      users: [{}, {}],
    }
  };

  it('Should render the component', () => {
    const wrapper = shallow(<MainSetup session={dummySession} classes={{}} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render the link to the outlets and registers', () => {
    // The page has four link elements
    // The first link goes back to the user profile settings (index 0)
    // The second goes to the business information (index 1)
    // The third goes to the outlets and registers (index 2)
    // The fourth goes to the users view
    const wrapper = shallow(<MainSetup session={dummySession} classes={{}} />);
    expect(wrapper.find(Link)).toHaveLength(4);
    expect(wrapper.find(Link).at(0).props().to).toEqual('/main_setup/profile');
    expect(wrapper.find(Link).at(1).props().to).toEqual('/main_setup/business_information');
    expect(wrapper.find(Link).at(2).props().to).toEqual('/main_setup/outlets_registers');
  });
});
