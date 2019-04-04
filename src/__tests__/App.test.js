import React from 'react';
import App from '../App';
import SetUp from '../utils/TestSetup';

const { shallow } = SetUp();

describe('initial react test', () => {
  it('should render without crashing', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
