const mysql=require('mysql2/promise')

//crear pool de acceso
const pool=mysql.createPool({
  host: 'localhost',
  user:'root',
  password:'',
  database:'TIENDA'
})

//VERIFICAR LA CONEXIÓN
async function testconnection(){
  try{
    const connection=await pool.getConnection()
    //rutina 2...
    console.log("Conexión MYSQL Exitosa")
    connection.release()//liberar
  }catch(error){
    console.error("Error: ",error)
  }
}

testconnection();
module.exports=pool;