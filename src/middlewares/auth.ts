
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/secrets.js";
import { prisma } from "../config/prisma.js";
import { ROLE, Users } from "@prisma/client";


const isAuthUser:any = async (req:Request,res:Response,next:NextFunction)=>{
   const token = req.headers.authorization;
   if(!token){
     return;
   }
   try {
      const payload = await jwt.verify(token, SECRET!) as any;
      const user =  await prisma.users.findUnique({
         where:{
            id:(payload).id
         }
      })
      if(!user){
         return res.status(404).json({success: false,message: 'user not found',});
      }
      req.user =user;
    
      next();
   } catch (error) {
    return res.status(403).json({success: false,message: 'invalide token',});
   }

}

const isAdmin:any = async (req:Request,res:Response,next:NextFunction)=>{
   const  admin : Users |undefined = req.user;
   if(admin && admin.role !== ROLE.ADMIN){
    return res.status(401).json({success: false,message: 'user not admin',});
   }
   next();
}

export {isAuthUser,isAdmin};