/* import { allMatches } from './mocks/matches';
import * as sinon from "sinon";
import * as chai from "chai";
import MatchesModel from "../database/models/MatchesModel";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";
import IMatches from '../interfaces/IMatches';

chai.use(chaiHttp);

const { expect } = chai;
describe("Testa Matches", () => {
  describe("Testa toda rota de Matches", () => {
    before(async () => {
       return sinon.stub(MatchesModel, "findAll")
            .resolves();
       });
     // let chaiHttpResponse: Response;
      it('Testa se a requisição GET na rota "/matches" retorna todos os times de futebol', async () => {
        const http = await chai
          .request(app)
          .get("/matches")
          .send(allMatches)

            expect(http.status).to.be.equal(200);
            expect(http.body).to.be.deep.equal(allMatches);
      });
  /*     it('Testa se a requisição GET na rota "/teams/id" retornao time com aquele id', async () => {
        const http = await chai
        .request(app)
        .get("/teams/7")
          .send({ email: "user@user.com" })

            expect(http.status).to.be.equal(200);
            expect(http.body).to.deep.equal(teamById);
      });
    });
});
 */
