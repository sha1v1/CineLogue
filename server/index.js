import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ejs from 'ejs';
import userRouter from './routes/userRoutes.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

//ToDo: set up cors
  

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/CineLogue")
    .then(()=> console.log("connected to mongo successfuly!"))
    .catch((err)=> console.error("mongo connection error, ", err));

    app.use((req, res, next) => {
        const origin = req.headers.origin;
        // console.log('Request Origin:', origin);
        next();
    });
app.get('/', (req,res)=>{
    
    res.send("home");
})

//set up user routes
app.use('/auth/', userRouter);

//listen for incoming requests    
app.listen(PORT, ()=>{
    console.log("Server is listening!"); 
})  