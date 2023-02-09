import * as jwt from 'jsonwebtoken';
import IUsers, { ILogin } from '../interfaces/IUsers';

require('dotenv/config');

export const secret: string = process.env.JWT_SECRET || 'seusecretdetoken';

const config: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export const createToken = (data: ILogin | IUsers | undefined) => jwt.sign(
  { data },
  secret,
  config as jwt.SignOptions,
);

export const veryfyToken = (token: string) => jwt.verify(token, secret) as jwt.JwtPayload;

