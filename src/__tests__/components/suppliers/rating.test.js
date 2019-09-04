import React from 'react';
import { shallow } from 'enzyme';
import Rating from '../../../components/suppliers/Templates/Rating';

describe('Render supplier page rating component', () => {
  it('renders rating component', () => {
    shallow(<Rating rating={2}/>);
  });
});
