import * as express from 'express';
// mport LoginService from '../service/loginService';
import LoginController from '../controllers/loginController';
import loginValidation from '../controllers/middleware/loginValidation';

const router = express.Router();

const loginRouter = new LoginController();

router.post('/', loginValidation, (req, res) => loginRouter.doLogin(req, res));

export default router;
