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
    suppliernoteSet: {
      notes: [
        {
          id: 1,
          createdOn: 'Jan 20 2019',
          message: 'Hey bro, nice work',
          createdBy: 'Danilo Silva',
          supplier: { user: { firstName: 'jojo' } }
        },
        {
          id: 2,
          createdOn: 'Jan 20 2019',
          message: 'Hey bro, nice work',
          createdBy: 'Danilo Silva',
          supplier: { user: { firstName: 'jojo' } }
        },
      ]
    },
  },
  addSupplierNote: async () => { },
  renderTextField: jest.fn(),
  variables: {},
  classes: {},
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      outlets: [{ id: 1 }],
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: "Africa/Nairobi"
          }
        }
      },
      outlets: [
        {
          id: 'ddfe'
        }
      ]
    }
  },
};

describe('SupplierNotes', () => {
  const wrapper = mount(<SupplierNotes {...props} />)

  it('should render the SupplierNotes component properly', () => {
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

  const wrapperInstance = wrapper.instance()
  it('should render "No note yet" with empty notes array', () => {
    wrapper.setProps({ notes: null })
    expect(wrapper.find('Table').length).toBe(0)
  })

  it('should call handleopenAddModel', () => {
    wrapperInstance.handleopenAddModel()
    expect(wrapper.state('openAddModel')).toBeTruthy();
  })

  it('should call handleChange', () => {
    const event = { target: { value: 'momo' } }
    wrapperInstance.handleChange(event)
    expect(wrapper.state('note')).toBe('momo');
  })

  describe('handleSaveNote', () => {
    it('should call "handleCloseModal" on success', () => {
      const spy = jest.spyOn(wrapperInstance, 'handleCloseModal');
      const addSupplierNote = jest.fn().mockResolvedValue(42)
      const refetch = jest.fn();
      wrapper.setProps({ addSupplierNote, refetch })
      wrapperInstance.handleSaveNote()
    })

    it('should call "notify" on failure', () => {
      const addSupplierNote = jest.fn().mockRejectedValue(new Error('Async error'))
      const refetch = jest.fn();
      wrapper.setProps({ addSupplierNote, refetch });
      wrapperInstance.handleSaveNote();
    })
  })

  it('should call handleCloseDetailModal', () => {
    wrapperInstance.handleCloseDetailModal()
    expect(wrapper.state('openDetailModel')).toBeFalsy;
  })
});
