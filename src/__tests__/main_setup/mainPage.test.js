/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import MainSetup from '../../components/main_setup/mainSetup';

describe('Tests that the main settings page is rendered', () => {
  it('Should render the component', () => {
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

    const wrapper = shallow(<MainSetup session={dummySession} />);
    expect(wrapper.exists()).toBe(true);
  });
});
