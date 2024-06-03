import { Router } from "express";
import errorHandler from "../../middlewares/error.js";
import depositController from "./depositController.js";
const depositRouter = Router();
depositRouter.post('/', errorHandler(depositController.register));
depositRouter.put('/:id', errorHandler(depositController.update));
depositRouter.delete('/:id', errorHandler(depositController.delete));
export default depositRouter;
