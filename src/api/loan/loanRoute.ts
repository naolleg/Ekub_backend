import { Router } from "express";
import errorHandler from "../../middlewares/error.js";
import loanController from "./loanController.js";
const loanRouter = Router();

loanRouter.post('/',errorHandler(loanController.register));
loanRouter.put('/:id',errorHandler(loanController.update));
loanRouter.delete('/:id',errorHandler(loanController.delete));

export default loanRouter;
