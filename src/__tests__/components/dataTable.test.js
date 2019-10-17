import React from 'react';
import { shallow } from 'enzyme';
import DataTable from '../../components/dataTable/dataTable';

describe('DataTable', () => {
  it('renders without crashing', () => {
    const props = {
      title: {},
      data: {},
      columns: {},
      options: {}
    };

    const wrapper = shallow(<DataTable {...props} />);
    expect(wrapper.find('MuiThemeProviderOld').length).toBe(1);
  });
});
