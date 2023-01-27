import * as express from 'express';
import MatchesController from '../controllers/matchesController';

const router = express.Router();

const matchesRouter = new MatchesController();

router.get('/', (req, res) => matchesRouter.getMatches(req, res));

export default router;
