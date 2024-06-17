import { Router } from "express";
import userController from "./userController.js";
import errorHandler from "../../middlewares/error.js";
const userRouter = Router();


userRouter.get('/getAll',errorHandler(userController.getAll));
userRouter.post('/login',errorHandler(userController.login));
userRouter.put('/change-password/:id',errorHandler(userController.changePassword));
userRouter.put('/reset-password',errorHandler(userController.resetPassword));
userRouter.put('/change-status/:id',errorHandler(userController.changeStatus));
userRouter.post('/register',errorHandler(userController.register));
userRouter.put('/updateInfo/:id',errorHandler(userController.updateUserInfo));
export default userRouter;
