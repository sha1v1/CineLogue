import express from "express";
import bcrypt from 'bcrypt';
import User from "../models/user_model.js";


import ejs from 'ejs'; 

const router = express.Router();

router.get('/register', (req,res)=> {
    res.render('register');
})

router.get('/login', (req,res)=>{
    res.render('login');
})

router.post('/register', async(req, res)=>{
    console.log(req.body);
    const {password, username, email}= req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username: username, email: email, password: hash
    });
    await user.save();
    res.redirect('/');
   

});
/*
 * this is a javadoc comment lmao
 */
router.post('/login', async(req, res) =>{
    const {password, username} = req.body;
    const user = await User.findOne({username});
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid){
        res.send("You're in!");
    }
    else{
        res.send("oops,couldn't log you in");
    }
});

export default router;