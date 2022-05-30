import db from "../database.js";

export async function createGame(req, res){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await db.query(`INSERT 
                            INTO games ( "name", "image", "stockTotal", "categoryId", "pricePerDay" )
                            VALUES ('${name}', '${image}', '${stockTotal}', '${categoryId}', '${pricePerDay}')`);
        
        res.sendStatus(201);
        
    } catch (error) {
        console.log('fail to insert game: ', error);
    }  
}


export async function getGames(req, res){

    try {
        const games = await db.query('SELECT * FROM games');
        res.send(games.rows);
        
    } catch (error) {
        console.log('Erro ao consultar games: ', error);
    }
}