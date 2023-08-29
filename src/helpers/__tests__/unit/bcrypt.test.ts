import { compare, genSalt, hash } from 'bcryptjs';
import { verifyPassword, generateHashPassword } from '../../bcrypt';

jest.mock('bcryptjs');

describe('verifyPassword', () => {
  test('should call bcryptjs.compare with the correct arguments', async () => {
    // Arrange
    const password = 'password';
    const encryptedPassword = 'encryptedPassword';

    // Act
    await verifyPassword(password, encryptedPassword);

    // Assert
    expect(compare).toHaveBeenCalledWith(password, encryptedPassword);
  });

  test('should return the result of bcryptjs.compare', async () => {
    // Arrange
    const expectedResult = true;
    (compare as jest.Mock).mockResolvedValue(expectedResult);

    const password = 'password';
    const encryptedPassword = 'encryptedPassword';

    // Act
    const result = await verifyPassword(password, encryptedPassword);

    // Assert
    expect(result).toBe(expectedResult);
  });
});

describe('generateHashPassword', () => {
  test('should call bcryptjs.genSalt with the correct arguments', async () => {
    const password = 'password';

    await generateHashPassword(password);

    expect(genSalt).toHaveBeenCalledWith(10);
  });

  test('should call bcryptjs.hash with the correct arguments', async () => {
    const password = 'password';
    const salt = 'salt';

    (genSalt as jest.Mock).mockResolvedValue(salt);

    await generateHashPassword(password);

    expect(hash).toHaveBeenCalledWith(password, salt);
  });

  test('should return the result of bcryptjs.hash', async () => {
    const password = 'password';
    const salt = 'salt';
    const expectedResult = 'hashedPassword';

    (genSalt as jest.Mock).mockResolvedValue(salt);
    (hash as jest.Mock).mockResolvedValue(expectedResult);

    const result = await generateHashPassword(password);

    expect(result).toBe(expectedResult);
  });
});
