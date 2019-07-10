import React from 'react';
import { shallow, mount } from 'enzyme';
import ProductCard from '../../../components/stock_control/ProductCard';
import TableSearch, {
  TableSearch as SearchComponent
} from '../../../components/stock_control/Table/TableSearch';
import TableHeader from '../../../components/stock_control/Table/TableHeader';
import { TableToolBar } from '../../../components/stock_control/Table/TableToolBar';
import {
  CustomIconButton, getSorting, desc
} from '../../../components/stock_control/utils/utils';

describe('ProductCard ', () => {
  it('renders without crashing', () => {
    const props = {
      data: {
        name: '',
        description: '',
        image: '',
        tags: ['goat', 'dog']
      }
    };
    const wrapper = mount(<ProductCard {...props} />);
    expect(wrapper.find('[label="goat"]').length).toBe(2);
    expect(wrapper.find('[label="dog"]').length).toBe(2);
  });
});

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

describe('TableSearch ', () => {
  let props = {};
  beforeEach(() => {
    props = {
      classes: {
        main: {},
        searchIcon: {},
        searchText: {},
        clearIcon: {}
      },
      onHide: jest.fn(),
      handleTextChange: jest.fn()
    };
  });

  it('renders without crashing', () => {
    const wrapper = mount(<TableSearch {...props} />);
    expect(wrapper.find('#search-field').length).toBe(7);
  });

  it('call keydown function', () => {
    const wrapper = shallow(<SearchComponent {...props} />);
    const event = {
      keyCode: 27
    };
    wrapper.instance().onKeyDown(event);
    expect(wrapper.find('#search-field').length).toBe(1);
    wrapper.unmount();
    expect(wrapper.find('#search-field').length).toBe(0);
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
      headRows: ['name', 'id']
    };
    const wrapper = mount(<TableHeader {...props} />);

    expect(wrapper.find('[padding="checkbox"]').at(1).childAt(0).props().children.props.checked).toBe(false);
    expect(wrapper.find('[padding="checkbox"]').at(1).childAt(0).props().children.props.indeterminate).toBe(true);
  });
});

describe('Helper functions ', () => {
  it('CustomIconButton renders without crashing', () => {
    const props = {
      customClass: {},
      toolTip: 'button',
      classes: {},
      buttonRef: jest.fn(),
      onClickHandler: jest.fn()
    };
    const wrapper = shallow(<CustomIconButton {...props} />);

    expect(wrapper.find('[toolTip="button"]').length).toBe(1);
  });

  it('getSorting sorts the array element', () => {
    const results = getSorting('desc', 'name');
    expect(results.name).toEqual("");
  });

  it('desc function arranges data in order', () => {
    let results = desc([7], [6], 0);
    expect(results).toEqual(-1);
    results = desc([6], [7], 0);
    expect(results).toEqual(1);
    results = desc([6], [6], 0);
    expect(results).toEqual(0);
  });
});
