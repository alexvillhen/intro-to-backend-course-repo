import { Router } from 'express';
import { registerUser, getValidation} from '../controllers/user.controller.js';

const router = Router();

router.route('/register')
    .post(registerUser)
    .get(getValidation);


export default router;