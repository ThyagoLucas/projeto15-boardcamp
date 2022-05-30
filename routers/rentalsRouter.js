import { Router } from "express";
import { createRental, deleteRental, getRentals, updateRental } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', createRental);
rentalsRouter.delete('/rentals/:id?', deleteRental);
rentalsRouter.put('/rentals/:id/return', updateRental);

export default rentalsRouter;