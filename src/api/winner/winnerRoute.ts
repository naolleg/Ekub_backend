import { Router } from "express";
import  errorHandler from "../../middlewares/error.js";
import winnerController from "./winnerController.js";
import { isAuthUser } from "../../middlewares/auth.js";
const winnerRouter = Router();
winnerRouter.post('/register',[isAuthUser],errorHandler(winnerController.register));
winnerRouter.put('/update/:id',[isAuthUser],errorHandler(winnerController.update));
winnerRouter.delete('/delete/:id',[isAuthUser],errorHandler(winnerController.delete));
export default winnerRouter;
