
import JWT  from 'jsonwebtoken';
import { jwt } from '../config/config.js';


export default function authMiddleware(req,res,next){
    try {
        const userToken = req.headers.authorization

        if(!userToken || !userToken.toString().startsWith('Bearer ')) return res.status(403).json({
            msg:"Invalid Request/ Invalid Token"
        });
        const token = userToken.split(" ")[1]
        const verify = JWT.verify(token,jwt)
        console.log(verify)
        req.username =verify;
        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            msg:"Invalid Token"
        });
    }
} 