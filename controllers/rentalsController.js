import dayjs from "dayjs";
import db from "../database.js";

export async function getRentals(req, res){


  const customerId  = parseInt(req.query.customerId);

  console.log('customer: ',customerId) 
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

    console.log(typeof(customerId))
    console.log(typeof(element.customerId));

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
        console.log(date, total)
        const included = await db.query(`INSERT 
                                            INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                                            VALUES ('${customerId}', '${gameId}', '${date}', '${daysRented}', ${null}, '${total}', ${null} )
                                        `)
                                      
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
    }
}