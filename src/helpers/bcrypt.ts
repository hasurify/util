import { compare, genSalt, hash } from 'bcryptjs';

export const verifyPassword = async (
  password: string,
  encryptedPassword: string
) => {
  return compare(password, encryptedPassword);
};

/**
 * generateHashPassword
 * @param password string
 * @returns Promise<string>
 */
export const generateHashPassword = async (
  password: string
): Promise<string> => {
  const salt = await genSalt(10);
  return hash(password, salt);
};
