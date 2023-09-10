import express from 'express';

const router=express.Router();

import UserController from '../controller/userController.js';
//public routes 

router.post('/register',UserController.userRegistration)
router.post('/login',UserController.userLogin)
router.post('/upload',UserController.uservideo)

//protected routes

export default router;