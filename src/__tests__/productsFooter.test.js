import React from "react";
import { shallow } from 'enzyme';
import ProductsFooter from "../components/products/productsTableFooter";

describe("Products page footer", () => {
  const props = {
    rowsCount: 10,
    pageNumber: 1,
    refetch: () => {}
  }
  const props2 = {
    rowsCount: 10,
    pageNumber: 2,
    refetch: () => {}
  }
  it("Should render the component - Page 1", () => {
    const wrapper = shallow(<ProductsFooter {...props} />)
  });
  it("Should render the component - Page 2", () => {
    const wrapper = shallow(<ProductsFooter {...props2} />)
  });
})
