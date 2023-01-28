import * as express from 'express';
import LoginController from '../controllers/loginController';

const router = express.Router();

const loginRouter = new LoginController();

router.get('/validate', (req, res) => loginRouter.validate(req, res));

router.post('/', (req, res) => loginRouter.doLogin(req, res));

export default router;
