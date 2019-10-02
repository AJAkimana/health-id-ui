import React from 'react';
import { mount } from 'enzyme';
import LowerNavbar from '../../components/shared/LowerNavbar/LowerNavbar';
import { BrowserRouter as Router } from 'react-router-dom';

const event1 = {
  currentTarget: {
    id: 'grid1'
  }
};
const event2 = {
  currentTarget: {
    id: 'grid2'
  }
};

const props = {
  isActive: ''
};

describe('LowerNavbar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <LowerNavbar {...props} />
      </Router>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('it should handle on click and switch tabs ', () => {
    const result1 = {"currentTarget": {"id": "grid2"}};
    wrapper
      .find('LowerNavbar')
      .instance()
      .handleOnClick(event1);
    expect(wrapper.find('LowerNavbar').instance().state.activeGrid).toBeTruthy();
    wrapper
      .find('LowerNavbar')
      .instance()
      .handleOnClick(event2);
    expect(wrapper.find('LowerNavbar').instance().state.activeGrid).toEqual(
      result1
    );
  });
});
