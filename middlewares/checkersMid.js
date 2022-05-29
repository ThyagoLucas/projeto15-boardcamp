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
