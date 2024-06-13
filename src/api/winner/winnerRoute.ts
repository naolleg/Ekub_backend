import { Router } from "express";
import  errorHandler from "../../middlewares/error.js";
import winnerController from "./winnerController.js";
const winnerRouter = Router();
winnerRouter.post('/register',errorHandler(winnerController.register));
winnerRouter.put('/update/:id',errorHandler(winnerController.update));
winnerRouter.delete('/delete/:id',errorHandler(winnerController.delete));
export default winnerRouter;
