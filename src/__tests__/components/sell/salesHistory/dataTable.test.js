import React from 'react';
import { shallow, mount } from 'enzyme';
import DataTable from '../../../../components/sell/salesHistory/dataTable';

const props = {
  state: {
    initialData: null,
    salesData: [{
      id: 1,
      dateSold: new Date(),
      timeSold: '00:00',
      location: '',
      soldBy: '',
      receiptId: 11,
      soldTo: '',
    }],
    openSearchPopper: false,
    searchPopperAnchorEl: null,
  },
  title: '',
  columns: [],
  handleSalesSearch: jest.fn(),
  handleDateTimeFilter: jest.fn(),
  handleSearchFilter: jest.fn(),
  handleResetSales: jest.fn(),
  event: { target: { value: '' } },
};
describe('dataTable component', () => {
  let wrapper;
  it('renders the dataTable component', () => {
    wrapper = shallow((
      <DataTable {...props} />
    ));
    const fragment = wrapper.find('Fragment').length;
    expect(fragment).toBe(1);
  });
});
