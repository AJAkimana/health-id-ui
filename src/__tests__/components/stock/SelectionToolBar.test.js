import React from 'react';
import { shallow } from 'enzyme';
import { SelectionToolBar } from '../../../components/stock_control/Table/SelectionToolBar';

describe('SelectionToolBar ', () => {
  it('renders without crashing', () => {
    const props = {
      classes: { iconButton: {}, icon: {}, inverseIcon: {} },
      selected: 1,
      handleEdit: jest.fn(),
      handleClickDeselectAll: jest.fn(),
      handleClickInverseSelection: jest.fn()
    };
    const wrapper = shallow(<SelectionToolBar {...props} />);

    expect(wrapper.find('[title="Edit quantity"]').length).toBe(1);
    expect(wrapper.find('[title="Deactivate"]').length).toBe(1);
  });
});
