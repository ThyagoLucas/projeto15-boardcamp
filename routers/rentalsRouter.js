import { Router } from "express";
import { createRental, deleteRental, finalizeRental, getRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', createRental);
rentalsRouter.post('/rentals/:id/return', finalizeRental )
rentalsRouter.delete('/rentals/:id?', deleteRental);


export default rentalsRouter;