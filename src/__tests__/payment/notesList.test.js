import React from 'react';
import { shallow } from 'enzyme';
import RenderNotesList from '../../components/payment/notesList';

const props = {
  mainCartNote: 'test note',
  products: [
    {
      id: 3,
      productName: 'test product',
      quantity: 8,
      productPrice: 1500,
      note: 'product note'
    },
  ],
};

const productsWithoutNotesProps = {
  mainCartNote: 'test note',
  products: [
    {
      id: 3,
      productName: 'test product',
      quantity: 8,
      productPrice: 1500,
      note: ''
    },
  ],
};

const productsWithoutNotesAndMainNoteProps = {
  products: [
    {
      id: 3,
      productName: 'test product',
      quantity: 8,
      productPrice: 1500,
      note: ''
    },
  ],
};

describe('test RenderNotesList component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = shallow((
      <RenderNotesList {...props} />
    ));
    const element = wrapper.find('span').length;
    expect(element).toBe(3);
  });

  it('it doesnot render span elements provided the products have no notes', () => {
    const notesWrapper = shallow((
      <RenderNotesList {...productsWithoutNotesProps} />
    ));
    const element = notesWrapper.find('span').length;
    expect(element).toBe(0);
  });

  it('it doesnot render span elements if no products were provided', () => {
    const noProductsWrapper = shallow((
      <RenderNotesList {...productsWithoutNotesAndMainNoteProps} />
    ));
    const element = noProductsWrapper.find('span').length;
    expect(element).toBe(1);
  });
});
