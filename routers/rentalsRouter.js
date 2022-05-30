import { Router } from "express";
import { createRental, getRentals } from "../controllers/rentalsController.js";


const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', createRental);

export default rentalsRouter;