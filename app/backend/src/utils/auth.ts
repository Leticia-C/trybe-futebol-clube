import * as jwt from 'jsonwebtoken';
import IUsers, { ILogin } from '../interfaces/IUsers';

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const config: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data: ILogin | IUsers | null) => jwt.sign({ data }, secret, config);

export default createToken;
