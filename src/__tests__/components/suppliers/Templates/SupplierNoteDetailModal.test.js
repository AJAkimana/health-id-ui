import React from 'react';
import { shallow } from 'enzyme';
import SupplierNoteDetailModal from '../../../../components/suppliers/Templates/SupplierNoteDetailModal';

describe("Supplier Detail Modal", () => {
  const wrapper = shallow(
    <SupplierNoteDetailModal
      openDetailModel={false}
      handleCloseModal={jest.fn()}
      session ={{ me:{
        firstName:'TestUser',
        lastName:'TestUser',
      }}}
      clickedNote={{
        createdAt:'2019-7-8',
        note:'Test note',
        supplier:{
            user:{
                firstname:'summyname',
                firstname:'lastname',
            }
        }
      }
      }
    />
  );

  it("Should render the component", () => {
    expect(wrapper.exists()).toBeTruthy()
  });
});
