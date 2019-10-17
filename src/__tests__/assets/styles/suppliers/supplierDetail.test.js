import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { supplierDetailStyles } from '../../../../assets/styles/suppliers/supplierDetail';

test('supplier detail styles', () => {
  const theme = createMuiTheme();
  const styles = supplierDetailStyles(theme);
  expect(styles).toHaveProperty('root');
  expect(styles).toHaveProperty('paper');
});
