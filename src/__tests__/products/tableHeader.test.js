import React from 'react';
import { shallow, mount } from 'enzyme';
import { TableToolBar } from '../../components/products/Templates/Table/TableToolBar';
import TableHeader from '../../components/products/Templates/Table/TableHeader';

describe('TableToolBar ', () => {
  it('renders without crashing', () => {
    const props = {
      numSelected: 4,
      handleTextChange: jest.fn(),
      title: 'title',
      isSearchActive: false,
      handleClickSearch: jest.fn(),
      handleHideSearch: jest.fn(),
      handleClickInverseSelection: jest.fn(),
      handleClickDeselectAll: jest.fn()
    };
    const wrapper = shallow(<TableToolBar {...props} />);

    expect(wrapper.find('[color="inherit"]').contains('4 row(s) selected')).toBe(true);
  });
});

describe('TableHeader ', () => {
  it('renders without crashing', () => {
    const props = {
      onSelectAllClick: jest.fn(),
      order: 'asc',
      orderBy: 'name',
      numSelected: 3,
      rowCount: 6,
      classes: {},
      isSearchActive: false,
      onRequestSort: jest.fn(),
      headRows: [{ name: 'name', label: 'Name', options: { display: true } }]
    };
    const props2 = {
        onSelectAllClick: jest.fn(),
        order: 'desc',
        orderBy: 'name',
        numSelected: 3,
        rowCount: 6,
        classes: {},
        isSearchActive: false,
        onRequestSort: jest.fn(),
        headRows: [{ name: 'name', label: 'Name', options: { display: false } }]
      };
    const wrapper = mount(<TableHeader {...props} />);
    const wrapper2 = mount(<TableHeader {...props2} />);
    expect(wrapper.find('[padding="checkbox"]').at(1).childAt(0).props().children.props.checked).toBe(false);
    expect(wrapper2.find('[padding="checkbox"]').at(1).childAt(0).props().children.props.indeterminate).toBe(true);
  });
});