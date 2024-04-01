import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ejs from 'ejs';
import User from "./models/user_model.js";
import bcrypt from "bcrypt";  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

// ToDo: set up cors

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/CineLogue")
    .then(()=> console.log("connected to mongo successfuly!"))
    .catch((err)=> console.error("mongo connection error, ", err));


app.get('/', (req,res)=>{
    res.send("home");
})

app.get('/register', (req,res)=> {
    res.render('register');
})

app.get('/login', (req,res)=>{
    res.render('login');
})

app.post('/register', async(req, res)=>{
    console.log(req.body);
    const {password, username, email}= req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username: username, email: email, password: hash
    });
    await user.save();
    res.redirect('/');
   

})

app.post('/login', async(req, res) =>{
    const {password, username} = req.body;
    const user = await User.findOne({username});
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid){
        res.send("You're in!");
    }
    else{
        res.send("oops,couldn't log you in");
    }
})

//listen for incoming requests    
app.listen(PORT, ()=>{
    console.log("Server is listening!"); 
})  