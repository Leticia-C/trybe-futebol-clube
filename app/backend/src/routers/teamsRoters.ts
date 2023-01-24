import * as express from 'express';
import TeamController from '../controllers/teamController';

const router = express.Router();

const teamsRouter = new TeamController();

router.get('/', (req, res) => teamsRouter.getallTeams(req, res));

router.get('/:id', (req, res) => teamsRouter.getTeamById(req, res));

export default router;
