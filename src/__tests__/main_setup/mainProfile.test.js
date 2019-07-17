/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import MainProfile from '../../components/main_setup/mainProfileSetup';
import AdminProfile from '../../components/main_setup/mainProfileAdminUser';
import NormalUserProfile from '../../components/main_setup/mainProfileNormalUser';

describe('Tests that the profile page renders correctly for the Master Admin', () => {
  const dummyAdminSession = {
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
    }
  };

  const dummySession = {
    me: {
      email: 'test2@mail.com',
      firstName: 'test2',
      id: '123456789',
      lastName: 'tester2',
      mobileNumber: '+254717120987',
      role: {
        name: 'Cashier',
        __typename: 'RoleType'
      },
      secondaryEmail: 'njihiadee2@outlook.com',
      secondaryPhoneNumber: '+25471709876',
      username: 'darius2',
    }
  };


  it('Should render the Admin profile', () => {
    const wrapper = shallow(<MainProfile session={dummyAdminSession} />);
    expect(wrapper.find(AdminProfile)).toHaveLength(1);
  });

  it('Should render the Normal User profile', () => {
    const wrapper = shallow(<MainProfile session={dummySession} />);
    expect(wrapper.find(NormalUserProfile)).toHaveLength(1);
  });
});
