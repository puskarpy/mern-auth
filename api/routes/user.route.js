import express from 'express'
import { handleSignup, handleSignin, handleLogout, getMe } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/user.middleware.js';

const router = express.Router()

router.post('/signup', handleSignup);
router.post('/signin', handleSignin);
router.get('/logout', isLoggedIn ,handleLogout);
router.get('/me', isLoggedIn ,getMe);

export default router