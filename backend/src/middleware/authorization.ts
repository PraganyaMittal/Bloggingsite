import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import User from '../model/user'

export const Auth = async (req : Request , res : Response, next : NextFunction) => {
        console.log("working")
        try{
    
            const token = req.cookies.auth_token
            if(!token)
                throw new Error("You need to Login")
            const decoded : any = verify(token, process.env.PRIVATE_KEY! );
            const user = decoded.userid

            console.log(user)
            const data : any = await User.findById(user) 

            if(data._id){
                next();
            }else{
                throw new Error("Token expired");
            }
    
            
            
        }catch(error){
            if(error instanceof Error){
                res.json({
                    message : error.message,
                    success : false,
                });
            }
        }
    }
