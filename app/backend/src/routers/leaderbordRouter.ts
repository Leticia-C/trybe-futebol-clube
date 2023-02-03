import * as express from 'express';
import LeaderbordController from '../controllers/leaderboardController';

const router = express.Router();

const leaderbordRouter = new LeaderbordController();

router.get('/home', (req, res) => leaderbordRouter.getHomeMatches(req, res));

export default router;
