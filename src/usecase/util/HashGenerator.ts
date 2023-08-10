import * as crypto from 'crypto';

export class HashGenerator {
  static async generate(): Promise<string> {
    return crypto.randomBytes(20).toString('hex');
  }
}
