import React from 'react';
import { shallow } from 'enzyme';
import OutletList from '../components/setup/outletList';

const props = {
  state: {
    outletSet: [{
      id: 'id',
      outletRegister: [{
        id: 'id',
        name: 'name'
      }],
      name: 'name',
      city: { name: 'name' },
      kind: { name: 'name' },
      registerHidden: false,
    }],
    outletType: '',
    registerHidden: '',
    clickedOutlet: 'id',
  },
  handleAddNewOutletButton: jest.fn(),
  toggleRegisterDisplay: jest.fn(),
  handleOutletEdit: jest.fn(),
  handleOutletDelete: jest.fn(),
};

describe('Render outletList component', () => {
  const wrapper = shallow(<OutletList {...props} />);
  it('renders outletsList table', () => {
    expect(wrapper.find('#outlets-table-row').length).toBe(1);
  });

  it('calls handleOutletEdit when Edit is clicked', () => {
    wrapper.find('#paper-edit').simulate('click');
    expect(props.handleOutletEdit).toBeCalledTimes(1);
  });

  it('calls handleOutletDelete when Delete is clicked', () => {
    wrapper.find('#paper-delete').simulate('click');
    expect(props.handleOutletDelete).toBeCalledTimes(1);
  });
});
