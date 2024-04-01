import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username cannot be empty"],
        unique: true,
        trim: true 
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password:{
        type: String,
        required: [true, "Password cannot be empty"]
        
    }
    
})

const User = mongoose.model('User', userSchema);
export default User;