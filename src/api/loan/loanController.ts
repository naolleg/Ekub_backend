import { NextFunction, Request, Response } from "express";
import { loanSchema } from "./loanSchema.js";
import { prisma } from "../../config/prisma.js";

const loanController={
    register: async(req: Request,res: Response,next: NextFunction)=>{
        const data= loanSchema.register.parse(req.body);
        const isLotExist = await prisma.loans.findFirst({
            where:{
                lotId: +data.lotId
            }
        });

        if(!isLotExist){
            return res.status(404).json({
                success: false,
                message: 'lot not found'
            })
        }

        const newLoan = await prisma.loans.create({
            data:{
                amount: +data.amount,
                lotId: +data.lotId,
                userId: +req.user!.id
            }
        });

        return res.status(200).json({
            success: true,
            message: 'register loan',
            data: newLoan
        });
    },
    update: async(req: Request,res: Response,next: NextFunction)=>{
        const data= loanSchema.update.parse(req.body);
        const id = req.params.id;
        //check if exist
        const isLoanExist = await prisma.loans.findFirst({
            where:{
                id: +id,
            }
        });

        if(!isLoanExist){
            return res.status(404).json({
                success: false,
                message: 'loan not found'
            })
        }

        const updatedLoan = await prisma.loans.update({
            where:{
                id: +id
            },
            data:{
                amount: +data.amount
            }
        });

        return res.status(200).json({
            success: true,
            message: 'updated loan',
            data: updatedLoan
        });

    },
    delete: async(req: Request,res: Response,next: NextFunction)=>{
        const id = req.params.id;
        //check if exist
        const isLoanExist = await prisma.loans.findFirst({
            where:{
                id: +id,
            }
        });

        if(!isLoanExist){
            return res.status(404).json({
                success: false,
                message: 'loan not found'
            })
        }

        const deletedLoan = await prisma.loans.delete({
            where:{
                id: +id
            }
        });

        return res.status(200).json({
            success: true,
            message: 'deleted loan',
            data: deletedLoan
        });
    },

}

export default loanController;