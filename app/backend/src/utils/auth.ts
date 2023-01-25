import * as jwt from 'jsonwebtoken';
import IUsers, { ILogin } from '../interfaces/IUsers';

require('dotenv/config');

export const secret: string = process.env.JWT_SECRET || 'seusecretdetoken';

const config: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data: ILogin | IUsers | null) => jwt.sign(
  { data },
  secret,
  config as jwt.SignOptions,
);

export const veryfyToken = (token: string) => jwt.verify(token as string, secret) as jwt.JwtPayload;

export default createToken;
