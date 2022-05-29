import db from "../database.js";


export async function getCategories(req, res){
    
    try {
        const categories = await db.query('SELECT * FROM categories');
        res.send(categories.rows);

    } catch (error) {
        console.log('fail to query categories: ', error);
    }

}

export async function addCategorie(req, res){
    const { name } = req.body;
    
    try {
        const inserted = await db.query(`INSERT INTO categories (name) VALUES ('${name}')`);
        res.sendStatus(201);

    } catch (error) {
        console.log('fail to insert category: ', error);
    }
    


    

   
}


