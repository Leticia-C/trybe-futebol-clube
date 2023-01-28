import * as express from 'express';
import { Request, Response } from 'express';
import tokenValidation from '../middleware/tokenValidation';
import MatchesController from '../controllers/matchesController';

const router = express.Router();

const matchesRouter = new MatchesController();

router.post('/', tokenValidation, (req: Request, res: Response) => matchesRouter.create(req, res));

router.get('/', (req, res) => matchesRouter.getMatches(req, res));

export default router;
