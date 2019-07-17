/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import {
  Table,
  TableRow,
} from '@material-ui/core';
import { MainBusinessList } from '../../components/main_setup/mainBusinessList';

describe('Business List tests', () => {
  it('Should render a table with a list of the businesses', () => {
    const data = [
      {
        id: '1',
        legalName: 'Business 1',
        email: 'business1@mail.com'
      },
      {
        id: '2',
        legalName: 'Business 2',
        email: 'business2@mail.com'
      }
    ];
    const wrapper = shallow(<MainBusinessList businessList={data} />);

    expect(wrapper.exists());
    expect(wrapper.find(Table)).toBeTruthy();
    expect(wrapper.find(TableRow)).toHaveLength(data.length);
  });

  it('Should return null if businesses list not provided', () => {
    const data=[]
    const wrapper = shallow(<MainBusinessList businessList={data} />);

    expect(wrapper.exists());
    expect(wrapper.find(TableRow)).toHaveLength(data.length);
  });
});
