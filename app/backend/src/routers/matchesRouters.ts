import * as express from 'express';
import { Request, Response } from 'express';
import MatchesController from '../controllers/matchesController';
import tokenValidate from '../utils/auth';

const router = express.Router();

const matchesRouter = new MatchesController();

router.get('/', (req, res) => matchesRouter.getMatches(req, res));

router.post(
  '/',
  tokenValidate,
  (req: Request, res: Response) => matchesRouter.create(req, res),
);

export default router;
