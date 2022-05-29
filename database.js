import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const db = new Pool({
    host: process.env.DATABASE_URL,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATA_BASE
    });
try {
    db.connect();   
    console.log(`Banco conectado na porta${process.env.PORT_DB}`)

} catch (error) {
    console.log('Erro ao conectar ao banco', error)
}

export default db;


