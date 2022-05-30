import { Router } from "express";
import { addCategorie, getCategories } from "../controllers/categoriesController.js";
import { verifyCategory } from "../middlewares/checkersMid.js";

const categorieRouter = Router();

categorieRouter.get('/categories', getCategories);
categorieRouter.post('/categories', verifyCategory, addCategorie);

export default categorieRouter;