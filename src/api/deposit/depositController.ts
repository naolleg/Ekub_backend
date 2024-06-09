import { NextFunction, Request, Response } from "express";
import { depositSchema } from "./depositSchema.js";
import { prisma } from "../../config/prisma.js";

const depositController={
    register: async (req: Request, res: Response, next: NextFunction) => {
        const data = depositSchema.register.parse(req.body);
        const newDeposit = await prisma.deposits.create({
          data: {
            amount: +data.amount,
            remaining: +data.remaining,
            userId: +req.user!.id,
             
          },
        });
      
        // Get the related Lot
        const lot = await prisma.lots.findFirst({
          where: {
            id: data.lotId, // assuming lotId is provided in the request body
          },
        });
      
        if (!lot) {
          return res.status(404).json({
            success: false,
            message: 'Lot not found',
          });
        }
      
        // Update the remaining amount and remaining day in the Lot
        await prisma.lots.update({
          where: {
            id: lot.id,
          },
          data: {
            remaingAmount: lot.remaingAmount - newDeposit.amount,
            remaingDay: lot.remaingDay - 1, // assuming 1 day is deducted for each deposit
          },
        });
      
        return res.status(200).json({
          success: true,
          message: 'egister deposit',
          data: newDeposit,
        });
      },
    update: async(req: Request,res: Response,next: NextFunction)=>{
        const data = depositSchema.update.parse(req.body);
        const id = req.params.id;
        const isDepositExist = await prisma.deposits.findFirst({
            where:{
                id: +id
            }
        });
        if(!isDepositExist){
            return res.status(404).json({
                success: false,
                message: "deposit not found"
            })
        }

        const updateDeposit = await prisma.deposits.update({
            where: {
                id: +id,
            },
            data:{
                amount: +data.amount!,
                commition: +data.commition!,
                remaining: +data.remaining!
            }
        });

        return res.status(200).json({
            success: true,
            message: 'updated deposit',
            data: updateDeposit
        })

    },
    delete: async(req: Request,res: Response,next: NextFunction)=>{
        const id = req.params.id;
        const isDepositExist = await prisma.deposits.findFirst({
            where:{
                id: +id
            }
        });
        if(!isDepositExist){
            return res.status(404).json({
                success: false,
                message: "deposit not found"
            })
        }
        const deletedDeposit = await prisma.deposits.delete({
            where: {
                id: +id
            }
        });

           return res.status(200).json({
            success: true,
            message: 'deposit deleted sucessfully',
        })
    },

}

export default depositController;