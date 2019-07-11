import validateProductName from '../../../utils/products/ProductNameValidation';

test('validate product name on an approved product', () => {
  const products = [
    { id: 1, productName: 'one', isApproved: false },
    { id: 2, productName: 'two', isApproved: true }
  ];
  const value = 'two';
  const results = validateProductName(products, value);
  expect(results).toContain('two already exists and has been approved');
});

test('validate product name on an unapproved product', () => {
  const products = [
    { id: 1, productName: 'one', isApproved: false },
    { id: 2, productName: 'two', isApproved: true }
  ];
  const value = 'one';
  const results = validateProductName(products, value);
  expect(results).toContain('one already exists and is pending approval');
});


test('validate product name on a new product', () => {
  const products = [
    { id: 1, productName: 'one', isApproved: false },
    { id: 2, productName: 'two', isApproved: true }
  ];
  const value = 'three';
  const results = validateProductName(products, value);
  expect(results).toContain('');
});
