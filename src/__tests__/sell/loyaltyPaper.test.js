import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyPaper } from '../../components/sell/loyaltyPaper';

describe('LoyaltyPaper', () => {
  const props = {
    state: {
      selectedCustomer: {
        loyaltyMember: false,
        loyaltyPoints: 0,
        wallet: [{ storeCredit: 0 }]
      }
    }
  }
  const wrapper = shallow(<LoyaltyPaper {...props} />)

  it('renders without crashing', () => {
    expect(wrapper.find('WithStyles(Paper)').length).toBe(1);
  });

  it('renders with customer being a loyaltyMember', () => {
    wrapper.setProps({ state: { selectedCustomer: { loyaltyMember: true } } })
    expect(wrapper.find('WithStyles(Paper)').length).toBe(1);
  })
});
