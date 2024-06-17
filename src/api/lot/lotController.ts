import { NextFunction, Request, Response } from "express";
import { lotSchema } from "./lotSchema.js";
import { prisma } from "../../config/prisma.js";
import { url } from "inspector";
import { nullable } from "zod";

const lotController={
    register: async(req: Request,res: Response,next: NextFunction)=>{
        console.log("wfedc");
        
        const data = lotSchema.register.parse(req.body);
        const categoryExist = await prisma.category.findFirst({where:{
            id: +data.categoryId,
        }})
        if(!categoryExist){
            return res.status(404).json({
                success: false,
                message: "category not found"
            })
        }
        console.log(categoryExist);
        
        const newLot = await prisma.lots.create({
            data:{
                isCompleted: false,
                categoryId: data.categoryId,
                registeredBy: req.user!.id ,  
                remaingDay: +categoryExist.totalCount,
                remaingAmount: +categoryExist.totalAmount,
                profile:{
                    create:{
                        firstName: data.firstName,
                        middleName: data.middleName,
                        lastName: data.lastName,
                        gender: data.gender,
                        userId: req.user!.id,
                        address:{
                            create:{
                               city:data.city,
                               subcity:data.subcity, 
                               wereda:data.wereda,
                            }
                        }
                    }
                }
            }
        });


        return res.status(200).json({
            success: true,
            message: 'lot register successfully',
            data: newLot
        });
    },
    update: async(req: Request,res: Response,next: NextFunction)=>{
        const data = lotSchema.update.parse(req.body);
        const id = req.params.id;
        const isLotExist = await prisma.lots.findFirst({
            where: {
                id:+id,
            }
        });
        if(!isLotExist){
            return res.status(404).json({
                success: false,
                message: "lot not found",
            });
        }
        const updatedLot = await prisma.lots.update({
            where:{
                id: +id,
            },
            data: {
                isCompleted: data.isCompleted,
                remaingAmount: data.remaingAmount,
                remaingDay: data.remaingDay, 
            }
        });
        return res.status(200).json({
            success: true,
            message: "loto successfully updated",
            data: updatedLot
        });
    },
    updateProfile: async(req: Request,res: Response,next: NextFunction)=>{
        const data = lotSchema.updateProfile.parse(req.body);
        const id = req.params.id;
        const isLotExist = await prisma.lots.findFirst({
            where: {
                id:+id,
            }
        });
        if(!isLotExist){
            return res.status(404).json({
                success: false,
                message: "lot not found",
            });
        }
        const isProfileExist = await prisma.profile.findFirst({
            where: {
                id: +isLotExist.id
            }
        });
        if(!isProfileExist){
            return res.status(404).json({
                success: false,
                message: "lot profile not found",
            });
        }
        const updatedProfile = await prisma.profile.update({
            where:{
                id: +isProfileExist.id,
            },
            data:{
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                gender: data.gender,
                userId: req.user!.id,
              
            }
        });
        

     
        return res.status(200).json({
            success: true,
            message: "profile successfully updated",
            data: updatedProfile
        })
    },
    delete: async(req: Request,res: Response,next: NextFunction)=>{
        console.log("dsjhfbc ");
        
        const id = req.params.id;
        const isLotExist = await prisma.lots.findFirst({
            where: {
                id:+id,
            }
        });
        if(!isLotExist){
            return res.status(404).json({
                success: false,
                message: "lot not found",
            });
        }
        const deletedLot = await prisma.lots.delete({
            where:{
                id: +id,
            }
        });
        return res.status(200).json({
            success: true,
            message: "lot successfully deleted",
        })
    },
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const lots = await prisma.lots.findMany({
            include: {
              profile: {
                select: {
                  firstName: true,
                  middleName:true,
                  lastName:true,
                  address:true
                },
              },
            },
          });
          res.status(200).json({ success: true, message: "all lots", lots });
        } catch (error) {
          throw error;
        }
      },

}

export default lotController;