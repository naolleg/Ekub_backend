import { Router } from "express";
import reportController from "./reportController.js";
import { isAdmin, isAuthUser } from "../../middlewares/auth.js";
import  errorHandler  from "../../middlewares/error.js";

const reportRouter = Router();


reportRouter.post('/DailyReport',errorHandler(reportController.getDaily))
reportRouter.post('/MonthlyReport',errorHandler(reportController.getMonthly))
reportRouter.post('/weeklyReport',errorHandler(reportController.getWeekly))

export default reportRouter;
