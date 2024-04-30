import bcrypt from 'bcrypt';
import User from "../models/user_model.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

async function userLogin(req, res){
    try{
        const {password, username} = req.body;

        const fetchedUser = await User.findOne({username});
    
        //if user not found
        if(!fetchedUser || !(await bcrypt.compare(password, fetchedUser.password))){
            res.status(404).send({message: 'User not found'});
        }

        //if user found
        const jwtToken = jwt.sign({userId: fetchedUser._id}, process.env.JWT_SECRET, {
            expiresIn: '2h' 
        });
        res.status(200).send({message: 'logged in succesfully', jwtToken});
        console.log(res);
        
        
    }catch(error){
        res.status(500).send({message: error.message});
    }
};


async function userRegister(req, res){
    try{
        const { password, username, email } = req.body;
        
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).send({message: "Email already in use"});
        }

        const hash = await bcrypt.hash(password, 12);

        const newUser = new User({
            username: username,
            email: email,
            password: hash
        });

        const savedUser = await newUser.save();
        
        const userToSend = {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        }

        // const jwtToken = jwt.sign({userId: userToSend._id}, JWT_SECRET, {
        //     expiresIn: '5s' 
        // });

        res.status(200).send({
            message: "user created successfully",
            user: userToSend
        });

    } catch(err){
        res.status(500).send({
            message: "Server error during user registration.",
            error: err.message,
          });
    }
    // const {password, username, email}= req.body;
    // const hash = await bcrypt.hash(password, 12);
    // const user = new User({
    //     username: username, email: email, password: hash
    // });
    // await user.save();
    // res.redirect('/');
}

export {userLogin, userRegister};

