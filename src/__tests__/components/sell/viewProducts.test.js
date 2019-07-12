import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { ViewProducts } from '../../../components/sell/viewProducts';

const props = {
  classes: {},
  state: { searchValue: '' },
  renderSearchBar: jest.fn(),
  switchComponentRendering: jest.fn(),
};
describe('View products container component', () => {
  let wrapper;

  it('it renders the view products component', () => {
    wrapper = mount((
      <BrowserRouter>
        <ViewProducts {...props} />
      </BrowserRouter>
    ));
    const iconButton = wrapper.find('IconButton').length;
    expect(iconButton).toBe(1);
  });
});
