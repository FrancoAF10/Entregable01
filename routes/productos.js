const express=require('express')
const router=express.Router()
const db=require('../config/database')

router.get('/',async(req,res)=>{
  try{
    const query =`SELECT * FROM vista_productos `;
    const [productos]=await db.query(query)
    res.render('index',{productos})
  }catch(error){
    console.log(error)
  }
})

module.exports=router