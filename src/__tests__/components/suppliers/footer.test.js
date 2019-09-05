import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/suppliers/Templates/Footer';

describe('Render supplier page footer component', () => {
  it('renders app bar element for the footer', () => {
    shallow(<Footer />);
  });
});
