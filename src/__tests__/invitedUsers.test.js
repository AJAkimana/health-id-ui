import React from 'react';
import { shallow } from 'enzyme';
import InvitedUsers from '../components/setup/invitedUsers';

const props = {
  state: {
    users: [{
      firstName: 'fName',
      lastName: 'lName',
      email: 'fname@gmail.com',
      users: [{ id: 'outletId' }],
      role: { id: 'roleId' },
      username: 'username',
      isActive: false,
      target: 'target',
      startingDate: '2019-01-01',
      id: 'userId',
      mobileNumber: '+238724536246',
      jobTitle: 'Cashier',
    },
    {
      firstName: 'fName',
      lastName: 'lName',
      email: 'loggedin@user.com',
      users: [{ id: 'outletId' }],
      role: { id: 'roleId' },
      username: 'user_name',
      isActive: false,
      target: 'target',
      startingDate: '2019-01-01',
      id: 'user_Id',
      mobileNumber: '+238724536259',
      jobTitle: 'Cashier',
    },
    ],
    email: 'loggedin@user.com'
  },
  handleClickAddButton: jest.fn(),
  sendEditInfo: jest.fn(),
};

describe('Render InvitedUsers component with business users', () => {
  let wrapper = shallow(<InvitedUsers {...props} />);
  let divs = wrapper.find('div').length;
  it('renders the same number of divs as the number of users - 1', () => {
    expect(divs).toBe(1);
  });
  it('shows verified if a user is active', () => {
    props.state.users[0].isActive = true;
    wrapper = shallow(<InvitedUsers {...props} />);
    divs = wrapper.find('div').length;
    expect(divs).toBe(1);
  });
  it('calls sendEdit info when edit button is clicked', () => {
    const editButton = wrapper.find('.editPaper').at(0);
    expect(editButton.length).toBe(1);
    editButton.simulate('click');
    expect(props.sendEditInfo).toBeCalledTimes(1);
  });
});
