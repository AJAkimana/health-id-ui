import React from 'react';
import { shallow } from 'enzyme';
import { EmergencyContact } from '../../components/sell/emergencyContact';

describe('EmergencyContact', () => {
  const props = {
    state: {
      selectedCustomer: {
        emergencyContactName: 'john',
        emergencyContactEmail: 'john@co.ug',
        emergencyContactNumber: '123',
      }
    }
  }
  const wrapper = shallow(<EmergencyContact {...props} />)

  it('renders without crashing', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});
