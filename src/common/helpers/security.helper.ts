import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';

export async function generateSalt(): Promise<string> {
  const salt = bcrypt.genSaltSync(10);
  return await argon2.hash(salt);
}

export async function generateHash(password: string, salt: string): Promise<string> {
  return await bcrypt.hash(password, salt);
}
