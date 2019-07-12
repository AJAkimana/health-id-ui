import React from 'react';
import { mount } from 'enzyme';
import DateTimePopper from '../../../../components/sell/salesHistory/dateTimePopper';

const props = {
  state: {
    open: true,
    calenderPopperOpen: true,
    dateTimeAnchorEl: {},
    dateRangePicker: {
      selection: {
        color: '#7D7A1F',
        endDate: new Date(),
        key: 'selection',
        startDate: new Date()
      },
    },
    timeValue: { start: '00:00', end: '23:59' },
  },
  classes: {},
  handleClose: jest.fn(),
  handleRangeChange: jest.fn(),
  timeChangeHandler: jest.fn(),
  handleSliderButtons: jest.fn(),
  handleDateTimeDoneButton: jest.fn(),
};
describe('dataTable component', () => {
  const wrapper = mount((
    <DateTimePopper {...props} />
  ));
  it('handles fab one onclick', () => {
    const fab = wrapper.find('Fab').at(0);
    fab.simulate('click');
    expect(wrapper.props().state.timeValue.start).toBe('00:00');
  });
  it('handles fab two onclick', () => {
    const fab = wrapper.find('Fab').at(1);
    fab.simulate('click');
    expect(wrapper.props().state.timeValue.end).toBe('23:59');
  });
  it('handles button one onclick', () => {
    const button = wrapper.find('Button').at(0);
    button.simulate('click');
    expect(wrapper.props().state.calenderPopperOpen).toBe(true);
  });
  it('handles button two onclick', () => {
    const button = wrapper.find('Button').at(1);
    button.simulate('click');
    expect(wrapper.props().state.open).toBe(true);
  });
});
