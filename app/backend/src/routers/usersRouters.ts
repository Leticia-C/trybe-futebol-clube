import * as express from 'express';
import loginController from '../controllers/loginController';
import loginValidation from '../controllers/middleware/loginValidation';

const router = express.Router();

router.post('/', loginController, loginValidation);

export default router;
