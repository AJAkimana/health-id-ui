import React from 'react';
import { mount } from 'enzyme';
import ProductCard from '../../../components/sell/productCard';

const props = {
  classes: {},
  product: {
    productName: 'Amoxycilin',
    productQuantity: 3,
    productCategory: 'Anti-biotics',
    productPrice: 1000,
    measurementUnit: { name: '' }
  },
  currency: '₦',
  handleClickToAddProduct: jest.fn(),
};
describe('test ProductCard component', () => {
  let wrapper;
  
  it('it renders ProductCard component', () => {
    wrapper = mount((
      <ProductCard {...props} />
    ));
    const card = wrapper.find('Card').length;
    expect(card).toBe(1);
  });
  it('it renders ProductCard component Icon', () => {
    wrapper = mount((
      <ProductCard {...props} />
    ));
    const iconButton = wrapper.find('IconButton');
    iconButton.simulate('click');
    expect(iconButton.length).toBe(1);
  });
});
