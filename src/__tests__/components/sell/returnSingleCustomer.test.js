import React from 'react';
import { mount } from 'enzyme';
import stringToColor from '../../../components/utils/stringToColor';
import ReturnSingleCustomer from '../../../components/sell/returnSingleCustomer';

const props = {
  customer: {
    firstName: 'Paul',
    lastName: '',
    primaryMobileNumber: '',
  },
  isSelected: '',
  handleDisplaySelectedCustomer: jest.fn(),
  stringToColor,
  getInitials: jest.fn(),
  removeSelectedCustomer: jest.fn(),
};
describe('test ReturnSingleCustomer component', () => {
  let wrapper;
  it('it renders ReturnSingleCustomer component', () => {
    wrapper = mount((
      <ReturnSingleCustomer {...props} />
    ));
    const listItem = wrapper.find('ListItem').length;
    expect(listItem).toBe(1);
  });
});
