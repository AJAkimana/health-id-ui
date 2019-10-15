import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ImportSuppliersForm from '../../../../components/suppliers/Templates/ImportSuppliers/ImportSuppliersForm';

describe('Render ImportSuppliersForm component', () => {
  const props = {
    state: {}
  };

  it('should render the ImportSuppliersForm component properly', () => {
    const setupImportSuppliersForm = () => {
      const wrapper = shallow(<ImportSuppliersForm {...props} />)
      return wrapper
    }

    let wrapper;
    wrapper = setupImportSuppliersForm();
    expect(toJson(wrapper)).toMatchSnapshot();
  })
});
