import db from "../database.js";


export async function getCustomers(req, res){
   
    const { id } = req.params;
    
    let customers = [];
    try {
        id? customers = await db.query(`SELECT * FROM customers WHERE id = '${id}'`):
            customers = await db.query('SELECT * FROM customers');
    
        res.send(customers.rows);
        
    } catch (error) {
        console.log('fail to seach customers: ', error);
    }
}

export async function addCustomer(req, res){

    const {name, phone, cpf, birthday} = req.body;
    

    try {
        await db.query(`INSERT 
                            INTO customers (name, phone, cpf, birthday)
                            VALUES ('${name}', '${phone}', '${cpf}', '${birthday}' )`);

        res.sendStatus(201);

    } catch (error) {
        console.log('fail to insert customer: ', error);
        
    }

}

export async function updateClient(req, res){

    const {id, name, phone, cpf, birthday} = req.body;
    console.log("to update");
    try {

        const updatedCustomer = await db.query(`UPDATE customers 
                                                    SET
                                                        name = '${name}'
                                                        phone = '${phone}'
                                                        cpf = '${cpf}'
                                                        birthday = '${birthday}'
                                                    WHERE id = ('${id}')`);
        console.log('Updated: ', updateClient);
        res.send(updateClient)
        
    } catch (error) {
        console.log('erro into updeted customer: ', error);
        res.sendStatus(401);
    }



}