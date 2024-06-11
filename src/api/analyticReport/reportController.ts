import { NextFunction, Request, Response } from "express";
//import { reportSchema } from "./reportSchema.js";
import { prisma } from "../../config/prisma.js";

const reportController={
 getDaily: async (req: Request, res: Response, next: NextFunction) => {
       // const data = reportSchema.register.parse(req.body);
          console.log("krjnsdfkmd");
          
        const totalDepositAmount = await prisma.deposits.aggregate({
            where: {
              createdAt: {
                gte: new Date(`${req.body.date}T00:00:00.000Z`),
                lt: new Date(`${req.body.date}T23:59:59.999Z`),
              },
            },
            _sum: {
              amount: true,
              commission:true,
              remaining:true,
            },
          });
           
           return res.status(200).json({
            success: true,
            message: 'daily deposit',
            data: {
              totalDeposit: totalDepositAmount._sum.amount,
              totalRemaining: totalDepositAmount._sum.remaining,
              totalCommission: totalDepositAmount._sum.commission,
            },
          });
        },
//  getWeekly: async (req: Request, res: Response, next: NextFunction) => {
//         const currentDate = new Date(`${req.body.date}T00:00:00.000Z`);
// const previousWeek = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

// const totalDepositAmount = await prisma.deposits.aggregate({
//   where: {
//     createdAt: {
//       gte: previousWeek,
//       lt: currentDate,
//     },
//   },
//   _sum: {
//     amount: true,
//   },
// });
// return res.status(200).json({
//   success: true,
//   message: 'daily deposit',
//   data: totalDepositAmount,
// });
// },
}
export default reportController;





























