/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import _ from '../../../__mocks__/mockUseContext';
import { MainSetup } from '../../components/main_setup/mainBusinessSetup';

beforeEach(() => {
  const useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
})

describe('Main Business Setup', () => {
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
      businesses: [{}, {}],
    }
  };

  it('Should render the Business List', () => {
    const wrapper = shallow(<MainSetup session={dummySession} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Link').length).toBe(1);
  });
});
