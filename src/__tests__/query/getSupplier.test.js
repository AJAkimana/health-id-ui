import { GET_ALL_SUPPLIERS, FILTER_SUPPLIERS } from '../../queries/getSuppliers';

it('should call the function filter supplier', () => {
  expect(GET_ALL_SUPPLIERS(1, 1)).toHaveProperty('kind');
  expect(GET_ALL_SUPPLIERS(1, 1)).toHaveProperty('definitions');
  expect(FILTER_SUPPLIERS(null, null)).toEqual(null);
  expect(FILTER_SUPPLIERS('status', null)).toHaveProperty('definitions');
  expect(FILTER_SUPPLIERS('search', null)).toHaveProperty('definitions');
});
