import { isPhone } from '../../phone';

describe('isPhone', () => {
  test('should return true for a valid phone number', () => {
    expect(isPhone('+1234567890')).toBe(true);
  });

  test('should return false for an invalid phone number', () => {
    expect(isPhone('1234567890')).toBe(false);
  });
});
