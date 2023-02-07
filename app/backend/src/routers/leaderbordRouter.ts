import * as express from 'express';
import LeaderbordController from '../controllers/leaderboardController';

const router = express.Router();

const leaderbordRouter = new LeaderbordController();

router.get('/home', (req, res) => leaderbordRouter.getHomeTeamsMatches(req, res));

router.get('/away', (req, res) => leaderbordRouter.getAwayTeamsMatches(req, res));

export default router;
