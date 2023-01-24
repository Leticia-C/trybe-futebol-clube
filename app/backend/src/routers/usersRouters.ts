import * as express from 'express';
import LoginController from '../controllers/loginController';
import loginValidation from '../middleware/loginValidation';

const router = express.Router();

const loginRouter = new LoginController();

router.post('/', loginValidation, (req, res) => loginRouter.doLogin(req, res));

router.get('/validate', loginValidation, (req, res) => loginRouter.validate(req, res));

export default router;
