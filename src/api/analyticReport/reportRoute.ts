import { Router } from "express";
import reportController from "./reportController.js";
import { isAdmin, isAuthUser } from "../../middlewares/auth.js";
import  errorHandler  from "../../middlewares/error.js";

const reportRouter = Router();


reportRouter.get('/DailyReport',errorHandler(reportController.getDaily))
reportRouter.get('/MonthlyReport',errorHandler(reportController.getMonthly))
reportRouter.get('/weeklyReport',errorHandler(reportController.getWeekly))

export default reportRouter;
