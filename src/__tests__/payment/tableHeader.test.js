import React from 'react';
import { shallow } from 'enzyme';
import { Table, TableRow } from '@material-ui/core';
import RenderTableHeader from '../../components/payment/tableHeader';

describe('test RenderTableHeader component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = shallow((
      <RenderTableHeader />
    ));
    expect(wrapper.find(Table).length).toBe(1);
    expect(wrapper.find(TableRow).length).toBe(1);
  });
});
