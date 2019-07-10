import React from 'react';
import { shallow, mount } from 'enzyme';
import { DataTable } from '../../../components/stock_control/Table/DataTable';

describe('DataTable ', () => {
  const props = {
    classes: {},
    columns: ['id', 'name', 'sku'],
    data: [{ id: '1', name: 'panadol', sku: '45' }, { id: '3', name: 'chloro', sku: '5' }],
    title: 'Drugs',
    onRowClick: jest.fn()
  };
  const event = {
    stopPropagation: jest.fn(),
    currentTarget: {
      innerText: 1
    },
    target: {
      value: 'panadol'
    }
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<DataTable {...props} />);
    expect(wrapper.find('[role="checkbox"]').length).toBe(2);
  });

  it('responds to on click events', () => {
    const wrapper = shallow(<DataTable {...props} />);

    wrapper.find('[role="checkbox"]').at(0).simulate('click');
    wrapper.find('[padding="checkbox"]').at(0).childAt(0).simulate('click', event);
    expect(wrapper.find('[padding="checkbox"]').at(0).childAt(0).prop('checked')).toBe(true);
    wrapper.find('[padding="checkbox"]').at(0).childAt(0).simulate('click', event);
    expect(wrapper.find('[padding="checkbox"]').at(0).childAt(0).prop('checked')).toBe(false);
  });

  it('triggers on hover events', () => {
    const wrapper = shallow(<DataTable {...props} />);

    expect(wrapper.find('[placement="right-start"]').prop('open')).toBe(false);
    wrapper.find('span').at(0).simulate('mouseenter', event);
    expect(wrapper.find('[placement="right-start"]').prop('open')).toBe(true);
    wrapper.find('span').at(0).simulate('mouseleave', event);
    expect(wrapper.find('[placement="right-start"]').prop('open')).toBe(false);
  });

  it('triggers open search form', () => {
    const wrapper =  mount(<DataTable {...props} />);

    expect(wrapper.find('[name="toolbar"]').prop('isSearchActive')).toBe(false);
    wrapper.find('[title="Search"]').at(1).childAt(0).simulate('click');
    expect(wrapper.find('[name="toolbar"]').prop('isSearchActive')).toBe(true);
    wrapper.find('#search-field').at(6).simulate('change', event);
    wrapper.find('#search-field').at(6).simulate('change', {});
  });

  it('performs inverse selection and deselection', () => {
    const wrapper = mount(<DataTable {...props} />);
    const secondEvent = {
      target: {
        checked: true,
      }
    };

    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(0);
    wrapper.find('Checkbox').at(1).simulate('click', event);
    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(1);
    wrapper.find('[title="Inverse selection"]').at(1).childAt(0).simulate('click');
    wrapper.find('Checkbox').at(1).simulate('click', event);
    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(2);
    wrapper.find('[title="Deselect All"]').at(1).childAt(0).simulate('click');
    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(0);
    wrapper.find('Checkbox').at(0).simulate('click', event);
    wrapper.find('Checkbox').at(0).simulate('click', secondEvent);
    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(2);
  });
});
