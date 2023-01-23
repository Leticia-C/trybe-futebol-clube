import * as express from 'express';
import LoginService from '../service/loginService';
import LoginController from '../controllers/loginController';
import loginValidation from '../controllers/middleware/loginValidation';

const router = express.Router();
const loginService = new LoginService();
const loginRouter = new LoginController(loginService);

router.post('/', loginValidation, loginRouter.doLogin);

export default router;
