import {
  validatePasswordLength, validateEmail, validatePhoneNumber, confirmPasswords
} from '../utils/authentication/Validation';

test('validate short password returns true for error', () => {
  const password = 'short';
  const result = validatePasswordLength(password);
  expect(result).toContain(true);
});

test('validate invalid password format returns true for error', () => {
  const password = 'shortpassword';
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

test('validate invalid email returns true for error', () => {
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

test('validates two passwords and returns false error for matching passwords', () => {
  const value1 = 'passw0rD';
  const value2 = 'passw0rD';
  const result = confirmPasswords(value1, value2);
  expect(result).toContain(false);
});

test('validates two passwords and returns true error for non-matching passwords', () => {
  const value1 = 'passw0rD';
  const value2 = 'qwertyQW12';
  const result = confirmPasswords(value1, value2);
  expect(result).toContain(true);
});
