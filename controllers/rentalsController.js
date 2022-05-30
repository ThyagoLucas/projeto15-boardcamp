import db from "../database.js";

export async function getRentals(req, res){

    console.log('Entreeeei');

    res.send([
        {
          id: 1,
          customerId: 1,
          gameId: 1,
          rentDate: '2021-06-20',
          daysRented: 3,
          returnDate: null, // troca pra uma data quando já devolvido
          originalPrice: 4500,
          delayFee: null,
          customer: {
           id: 1,
           name: 'João Alfredo'
          },
          game: {
            id: 1,
            name: 'Banco Imobiliário',
            categoryId: 1,
            categoryName: 'Estratégia'
          }
        }
      ])





}