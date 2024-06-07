import { NextFunction, Request, Response } from "express";
import { categorySchema } from "./categorySchema.js";
import { prisma } from "../../config/prisma.js";

const categoryController={
    register: async(req: Request,res: Response,next: NextFunction)=>{
        console.log("JKHJDSDSJ");
        
        const data = categorySchema.register.parse(req.body);
        const totalAmount= req.body.totalCount* (req.body.amount);
        const totalCommission=req.body.commision*req.body.totalCount
        const newCategory = await prisma.category.create({
            data:{
                name: data.name,
                amount: data.amount,
                commission: req.body.commission,
                totalCount: req.body.totalCount,
                totalAmount: totalAmount,
                totalCommission: totalCommission,
            }
        });
        return res.status(200).json({
            success: true,
            message: 'register category',
            data: newCategory
        })
    },
    update: async(req: Request,res: Response,next: NextFunction)=>{
        const id = req.params.id;
        const data = categorySchema.update.parse(req.body);
            const totalAmount= req.body.totalCount* req.body.amount;
            const totalCommission=req.body.commission*req.body.totalCount
        const categoryExist = await prisma.category.findFirst({where:{
            id: +id,
        }})
        if(!categoryExist){
            return res.status(404).json({
                success: false,
                message: "category not found"
            })
        }

        const updateCategory = await prisma.category.update({
            where:{
                id: +id,
            },     
         
                data:{
                    name: data.name,
                    amount: data.amount,
                    commission: req.body.commission,
                    totalCount: req.body.totalCount,
                    totalAmount: totalAmount,
                    totalCommission: totalCommission,
                }
        });

        return res.status(200).json({
            success: true,
            message: 'updated category',
            data: updateCategory
        })
    },
    getAll:async(req: Request,res: Response,next: NextFunction)=>{

        try {
            const category= await prisma.category.findMany()
            res.status(200).json({ success: true,
              message: "all category",category});
          } catch (error) {
            throw(error);
          }
        },

    delete: async(req: Request,res: Response,next: NextFunction)=>{
        const id = req.params.id;
        const categoryExist = await prisma.category.findFirst({where:{
            id: +id,
        }})
        if(!categoryExist){
            return res.status(404).json({
                success: false,
                message: "category not found"
            })
        }
        const deletedCategory = await prisma.category.delete({
            where: {
                id: +id
            }
        });

        return res.status(200).json({
            success: true,
            message: 'category deleted sucessfully',
            data:deletedCategory
        })
    },

}
export default categoryController;