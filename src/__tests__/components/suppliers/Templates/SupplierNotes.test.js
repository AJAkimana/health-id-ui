import React from 'react';
import { shallow, mount } from 'enzyme';

import { SupplierNotes } from '../../../../components/suppliers/Templates/SupplierNotes';

const props = {
  onMouseEnter: jest.fn(),
  renderTableCell: jest.fn(),
  deleteSupplierNote: jest.fn(() =>
    Promise.resolve({
      data: {
        deletedSupplierNote: {
          message: 'Supplier note deleted'
        }
      }})
      ),
  updateSupplierNote: jest.fn(() =>
    Promise.resolve({
      data: {
        updateSupplierNote: {
          message: 'Supplier note updated'
        }
      }
    })
  ),
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

const invalidProps = {
  supplier: {
    isApproved: false,
    id: 'AlphaX',
    address: '​​​​​NNPC Towers, Central Business District, Abuja.',
    name: 'Store Inc',
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
      }
    ]
  },
  handleSaveNote: () =>
    new Promise((resolve, reject) =>
      reject({
        graphQLErrors: [
          {
            message: 'error'
          }
        ]
      })
    ),
  handleDelete: () =>
    new Promise((resolve, reject) =>
      reject({
        graphQLErrors: [
          {
            message: 'error'
          }
        ]
      })
    ),
  classes: {
    dividerDiv: 'dividerDiv'
  },
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
  addSupplierNote: () =>
  new Promise((resolve, reject) =>
    reject({
      graphQLErrors: [
        {
          message: 'error'
        }
      ]
    })
  ),
  deleteSupplierNote: () =>
  new Promise((resolve, reject) =>
    reject({
      graphQLErrors: [
        {
          message: 'error'
        }
      ]
    })
  ),
  updateSupplierNote: () =>
  new Promise((resolve, reject) =>
    reject({
      graphQLErrors: [
        {
          message: 'error'
        }
      ]
    })
  ),
};

describe('SupplierNotes', () => {
  const wrapper = mount(<SupplierNotes {...props} />)

  const singleNote = {
    id: 8,
    createdOn: 'Jan 20 2019',
    message: 'Great Supplier',
    createdBy: 'Danilo Sam'
  };
  it('should render the SupplierNotes component properly', () => {
    wrapper.instance().handleopenAddModel();
    wrapper.instance().handleopenConfirmationModel();
    wrapper.instance().handleopenAddModel(singleNote);
    wrapper.instance().handleChange({ target: 'efef' });
    wrapper.instance().handleSaveNote();
    wrapper.instance().handleCloseModal();
    wrapper.instance().handleOnRowHover(singleNote, { currentTarget: 'efef' });
    wrapper.instance().handleDelete();
    wrapper.instance().handleMouseLeave();
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
    wrapperInstance.handleopenAddModel(singleNote)
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

  it('calls handleSaveNote function with error', () => {
    let wrapper = shallow(<SupplierNotes {...invalidProps} />);

    const spy = jest.spyOn(wrapper.instance(), 'handleSaveNote');

    wrapper.instance().handleSaveNote();
    wrapper.update();

    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('calls handleDelete function with error', () => {
    let wrapper = shallow(<SupplierNotes {...invalidProps} />);

    const spy = jest.spyOn(wrapper.instance(), 'handleDelete');

    wrapper.instance().handleDelete();
    wrapper.update();

    expect(spy).toHaveBeenCalledTimes(1);
  });

});
