import React from 'react';
import { shallow } from 'enzyme';
import FieldsTable from '../../../../components/suppliers/Templates/ImportSuppliers/FieldsTable';


describe('Render FieldsTable component', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<FieldsTable />);
    expect(wrapper.find('div').length).toBe(14);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('.fields-title').length).toBe(1);
    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('.fields-table').length).toBe(1);
   
  });
});
