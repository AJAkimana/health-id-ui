import React from 'react';
import { shallow, mount } from 'enzyme';
import { CustomToolBar } from '../../components/stock_control/Table/CustomToolBar';
import {
  StockCount,
  LowQuantityNotification,
  Export,
  ApproveStockIcon
} from '../../assets/images/stock/StockIcons';

describe('CustomToolBar ', () => {
  it('renders without crashing', () => {
    const props = {
      classes: { svg: {} },
      handleClickSearch: jest.fn()
    };
    const event = {
      target: {}
    };

    const wrapper = shallow(<CustomToolBar {...props} />);
    wrapper.instance().handleToggle();
    wrapper.instance().handleToggleStock();
    wrapper.instance().anchorEl = {
      contains: jest.fn()
    };
    wrapper.instance().StockElement = {
      contains: jest.fn()
    };
    wrapper.instance().handleClose(event);
    wrapper.instance().handleCloseStock(event);
    expect(wrapper.find('[title="Low quantity"]').length).toBe(1);
    expect(wrapper.find('[title="Stock count"]').length).toBe(0);
    expect(wrapper.find('[title="Export List"]').length).toBe(1);
  });

  it('responds to on click events', () => {
    const props = {
      classes: { svg: {} },
      handleClickSearch: jest.fn()
    };

    const wrapper = mount(<CustomToolBar {...props} />);
    wrapper.find('[aria-haspopup="true"]').at(0).simulate('click');
    wrapper.find('[aria-haspopup="true"]').at(1).simulate('click');
    expect(wrapper.find('[aria-haspopup="true"]').length).toBe(15);
  });
});

describe('Stock  control icons ', () => {
  it('stock count renders without crashing', () => {
    const wrapper = shallow(<StockCount />);
    expect(wrapper.find('[id="Stock_Count_Icon"]').length).toBe(1);
  });

  it('LowQuantityNotification renders without crashing', () => {
    const wrapper = shallow(<LowQuantityNotification />);
    expect(wrapper.find('[id="Low_quantity_Notification_Icon"]').length).toBe(1);
  });

  it('Export renders without crashing', () => {
    const wrapper = shallow(<Export />);
    expect(wrapper.find('[id="Export"]').length).toBe(1);
  });

  it('ApproveStockIcon renders without crashing', () => {
    const wrapper = shallow(<ApproveStockIcon />);
    expect(wrapper.find('[id="Approve"]').length).toBe(1);
  });
});
