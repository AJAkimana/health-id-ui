import React from 'react';
import { mount } from 'enzyme';
import SavePrintPopper from '../../../../components/sell/salesHistory/savePrintPopper';

const props = {
  state: {
    savePrintOpen: true,
    savePrintAnchorEl: { id: '' },
  },
  classes: {
    popper: '', savePrintPaper: '', printButton: '', savePrintTypo: '', saveButton: '', saveButtonImg: ''
  },
  componentRef: React.createRef(),
  handlePrintButton: jest.fn(),
  handleSaveButton: jest.fn(),
};
describe('SavePrintPopper component', () => {
  let wrapper = mount(<SavePrintPopper {...props} />);
  it('handles print', () => {
    const button = wrapper.find('IconButton').at(0);
    button.simulate('click');
    expect(wrapper.props().state.savePrintOpen).toBe(true);
  });
  it('handles save', () => {
    const button = wrapper.find('IconButton').at(1);
    button.simulate('click');
    expect(wrapper.props().state.savePrintOpen).toBe(true);
  });
});
