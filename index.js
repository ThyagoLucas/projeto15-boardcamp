import express, { json }  from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import categorieRouter from "./routers/categorieRouter.js";


const server = express();

dotenv.config();
server.use(cors());
server.use(json())

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
});


//Routers 

server.use(categorieRouter);


