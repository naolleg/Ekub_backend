import { Router } from "express";
import errorHandler from "../../middlewares/error.js";
import lotController from "./lotController.js";
const lotRouter = Router();
lotRouter.put('/profile',errorHandler(lotController.updateProfile));
lotRouter.post('/register',errorHandler(lotController.register));
lotRouter.put('/:id',errorHandler(lotController.update));
lotRouter.delete('/:id',errorHandler(lotController.delete));

export default lotRouter;
