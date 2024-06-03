import { Router } from "express";
import  errorHandler from "../../middlewares/error.js";
import winnerController from "./winnerController.js";
const winnerRouter = Router();
winnerRouter.post('/',errorHandler(winnerController.register));
winnerRouter.put('/:id',errorHandler(winnerController.update));
winnerRouter.delete('/:id',errorHandler(winnerController.delete));
export default winnerRouter;
