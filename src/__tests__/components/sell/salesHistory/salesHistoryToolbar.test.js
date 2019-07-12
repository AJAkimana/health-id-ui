import React from 'react';
import { mount } from 'enzyme';
import { SalesHistoryToolBar } from '../../../../components/sell/salesHistory/salesHistoryToolBar';

const props = {
  state: {
    open: true,
    isSearching: false,
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
    searchValues: {
      searchField: '',
      from: new Date(),
      to: new Date(),
      outlet: 'Transcend'
    },
    searchAnchorEl: null,
    searchPopperOpen: false,
    calenderPopperOpen: false,
    calenderAnchorEl: '',
    datePicker: null,
    savePrintOpen: true,
    savePrintAnchorEl: { id: '' },
  },
  classes: { popper: { zIndex: '500' } },
  title: '',
  rows: [{ location: 'ecopham | kampala' }],
  componentRef: {},
  handleResetSales: jest.fn(),
  handleSalesSearch: jest.fn(),
  handleSearchFilter: jest.fn(),
  handleDateTimeFilter: jest.fn(),
  transition: true,
  disablePortal: true,
};
describe('SalesHistoryToolBar component', () => {
  const wrapper = mount(<SalesHistoryToolBar {...props} />);
  wrapper.instance().setState(props.state);

  it('renders the SalesHistoryToolBar component', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSliderButtons');
    const comp = wrapper.find('button').at(3).simulate('click');
  });
  it('renders the SalesHistoryToolBar with isSearching true', () => {
    wrapper.instance().setState({ isSearching: true });
    const spy = jest.spyOn(wrapper.instance(), 'handleSliderButtons');
  });
  it('calls handleToggle', () => {
    const event = { currentTarget: { id: '' } };
    wrapper.instance().handleToggle(event);
    expect(wrapper.state('open')).toBe(false);
  });
  it('calls handleSearchToggle', () => {
    wrapper.instance().handleSearchToggle();
    expect(wrapper.state('isSearching')).toBe(false);
  });
  it('calls handleClose', () => {
    const which = 'isSearching';
    wrapper.instance().handleClose(which);
    expect(wrapper.state('isSearching')).toBe(false);
  });
  it('calls handleRangeChange', () => {
    const which = 'searchValues';
    const payLoad = { searchField: 'cool' }
    wrapper.instance().handleRangeChange(which, payLoad);
    expect(wrapper.state().searchValues.searchField).toBe('cool');
  });
  it('calls handleCalenderChange', () => {
    const which = 'timeValue';
    const payLoad = { start: '11:11', end: '23:59' };
    wrapper.instance().handleCalenderChange(which, payLoad);
    expect(wrapper.state('timeValue')).toBe(payLoad);
  });
  it('calls timeChangeHandler', () => {
    const time = { start: '12:00', end: '23:59' };
    wrapper.instance().timeChangeHandler(time);
    expect(wrapper.state('timeValue')).toBe(time);
  });
  it('calls handleSliderButtons for 00:00', () => {
    const point = '00:00';
    wrapper.instance().handleSliderButtons(point);
    expect(wrapper.state().timeValue.start).toBe(point);
  });
  it('calls handleSliderButtons for 23:59', () => {
    const point = '23:59';
    wrapper.instance().handleSliderButtons(point);
    expect(wrapper.state().timeValue.end).toBe(point);
  });
  it('calls handleClickShowCalender', () => {
    const currentTarget = { id: '' };
    const event = { currentTarget };
    wrapper.instance().handleClickShowCalender(event);
    expect(wrapper.state('calenderAnchorEl')).toBe(currentTarget);
  });
  it('calls handleSearchInput', () => {
    const currentTarget = { id: '' };
    const value = 'momo';
    const event = { currentTarget, target: value };
    wrapper.instance().handleSearchInput(event);
    expect(wrapper.state('searchPopperOpen')).toBe(true);
  });
  it('calls handleSearchChange', () => {
    const data = 'coco';
    wrapper.instance().handleSearchChange('searchField', data);
    expect(wrapper.state().searchValues.searchField).toBe(data);
  });
  it('calls handleDoneButton', () => {
    const searchValues = 'coco';
    wrapper.instance().handleDoneButton(searchValues);
    expect(wrapper.state('searchPopperOpen')).toBe(false);
  });
  it('calls handleDateTimeDoneButton', () => {
    const selection = '';
    const timeValue = '';
    wrapper.instance().handleDateTimeDoneButton(selection, timeValue);
    expect(wrapper.state('open')).toBe(false);
  });
});
