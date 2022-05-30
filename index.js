import express, { json }  from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import categorieRouter from "./routers/categorieRouter.js";
import gamesRouter from "./routers/gamesRouter.js";
import customersRouter from "./routers/customersRouter.js";
import rentalsRouter from "./routers/rentalsRouter.js";


const server = express();

dotenv.config();
server.use(cors());
server.use(json())

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
});


//Routers 

server.use(categorieRouter);
server.use(gamesRouter);
server.use(customersRouter);
server.use(rentalsRouter);



