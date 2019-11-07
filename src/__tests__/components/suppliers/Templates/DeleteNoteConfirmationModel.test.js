import React from 'react';
import { shallow } from 'enzyme';
import DeleteNoteConfirmationModel from '../../../../components/suppliers/Templates/DeleteNoteConfirmationModel';

describe('DeleteNoteConfirmationModel', () => {
  const wrapper = shallow(
    <DeleteNoteConfirmationModel
      clickedNote={{
        id: 1,
        createdOn: 'Jan 20 2019',
        message: 'Hey bro, nice work',
        createdBy: 'Danilo Silva'
      }}
      handleDelete={jest.fn()}
      openConfirmationModel={jest.fn()}
      handleDeleteConfirmationModal={jest.fn()}
    />
  );

  it('Should render the component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
