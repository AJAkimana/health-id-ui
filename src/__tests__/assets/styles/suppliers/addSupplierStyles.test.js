import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import {
  SupplierFormStyles,
  SearchSelectStyles
} from '../../../../assets/styles/suppliers/addSupplierStyles';

test('styles', () => {
  const [provided, state] = [{}, {}];
  const option = SearchSelectStyles.option(provided, state);
  const control = SearchSelectStyles.control(provided, state);
  expect(SupplierFormStyles).toHaveProperty('paperForm');
  expect(SupplierFormStyles).toHaveProperty('gridContainer');
  expect(option).toHaveProperty('background');
  expect(option).toHaveProperty('color');
  expect(control).toHaveProperty('width');
  expect(control).toHaveProperty('color');
});
test('styles', () => {
  const [provided, state] = [{}, {isFocused: true}];
  const option = SearchSelectStyles.option(provided, state);
  const control = SearchSelectStyles.control(provided, state);
  expect(option).toHaveProperty('background');
  expect(option).toHaveProperty('color');
  expect(control).toHaveProperty('width');
  expect(control).toHaveProperty('color');
});
