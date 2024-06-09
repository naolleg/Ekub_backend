import { Router } from "express";
import errorHandler from "../../middlewares/error.js";
import depositController from "./depositController.js";
import { isAuthUser } from "../../middlewares/auth.js";
const depositRouter = Router();
depositRouter.post('/register',[isAuthUser],errorHandler(depositController.register));
depositRouter.put('/:id',errorHandler(depositController.update));
depositRouter.delete('/:id',errorHandler(depositController.delete));

export default depositRouter;
