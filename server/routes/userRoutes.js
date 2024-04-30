import express from "express";
import bcrypt from 'bcrypt';
import User from "../models/user_model.js";
import dotenv from 'dotenv';
import ejs from 'ejs'; 
import {userLogin, userRegister} from '../controller/userController.js';
import {authenticate} from '../middleware/auth.js';

dotenv.config();


const router = express.Router();

router.get('/secret', authenticate, (req, res)=>{
    res.send("protected route!");
});

router.get('/register', (req,res)=> {
    res.render('register');
})

router.get('/login', (req,res)=>{
    res.render('login');
})

router.post('/register', userRegister);
/*
 * this is a javadoc comment lmao
 */
router.post('/login', userLogin);

export default router;