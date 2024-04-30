import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

async function authenticate(req, res, next){
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader && authHeader.split(' ')[1];  // Bearer TOKEN

        if (!token) {
            return res.sendStatus(401); // Unauthorized: No token provided
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            console.log('here');
            next(); // Proceed to the next middleware or the route handler
        } catch (err) {
            return res.status(403).send({message: "invalid token"}); // Forbidden: Invalid token
        }
    }
    else{
        res.status(401).send({message: "no auth header"});
    }

};

export {authenticate};