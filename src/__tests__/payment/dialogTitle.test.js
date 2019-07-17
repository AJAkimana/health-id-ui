import React from 'react';
import { mount } from 'enzyme';
import { DialogTitle } from '@material-ui/core';
import DialogHeader from '../../components/payment/dialogTitle';

const props = {
  processing: false,
  handleBackToSalesSummary: jest.fn(),
  handleBackToSellScreen: jest.fn(),
  handleDisplayNotesPopper: jest.fn()
};

describe('test DialogHeader component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = mount((
      <DialogHeader {...props} />
    ));
    expect(wrapper.find(DialogTitle).length).toBe(1);
  });

  it('it renders differently when processing', () => {
    props.processing = true;
    const wrapper = mount((
      <DialogHeader {...props} />
    ));
    const paperWrapper = wrapper.find('Paper');
    expect(paperWrapper.prop('elevation')).toBe(0);
  });
});
