import { NextFunction, Request, Response } from "express";
import { depositSchema } from "./depositSchema.js";
import { prisma } from "../../config/prisma.js";

const depositController={
    register: async (req: Request, res: Response, next: NextFunction) => {
        const data = depositSchema.register.parse(req.body);
        const lot = await prisma.lots.findFirst({
          where: {
            id: data.lotId, 
          },
        });
      
        if (!lot) {
          return res.status(404).json({
            success: false,
            message: 'Lot not found',
          });
        }
      
        const categoryExist = await prisma.category.findFirst({where:{
          id: +data.catgoryId,
      }})
      if(!categoryExist){
          return res.status(404).json({
              success: false,
              message: "category not found"
          })
      }
      if (lot.isCompleted==true){
        return res.status(404).json({
          success: false,
          message: "lot has completed depposit"
      })
  }
  //this is for previous remaining to be put as unchangable input extract it from the privious lot deposit
  const previousDeposit = await prisma.deposits.findFirst({
    where: {
      lotId: data.lotId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  let previousRemaining = 0;
  if (previousDeposit) {
    previousRemaining = +previousDeposit.remaining;
  }
      
        const newDeposit = await prisma.deposits.create({
    data:{
                                     
         userId:req.user!.id,
         amount:categoryExist.amount,
         commission:categoryExist.commission,
         previousRemaining:previousRemaining,
         remaining:data.remaining,
         lotId:data.lotId,
         catgoryId:data.catgoryId

}
     })
        
        console.log("dgrgbdfvc");
        
      
        
        await prisma.lots.update({
          where: {
            id: lot.id,
          },
          data: {
            remaingAmount: +lot.remaingAmount - (+newDeposit.amount),
            remaingDay: lot.remaingDay - 1,
          },
        });
        if (+lot.remaingAmount - (+newDeposit.amount) <= 0) {
          await prisma.lots.update({
            where: {
              id: lot.id,
            },
            data: {
              isCompleted: true,
            },
          });
        }
      
      console.log(lot);
      
        return res.status(200).json({
          success: true,
          message: 'register deposited',
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
                commission: +data.commition!,
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