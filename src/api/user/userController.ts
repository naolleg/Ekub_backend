import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import userSchema from "./userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { STATUS } from "@prisma/client";
import { SECRET } from "../../config/secrets.js";
import { generatePassword } from "../../util/generateor.js"
import { sendEmail } from "../../util/emailSender.js";

const userController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
  const data = userSchema.register.parse(req.body);
  //check if the email exists
  const isUserExist = await prisma.users.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (isUserExist) {
    return res.status(404).json({
      success: false,
      message: "Email is already in use",
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const newUser = await prisma.users.create({
    data: {

      email: data.email,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      gender:data.gender,
      password: hashedPassword,
      activeStatus: STATUS.ACTIVE,
      
    },
  });

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
},
  

  login: async (req: Request, res: Response, next: NextFunction) => {
    const data = userSchema.login.parse(req.body);
    console.log("sdfvsf");
    
    const user = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
   
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      return res.status(404).json({
        success: false,
        message: "password is incorrect",
      });
    }
    if (user.activeStatus != STATUS.ACTIVE) {
      return res.status(404).json({
        success: false,
        message: "user is not active",
      });
    }
    console.log(user);
    
    const payload = {
      id: user.id,
      firstName: user.firstName,
    };
    console.log("kdajkn");
    
    const token = await jwt.sign(payload, SECRET!);

    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: user,
      token: token,
    });
  },
  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await prisma.users.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    console.log("sdfvsf");
   const data = userSchema.changePassword.parse(req.body);
   if(user.password!=data.password){
    return res.status(404).json({
      success: false,
      message: "the current password is wrong",
    });

   }
    if (data.newpassword != data.conformpassword) {
      return res.status(404).json({
        success: false,
        message: "new passwords does not match",
      });
    }
    
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const updateUser = await prisma.users.update({
      where: {
        id: user!.id,
      },
      data: {
        password: password,
      },
    });


    return res.status(200).json({
      success: true,
      message: "password updated successfully",
      data: updateUser,
    });
  },
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
  
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    const newPassword = generatePassword();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
  
    const updateUser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
  
    sendEmail(user.email, newPassword);
  
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: updateUser,
    });
  },
  updateUserInfo:async (req: Request, res: Response, next: NextFunction) => {
    console.log("jdh");
    
    const id = req.params.id;
    const data = userSchema.updateUserInfo.parse(req.body);
    const user = await prisma.users.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const updateUser = await prisma.users.update({
      where: {
        id: +id,
      },
      data: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        gender:data.gender,
      },
    });

    return res.status(200).json({
      success: true,
      message: "user info updated successfully",
      data: updateUser,
    });
  },
  changeStatus: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await prisma.users.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const updateUser = await prisma.users.update({
      where: {
        id: +id,
      },
      data: {
        activeStatus: req.body.activeStatus,
      },
    });

    return res.status(200).json({
      success: true,
      message: "status updated successfully",
      data: updateUser,
    });
  },
  getAll:async(req: Request,res: Response,next: NextFunction)=>{

    try {
        const users= await prisma.users.findMany()
        res.status(200).json({ success: true,
          message: "all Users",users});
      } catch (error) {
        throw(error);
      }
    },
};
export default userController;
