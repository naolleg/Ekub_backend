import { Router } from "express";
import userController from "./userController.js";
import errorHandler from "../../middlewares/error.js";
const userRouter = Router();


userRouter.post('/login',errorHandler(userController.login));
userRouter.post('/change-password',errorHandler(userController.changePassword));
userRouter.put('/reset-password/:id',errorHandler(userController.resetPassword));
userRouter.put('/change-status/:id',errorHandler(userController.changeStatus));
userRouter.post('/',errorHandler(userController.register));
export default userRouter;
