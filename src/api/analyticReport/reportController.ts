import { NextFunction, Request, Response } from "express";
//import { reportSchema } from "./reportSchema.js";
import { prisma } from "../../config/prisma.js";
import { any } from "zod";

const reportController={
 getDaily: async (req: Request, res: Response, next: NextFunction) => {
       // const data = reportSchema.register.parse(req.body);
          console.log("krjnsdfkmd");
          
        const totalAmount = await prisma.deposits.aggregate({
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
            message: 'daily report',
            data: {
              totalDeposit: totalAmount._sum.amount,
              totalRemaining: totalAmount._sum.remaining,
              totalCommission: totalAmount._sum.commission,
            },
          });
        },
        getdaily: async (req: Request, res: Response, next: NextFunction) => {
          const currentDate = new Date();
          const days = [];
        
          for (let i = 0; i < 7; i++) {
            const dayStartDate = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
            const dayEndDate = new Date(dayStartDate.getTime() + 24 * 60 * 60 * 1000);
        
            const totalAmount = await prisma.deposits.aggregate({
              where: {
                createdAt: {
                  gte: dayStartDate,
                  lt: dayEndDate,
                },
              },
              _sum: {
                amount: true,
                remaining: true,
                commission: true,
              },
            });
        
            days.push({
              day: dayStartDate.toISOString().split('T')[0],
              totalDepositAmount: totalAmount._sum.amount,
              totalRemaining: totalAmount._sum.remaining,
              totalCommission: totalAmount._sum.commission,
            });
          }
        
          return res.status(200).json({
            success: true,
            message: 'last 7 days report',
            data: days,
          });
        },
        getWeekly: async (req: Request, res: Response, next: NextFunction) => {
          const currentDate = new Date();
          const weeks = [];
        
          for (let i = 0; i < 10; i++) {
            const weekStartDate = new Date(currentDate.getTime() - i * 7 * 24 * 60 * 60 * 1000);
            const weekEndDate = new Date(weekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        
            const totalAmount = await prisma.deposits.aggregate({
              where: {
                createdAt: {
                  gte: weekStartDate,
                  lt: weekEndDate,
                },
              },
              _sum: {
                amount: true,
                remaining:true,
                commission:true
              },
            });
        
            weeks.push({
              week: `Week ${i + 1}`,
              startDate: weekStartDate.toISOString().split('T')[0],
              endDate: weekEndDate.toISOString().split('T')[0],
              totalDepositAmount: totalAmount._sum.amount,
              totalRemaining: totalAmount._sum.remaining,
              totalCommission: totalAmount._sum.commission,
            });
          }
        
          return res.status(200).json({
            success: true,
            message: 'Weekly report',
            data: weeks,
          });
        },
        getMonthly: async (req: Request, res: Response, next: NextFunction) => {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();
          const months = [];
        
          for (let i = 0; i <= currentMonth; i++) {
            const monthStartDate = new Date(currentYear, i, 1);
            const monthEndDate = new Date(currentYear, i + 1, 0);
        
            const totalAmount = await prisma.deposits.aggregate({
              where: {
                createdAt: {
                  gte: monthStartDate,
                  lt: monthEndDate,
                },
              },
              _sum: {
                amount: true,
                commission:true,
                remaining:true
              },
            });
     
            months.push({
              month: `${getMonthName(i)} ${currentYear}`,
              startDate: monthStartDate.toISOString().split('T')[0],
              endDate: monthEndDate.toISOString().split('T')[0],
              totalDepositAmount: totalAmount._sum.amount,
              totalRemaining: totalAmount._sum.remaining,
              totalCommission: totalAmount._sum.commission,
            });
          }
        // Helper function to get month name from month index
        function getMonthName(monthIndex: number) {
          const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];
          return monthNames[monthIndex];
        }
          return res.status(200).json({
            success: true,
            message: 'Monthly deposit report',
            data: months,
          });
        },
        
        
}
export default reportController;





























