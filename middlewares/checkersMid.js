
import Joi from 'joi';
import db from '../database.js';

export async function verifyCategory(req, res, next){
    
    if(req.body.name !== undefined){
        const name = await db.query(`SELECT * FROM categories WHERE name = '${req.body.name}'`);
        
        (name.rowCount !== 0)? res.sendStatus(409): next();
    }
    else{
        res.sendStatus(400);
    }
    
}

export async function verifyDatasUser(req, res, next){

    const schema = Joi.object({
        name: Joi.string()
            .required(),

        phone: Joi.string()
            .min(10)
            .max(11)
            .required(),

        cpf: Joi.string()
            .length(11)
            .required(),
        birthday : Joi.string().length(10)
    });

    if(schema.validate(req.body).error) return res.sendStatus(400);

    try {
        const thereIs = await db.query(`SELECT * FROM customers WHERE cpf = ('${req.body.cpf}')`);
       
        thereIs.rowCount === 0 ? next() : res.sendStatus(409);
        
    } catch (error) {
        console.log(error)
        
    }




}

export async function verifyRental( req, res, next){
    const { id } = req.params;
    const rental = await db.query(`SELECT * FROM rentals WHERE id = ('${id}')`)
    
    if(rental.rowCount === 0 ) res.sendStatus(404);
    if(rental.rows[0].returnDate !== null) res.sendStatus(400);
    else next()
}
