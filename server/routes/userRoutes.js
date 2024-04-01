import express from "express";
const router = express.Router();  
import ejs from 'ejs'; 


router.get('/login', (req,res)=>{
    res.send('reached login via router!');

})

router.get()