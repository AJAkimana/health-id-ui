import React from 'react';
import { mount } from 'enzyme';
import ResizeDialog from '../components/profile/resizeDialogBox';

const props = {
  state: {
    open: false,
  },
  onCropChange: jest.fn(),
  handleClose: jest.fn(),
  handleSave: jest.fn(),
};

describe('render resize dialog box', () => {
  const wrapper = mount(<ResizeDialog {...props} />);

  it('renders resize dialog component', () => {
    expect(wrapper.find('Dialog')).toHaveLength(1);
  });
});
