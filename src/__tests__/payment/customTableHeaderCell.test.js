import React from 'react';
import { shallow } from 'enzyme';
import { TableCell } from '@material-ui/core';
import CustomTableHeaderCell from '../../components/payment/customTableHeaderCell';

describe('test CustomTableHeaderCell component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = shallow((
      <CustomTableHeaderCell />
    ));
    expect(wrapper.find(TableCell).length).toBe(1);
  });
});
