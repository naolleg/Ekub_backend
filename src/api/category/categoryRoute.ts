import { Router } from "express";
import categoryController from "./categoryContoller.js";
import { isAdmin, isAuthUser } from "../../middlewares/auth.js";
import  errorHandler  from "../../middlewares/error.js";

const categoryRouter = Router();


categoryRouter.post('/register', (req, res, next) => {
    console.log("Inside register function of categoryController");
    categoryController.register(req, res, next);
  });
categoryRouter.put('/:id',[isAuthUser,isAdmin],errorHandler(categoryController.update))
categoryRouter.delete('/:id',[isAuthUser,isAdmin],errorHandler(categoryController.delete))

export default categoryRouter;
