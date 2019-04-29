import {
  validatePasswordLength, validateEmail, validatePhoneNumber
} from '../utils/Validation';

test('validate short password returns true for error', () => {
  const password = 'short';
  const result = validatePasswordLength(password);
  expect(result).toContain(true);
});

test('validate valid password returns false for error', () => {
  const password = 'Passw0rds';
  const result = validatePasswordLength(password);
  expect(result).toContain(false);
});

test('validate valid email returns false for error', () => {
  const email = 'user@user.com';
  const result = validateEmail(email);
  expect(result).toContain(false);
});

test('validate valid email returns true for error', () => {
  const email = 'user.com';
  const result = validateEmail(email);
  expect(result).toContain(true);
});

test('validate valid phone number length returns false for error', () => {
  const phone = '23423423423';
  const result = validatePhoneNumber(phone);
  expect(result).toContain(false);
});

test('validate invalid phone number length returns true for error', () => {
  const phone = 'mynumber123';
  const result = validatePhoneNumber(phone);
  expect(result).toContain(true);
});
