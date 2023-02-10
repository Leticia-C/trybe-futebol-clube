import { allMatches } from './mocks/matches';
import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { afterEach } from 'mocha';
import { inProgress } from './mocks/matchesinProgress';

chai.use(chaiHttp);

const { expect } = chai;
describe("Testa Matches", () => {
  describe("Testa toda rota de Matches", () => {
    afterEach(()=>{
      sinon.restore();
    })

    it('Testa se a requisição GET na rota "/matches" retorna todos os times de futebol', async () => {
      const http = await chai.request(app).get("/matches") .send()

      expect(http.status).to.be.equal(200);
      expect(http.body).to.be.deep.equal(allMatches);
    });

    it('Testa se a requisição GET na rota "/matches" de forma que seja possível filtrar as partidas em andamento ', async () => {
      const http = await chai.request(app).get("/matches").query('inProgress=true').send()

      expect(http.status).to.be.equal(200);
      expect(http.body).to.be.deep.equal(inProgress);
    });

    it('Testa se a requisição GET na rota "/matches" de forma que seja possível filtrar as partidas finalizadas ', async () => {
      const http = await chai.request(app).get("/matches").query('inProgress=false').send()

      expect(http.status).to.be.equal(200);
      expect(http.body).to.be.deep.equal(inProgress);
    });
  });
});
