import { NextFunction, Request, Response } from "express";
import { loanSchema } from "./loanSchema.js";
import { prisma } from "../../config/prisma.js";
import { number } from "zod";

const loanController={
    register: async (req: Request, res: Response, next: NextFunction) => {
        const data = loanSchema.register.parse(req.body);
        const isLotExist = await prisma.loans.findFirst({
          where: {
            lotId: +data.lotId,
          },
        });
      
        if (isLotExist) {
          // Calculate total loan amount taken by user for this lot
          const totalLoanAmount = await prisma.loans.aggregate({
            where: {
              lotId: +data.lotId,
              userId: +req.user!.id,
            },
            _sum: {
              amount: true,
            },
          });
      
          // Calculate total deposit amount made by user for this lot
          const totalDepositAmount = await prisma.deposits.aggregate({
            where: {
              lotId: +data.lotId,
              userId: +req.user!.id,
            },
            _sum: {
              amount: true,
            },
          });
          const totalLoan:any=totalLoanAmount._sum.amount ?? 0 + +data.amount
          const totalDeposit:any=totalDepositAmount._sum.amount 
          // Check if new loan amount + total loan amount exceeds half of total deposit amount
          if (totalLoan > totalDeposit / 2) {
            return res.status(400).json({
              success: false,
              message: 'Loan amount exceeds half of total deposit amount',
            });
          }
        } else {
          // Calculate total deposit amount made by user for this lot
          const totalDepositAmount = await prisma.deposits.aggregate({
            where: {
              lotId: +data.lotId,
              userId: +req.user!.id,
            },
            _sum: {
              amount: true,
            },
          });
      const totalDeposit:any=totalDepositAmount._sum.amount;
          // Check if new loan amount exceeds half of total deposit amount
          if (data.amount > totalDeposit/ 2) {
            return res.status(400).json({
              success: false,
              message: 'Loan amount exceeds half of total deposit amount',
            });
          }
        }
      
        const newLoan = await prisma.loans.create({
          data: {
            amount: +data.amount,
            lotId: +data.lotId,
            userId: +req.user!.id,
          },
        });
      
        return res.status(200).json({
          success: true,
          message: 'egister loan',
          data: newLoan,
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