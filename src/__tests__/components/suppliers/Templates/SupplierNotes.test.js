import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
// import SupplierNotes from '../../../../components/suppliers/Templates/SupplierNotes';
import { SupplierNotes } from '../../../../components/suppliers/Templates/SupplierNotes';
const props = {
  renderTableCell: jest.fn(),
  supplier: {
    isApproved: false,
    id: 'AlphaX',
    address: '​​​​​NNPC Towers, Central Business District, Abuja.',
    name: 'Damian Inc',
    mobile: '08137519698',
    rating: '5',
    image:
      'https://justcreative.com/wp-content/uploads/2019/09/brand-strategy-workbook-1.jpg',
    email: 'test@gmail.com',
    tier: 'Manufacturer',
    paymentTerms: 'Daily',
    creditDays: '3 days',
    notes: [
      {
        id: 1,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 2,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 3,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 4,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 5,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 6,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 7,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 8,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 9,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 10,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      },
      {
        id: 11,
        createdOn: 'Jan 20 2019',
        message: 'Great Supplier',
        createdBy: 'Danilo Sam'
      }
    ]
  },
  addSupplierNote: async () => {},
  renderTextField: jest.fn(),
  variables: {},
  classes: {},
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: 'Africa/Nairobi'
          }
        }
      },
      outlets: [
        {
          id: 'ddfe'
        }
      ]
    }
  }
};

describe('SupplierNotes', () => {
  it('should render the SupplierNotes component properly', () => {
    let wrapper = shallow(<SupplierNotes {...props} />);
    wrapper.instance().handleopenAddModel();
    wrapper.instance().handleChange({ target: 'efef' });
    wrapper.instance().handleSaveNote();
    wrapper.instance().handleCloseModal();
    wrapper.instance().handleRowClick({});
    wrapper.instance().handleCloseDetailModal();
    expect(typeof wrapper.instance().state).toBe('object');
    expect(wrapper.instance().state.note).toBe(undefined);
    expect(wrapper.instance().state.openAddModel).toBe(false);
  });
});
