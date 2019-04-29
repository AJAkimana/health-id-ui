import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/shared/Footer';

describe('Render footer component', () => {
  it('renders app bar element for the footer', () => {
    shallow(<Footer />);
  });
});
