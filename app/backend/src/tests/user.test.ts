import { veryfyToken } from './../utils/auth';
import { login } from "./mocks/users";
import * as sinon from "sinon";
import * as chai from "chai";
import UsersModel from "../database/models/UserModel";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;
describe("Testa Login", () => {
  before(async () => {
    sinon.stub(UsersModel, "findOne")
      .resolves(login as UsersModel);
  });
  after(() => {
    (UsersModel.findOne as sinon.SinonStub).restore();
  })
  it('Testa se a requisição POST na rota "/login" retorna um token e um status 200 se bem sucedida', async () => {
    chaiHttpResponse = await chai.request(app).post('/login')
      .set('Authorization', 'veryfyToken')
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.ownProperty("token");
  });
  it('Se o login não tiver o campo "password", o resultado retornado deverá senviar uma mensagem de erro, com um status http 400', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "user@user.com" })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: "All fields must be filled",
    });
  });
  it('Se o login não tiver o campo "email", o resultado retornado deverá enviar uma mensagem de erro, com um status http 400:', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/login")
      .send({ password: "secret_user" })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled", });
    it("Se a senha estiver incorreta, o resultado retornado deverá enviar uma mensagem de erro, com um status http 401:", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ password: "123456789" })

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled", });
    });
    it("Se o email estiver incorreta, o resultado retornado deverá enviar uma mensagem de erro, com um status http 401:", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: "email_incorreto%gmail.com" })
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled", });
    });
  });
  before(async () => {
    sinon.stub(UsersModel, "findByPk")
      .resolves({ role: "admin" } as UsersModel);
  });
  after(async () => {
    (UsersModel.findByPk as sinon.SinonStub).restore();
  })
  it("Testa se a rola /login/validate retorna o role admin:", async () => {
    chaiHttpResponse = (await chai.request(app).get("/login/validate"))
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ role: "admin" });
  });
});