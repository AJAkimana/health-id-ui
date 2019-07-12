import React from 'react';
import { shallow } from 'enzyme';
import { SalesHistoryDetails } from '../../../../components/sell/salesHistory/salesHistoryDetails';

const props = {
  state: {
    initialData: null,
    salesData: [{}],
    openSearchPopper: false,
    searchPopperAnchorEl: null,
  },
  classes: {},
  handleSalesSearch: jest.fn(),
  handleDateTimeFilter: jest.fn(),
  createColumns: jest.fn(),
  handleSearchFilter: jest.fn(),
  handleResetSales: jest.fn(),
};
describe('SalesHistoryDetails component', () => {
  let wrapper;
  it('it renders the SalesHistoryDetails component', () => {
    wrapper = shallow((
      <SalesHistoryDetails {...props} />
    ));
    const fragment = wrapper.find('Fragment').length;
    expect(fragment).toBe(1);
  });
});
