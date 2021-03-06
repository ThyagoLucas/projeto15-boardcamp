import dayjs from "dayjs";
import db from "../database.js";

export async function getRentals(req, res){

  const customerId  = parseInt(req.query.customerId);

 
  const arrayToSend = [];

  const locateds = await db.query(`SELECT * FROM rentals`);
  const games = await db.query('SELECT * FROM games');
  const customers = await db.query('SELECT * FROM customers');
  const categories = await db.query('SELECT * FROM categories');

  try {
    locateds.rows.forEach(element => {
     
      let customer = {};
      let game = {};
      let categoryName = ''
      
      for(let value of customers.rows){
        if(element.customerId === value.id ){
          customer = {...value}
          break;
        }
      }
      for(let value of games.rows){

        if(element.gameId === value.id ){
          game = {...value}
          break;
        }
      }
      for(let value of categories.rows){
        if(value.id === game.categoryId ){
          categoryName = value.name
          break;
        }
      }
      let objToArray = {
                    ...element, 
                    customer:{
                      id:customer.id,
                      name:customer.name
                    },
                    game:{
                      id:game.id,
                      name:game.name,
                      categoryId: game.categoryId,
                      categoryName: categoryName

                    }}

    if(customerId){
     
      if(element.customerId === customerId ) arrayToSend.push(objToArray);
    }
    else {
    
      arrayToSend.push(objToArray);
    }
      
     
    });

    res.send(arrayToSend);
    
  } catch (error) {
      console.log(error)
  }

}

export async function createRental(req, res){
    const { customerId, gameId, daysRented } = req.body;

    const date = dayjs().format('YYYY-MM-DD');

    try {
        const game = await db.query(`SELECT * FROM games WHERE id = ('${gameId}')`);
        const total = game.rows[0].pricePerDay * daysRented;
        const included = await db.query(`INSERT 
                                            INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                                            VALUES ('${customerId}', '${gameId}', '${date}', '${daysRented}', ${null}, '${total}', ${null} )
                                        `)
                                      
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
    }
}

export async function deleteRental(req, res){

  const { id } = req.params;

  console.log('To delete id: ', id);

  const toDelete =  await db.query(`SELECT * FROM rentals WHERE id = ('${id}')`)
  console.log('to delete: ', toDelete.rows);

  if(toDelete.length === 0) return res.sendStatus(404);

  try {
     
    if(toDelete.rows[0].returnDate !== null){
      
      res.sendStatus(400)
    }
    else{
      await db.query(`DELETE FROM rentals WHERE id = ('${id}')`)
      res.sendStatus(200);
    }
   
    
  } catch (error) {
    console.log('fail to felete rental: ', error);
    res.sendStatus(404);
  }

}

export async function finalizeRental(req, res){

  const { id } = req.params;

  const dataRented = await db.query(`SELECT * FROM rentals WHERE id = ('${id}')`);
  const today = dayjs().format('YYYY-MM-DD');
  
  const date1 = new Date(today);
  const date2 = new Date(dataRented.rows[0].rentDate);

  const mileDifference = Math.abs(date1.getTime() - date2.getTime());
  const days = Math.ceil(mileDifference/ (1000 * 3600 * 24));

  const game = await db.query(`SELECT * FROM games WHERE id = (${dataRented.rows[0].gameId})`);

  const delayFee = (days - Number(dataRented.rows[0].daysRented)) * game.rows[0].pricePerDay;

  try {
    
    if(delayFee > 0 ){
     await db.query(`UPDATE rentals 
                            SET "returnDate" = '${today}',
                                "delayFee" = ${delayFee}
                            WHERE id = ('${id}')`);
    res.sendStatus(200)
    }
    else{
      await db.query(`UPDATE rentals 
                            SET "returnDate" = '${today}',
                                "delayFee" = ${0}
                            WHERE id = ('${id}')`);
    res.sendStatus(200)
    }

    
    

    
    
  } catch (error) {
    console.log('erro ao entregar: ', error);
  }
  










}