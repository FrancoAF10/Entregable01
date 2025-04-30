const express=require('express')
const router=express.Router()
const db=require('../config/database')

router.get('/',async(req,res)=>{
  try{
    const query =`SELECT
              PD.idproducto,
                  CT.categoria,
                  SC.subcategoria,
                  MC.marca,
                  PD.precio,
                  PD.modelo,
                  PD.fechaRegistro,
                  PD.fotografia
            FROM PRODUCTOS PD
            INNER JOIN MARCAS MC ON PD.idmarca = MC.idmarca
            INNER JOIN SUBCATEGORIAS SC ON MC.idsubcategoria = SC.idsubcategoria
            INNER JOIN CATEGORIAS CT ON SC.idcategoria = CT.idcategoria;  `;

    const [productos]=await db.query(query)
    res.render('index',{productos})
  }catch(error){
    console.log(error)
  }
})

router.get('/create',async(req,res)=>{
  try{
   const [categoria]= await db.query("SELECT * FROM CATEGORIAS")
   const [subcategorias]= await db.query("SELECT * FROM SUBCATEGORIAS")
   const [marcas]= await db.query("SELECT * FROM MARCAS")


   res.render('create', {
    CATEGORIAS: categoria,
    SUBCATEGORIAS: subcategorias,
    MARCAS: marcas
  })
    }catch(error){
    console.error(error)  
  }
})

router.post('/create',async(req,res)=>{
  try{
    const {marca,precio,modelo,fechaRegistro,fotografia}=req.body
    await db.query(`INSERT INTO PRODUCTOS(idmarca,precio,modelo,fechaRegistro,fotografia)VALUES(?,?,?,?,?)`,
      [marca,precio,modelo,fechaRegistro,fotografia])
      res.redirect('/')
  }catch(error){
    console.log(error)
  }
})

//Para eliminar
router.get('/delete/:id',async(req,res)=>{
  try{
    const resultado=await db.query('DELETE FROM PRODUCTOS WHERE idproducto=?',[req.params.id])
    res.redirect('/')
  }catch(error){
    console.log(error)
  }
})
module.exports=router