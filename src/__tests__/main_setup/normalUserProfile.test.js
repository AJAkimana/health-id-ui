/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import {
  TextField,
} from '@material-ui/core';
import NormalUserProfile from '../../components/main_setup/mainProfileNormalUser';

describe('Tests that the profile page renders correctly for the Master Admin', () => {
  const dummySession = {
    me: {
      email: 'test@mail.com',
      firstName: 'test',
      id: '1234567',
      lastName: 'tester',
      phone: '+254717123456',
      role: {
        name: 'Cashier',
        __typename: 'RoleType'
      },
      username: 'darius',
      birthday: '5/5/2019',
      jobTitle: 'Chief Cashier',
      weeklyTarget: 15,
      startingDate: '3/2/2018',
    }
  };


  it('Should render the Admin profile data', () => {
    const wrapper = shallow(<NormalUserProfile data={dummySession.me} session={dummySession} />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(TextField)).toHaveLength(10);
    expect(wrapper.find(TextField).at(0).props().value).toBe(dummySession.me.firstName);
    expect(wrapper.find(TextField).at(1).props().value).toBe(dummySession.me.username);
    expect(wrapper.find(TextField).at(2).props().value).toBe(dummySession.me.phone);
    expect(wrapper.find(TextField).at(3).props().value).toBe(dummySession.me.lastName);
    expect(wrapper.find(TextField).at(4).props().value).toBe(dummySession.me.email);
    expect(wrapper.find(TextField).at(5).props().value).toBe(dummySession.me.birthday);
    expect(wrapper.find(TextField).at(6).props().value).toBe(dummySession.me.role.name);
    expect(wrapper.find(TextField).at(7).props().value).toBe(dummySession.me.jobTitle);
    expect(wrapper.find(TextField).at(8).props().value).toBe(dummySession.me.weeklyTarget);
    expect(wrapper.find(TextField).at(9).props().value).toBe(dummySession.me.startingDate);
  });

  it('Should render the navigation links', () => {
    const wrapper = shallow(<NormalUserProfile data={dummySession.me} session={dummySession} />);

    expect(wrapper.find(Link).at(0).props().to).toBe('/main_setup');
    expect(wrapper.find(Link).at(1).props().to).toBe('/main_setup/profile/manage_profile_user');
  });
});
