import { login, token } from './mocks/users';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UserModel';

import { Response } from 'superagent';
import { endianness } from 'os';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Users', () => {
describe('Testa Login', () => {
 let response = Response;
  before(async () => {
   sinon.stub(Users, "findOne")
  .resolves(login);
   after(() => {(Users as sinon.SinonStub).restore()})

  it('Testa se a requisisão POST retorna um status 201', async () => {
    await chai.request(app).post('/login').send(login)
    .end((_req, res) => {
    expect(res.status).to.be.equal(200);
    expect(res.body).to.deep.equal(token);
      })
    })
  it('Erro ao tentar login sem um dos campos', () => {
    chai.request(app).post('/login').send({ password: "secret_user" })
    .end((_req, res) => {
    expect(res.status).to.be.equal(400);
    expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
      });
   });
   });
});
});
