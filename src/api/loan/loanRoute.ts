import { Router } from "express";
import errorHandler from "../../middlewares/error.js";
import loanController from "./loanController.js";
import { isAuthUser } from "../../middlewares/auth.js";
const loanRouter = Router();

loanRouter.post('/register',[isAuthUser],errorHandler(loanController.register));
loanRouter.put('/:id',errorHandler(loanController.update));
loanRouter.delete('/:id',errorHandler(loanController.delete));

export default loanRouter;
