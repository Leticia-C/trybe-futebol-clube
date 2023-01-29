import * as express from 'express';
import { Request, Response } from 'express';
import loginValidation from '../middleware/loginValidation';
import LoginController from '../controllers/loginController';

const router = express.Router();

const loginRouter = new LoginController();

router.get('/validate', (req, res) => loginRouter.validate(req, res));

router.post('/', loginValidation, (req:Request, res: Response) => loginRouter.doLogin(req, res));

export default router;
