import { Router } from "express";
import { addCustomer, getCustomers, updateClient } from "../controllers/customersController.js";
import { verifyDatasUser } from "../middlewares/checkersMid.js";

const customersRouter = Router();

customersRouter.get('/customers/:id?', getCustomers);
customersRouter.post('/customers', verifyDatasUser, addCustomer);
customersRouter.put('/customers/:id?', verifyDatasUser, updateClient);



export default customersRouter;
