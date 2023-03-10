import * as sinon from "sinon";
import * as chai from "chai";
import TeamModel from "../database/models/TeamModel";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { allTeams, teamById } from "./mocks/team";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa Teams", () => {
  describe("Testa toda rota de Teams", () => {
    before(async () => {
      sinon.stub(TeamModel, "findAll")
        .resolves(allTeams as TeamModel[]);
    });
    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se a requisição GET na rota "/teams" retorna todos os times de futebol', async () => {
      const http = await chai.request(app).get("/teams")

      expect(http.status).to.be.equal(200);
      expect(http.body).to.be.deep.equal(allTeams);
    });

    it('Testa se a requisição GET na rota "/teams/id" retornao time com aquele id', async () => {
      sinon.stub(TeamModel, "findByPk")
        .resolves(teamById as TeamModel);
      const http = await chai.request(app).get("/teams/7")

      expect(http.status).to.be.equal(200);
      expect(http.body).to.deep.equal(teamById);
    });
  });
})
