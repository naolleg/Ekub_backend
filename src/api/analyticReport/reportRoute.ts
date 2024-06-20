import { Router } from "express";
import reportController from "./reportController.js";
import { isAdmin, isAuthUser } from "../../middlewares/auth.js";
import  errorHandler  from "../../middlewares/error.js";

const reportRouter = Router();



reportRouter.get('/dailyReport',errorHandler(reportController.getdaily))//this one is for past 7 days daily report
reportRouter.get('/weeklyReport',errorHandler(reportController.getWeekly))
reportRouter.get('/MonthlyReport',errorHandler(reportController.getMonthly))
reportRouter.post('/DailyReport',errorHandler(reportController.getDaily))//this is for input or choose a day and display that day's report

export default reportRouter;
