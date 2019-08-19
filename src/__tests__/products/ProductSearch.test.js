import React from 'react';
import { shallow } from 'enzyme';
import withProductSearch from '../../components/products/ProductSearch';

describe('withProductSearch ', () => {
  it('should render the component correctly ', () => {
    const wrapper = withProductSearch(
          <div>Yes</div>
    )({});
    const searchWrapper = shallow(wrapper);
    expect(searchWrapper).not.toBe(null);
  });
});
