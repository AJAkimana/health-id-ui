import React from 'react';
import { shallow, mount } from 'enzyme';
import { CustomPricingToolBar } from '../../components/products/Templates/Table/CustomPricingToolBar';
import IconFactory from '../../assets/images/iconFactory/IconFactory';
import {
  Export,
} from '../../assets/images/stock/StockIcons';
import check from '../../assets/images/suppliers/check.png';

describe('Product Page PricingCustomToolBar ', () => {
  it('renders without crashing', () => {
    const props = {
      classes: { svg: {} },
      handleClickSearch: jest.fn(),
      isSearchActive: false,
      handleHideSearch: jest.fn(),
      handleTextChange: jest.fn()
    };

    const event = {
      target: {}
    };

    const wrapper = shallow(<CustomPricingToolBar {...props} />);
    wrapper.instance().anchorEl = {
      contains: jest.fn()
    };
    wrapper.instance().addSupplierElement = {
      contains: jest.fn()
    };
    
    wrapper.instance().handleToggle();
    expect(wrapper.find('[title="Export List"]').length).toBe(1);
  });

  it('responds to on click events', () => {
    const props = {
      classes: { svg: {} },
      handleClickSearch: jest.fn(),
      isSearchActive: false,
      handleHideSearch: jest.fn(),
      handleTextChange: jest.fn()
    };

    const wrapper = mount(<CustomPricingToolBar {...props} />);
    wrapper.find('[aria-haspopup="true"]').at(0).simulate('click');
    wrapper.find('[aria-haspopup="true"]').at(1).simulate('click');
    expect(wrapper.find('[aria-haspopup="true"]').length).toBe(10);
  });

  it('update props ', async () => {
    const props = {
      classes: { svg: {} },
      handleClickSearch: jest.fn(),
      isSearchActive: false,
      handleHideSearch: jest.fn(),
      handleTextChange: jest.fn(),
      status: 'approved'
    };
    const wrapper = shallow(<CustomPricingToolBar {...props} />);
    wrapper.instance().handleToggleViewMenu();
    wrapper.instance().handleClose();
 });
});

describe('Products page icons ', () => {
  it('Export renders without crashing', () => {
    const wrapper = shallow(<Export />);
    expect(wrapper.find('[id="Export"]').length).toBe(1);
  });

  it('IconFactory renders without crashing', () => {
    const wrapper = shallow(<IconFactory iconStyle='' type={check} iconClass='' iconAlt='' />);
    expect(wrapper.length).toBe(1);
  });
});
