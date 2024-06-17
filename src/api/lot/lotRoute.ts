import { Router } from "express";
import errorHandler from "../../middlewares/error.js";

import lotController from "./lotController.js";
import { isAuthUser } from "../../middlewares/auth.js";
const lotRouter = Router();
lotRouter.post('/register',[isAuthUser],errorHandler(lotController.register));
lotRouter.put('/update/:id',[isAuthUser],errorHandler(lotController.updateProfile));
lotRouter.put('/:id',errorHandler(lotController.update));
lotRouter.delete('/delete/:id',[isAuthUser],errorHandler(lotController.delete));
lotRouter.get('/getAll',[isAuthUser],errorHandler(lotController.getAll))
export default lotRouter;
