import { Router } from "express";
import categoryController from "./categoryContoller.js";
import { isAdmin, isAuthUser } from "../../middlewares/auth.js";
import  errorHandler  from "../../middlewares/error.js";

const categoryRouter = Router();


categoryRouter.post('/register', (req, res, next) => {
    console.log("Inside register function of categoryController");
    categoryController.register(req, res, next);
  });
categoryRouter.get('/getAll',errorHandler(categoryController.getAll))
categoryRouter.put('/update/:id',errorHandler(categoryController.update))
categoryRouter.delete('/delete/:id',errorHandler(categoryController.delete))

export default categoryRouter;
