import { login } from './mocks/users';
import * as sinon from 'sinon';
import * as chai from 'chai';
import UsersModel from '../database/models/UserModel'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Users', () => {
  describe('Testa Login', () => {
    before(async () => {
     sinon.stub(UsersModel, "findOne")
    .resolves(login as UsersModel);
     after(() => {(UsersModel).restore()})
     let chaiHttpResponse: Response;
    it('Testa se a requisisão POST na rota "/login" retorna um token e um status 200 se bem sucedida', async () => {
      await chai.request(app).post('/login').send(login)
      .end((_req, res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.ownProperty('token');
        })
      })
      it('Se o login não tiver o campo "password", o resultado retornado deverá senviar uma mensagem de erro, com um status http 400', () => {
          chai.request(app).post('/login').send({ email: 'user@user.com' })
          .end((_req, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
            });
         });
      it('Se o login não tiver o campo "email", o resultado retornado deverá enviar uma mensagem de erro, com um status http 400:', () => {
          chai.request(app).post('/login').send({ password: "secret_user" })
          .end((_req, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
          });
      });
      });
  });
  })
