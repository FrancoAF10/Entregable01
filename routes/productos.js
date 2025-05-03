const express=require('express')
const router=express.Router()
const db=require('../config/database')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('index');
});

//redirige y muestra la pagina del administrador
router.get('/admi',async(req,res)=>{
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
    res.render('admi',{productos})
  }catch(error){
    console.log(error)
  }
})

//nos redirige a la pagina del catalogo
router.get('/catalogo', async (req, res) => {
  const { marca, orden, producto } = req.query; // Obtenemos los datos que queremos obtener en el catalogo
  let query = `
    SELECT 
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
    INNER JOIN CATEGORIAS CT ON SC.idcategoria = CT.idcategoria
    WHERE 1
  `;

  const queryParams = [];
  
  if (marca) {
    query += ' AND MC.idmarca = ?';
    queryParams.push(marca);
  }
  
  if (producto) {
    query += ' AND PD.modelo LIKE ?';
    queryParams.push(`%${producto}%`);
  }
  
  if (orden) {
    if (orden === 'Asc') {
      query += ' ORDER BY PD.precio ASC';
    } else {
      query += ' ORDER BY PD.precio DESC';
    }
  }

  try {
    const [productos] = await db.query(query, queryParams);
    const [marcas] = await db.query('SELECT * FROM MARCAS');
    res.render('catalogo', {
      productos,
      marcas,
      xmarcas: marca,
      ordenMaMe: orden,//Ma=mayor-Me= menor
      busqueda: producto
    });
  } catch (error) {
    console.log(error);
  }
});

// para obtener las subcategorias de la categoria que seleccionemos
router.get('/subcategorias/:idcategoria', async (req, res) => {
  try {
    const [subcategorias] = await db.query("SELECT * FROM SUBCATEGORIAS WHERE idcategoria = ?", [req.params.idcategoria]);
    res.json(subcategorias);
  } catch (error) {
    console.error(error);
  }
});

// para obtener las marcas de la subcategoria que seleccionemos
router.get('/marcas/:idsubcategoria', async (req, res) => {
  try {
    const [marcas] = await db.query("SELECT * FROM MARCAS WHERE idsubcategoria = ?", [req.params.idsubcategoria]);
    res.json(marcas);
  } catch (error) {
    console.error(error);
  }
});

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

router.post('/create', upload.single('fotografia'), async (req, res) => {
  try{
    const {marca,precio,modelo,fechaRegistro}=req.body
    const fotografia = req.file ? req.file.filename : null;
    await db.query(`INSERT INTO PRODUCTOS(idmarca,precio,modelo,fechaRegistro,fotografia)VALUES(?,?,?,?,?)`,
      [marca,precio,modelo,fechaRegistro,fotografia])
      res.redirect('/admi')
  }catch(error){
    console.log(error)
  }
})

router.get('/edit/:id',async(req,res)=>{
  try{
    const [dcategorias]=await db.query("SELECT * FROM CATEGORIAS")
    const [dsubcategorias]=await db.query("SELECT * FROM SUBCATEGORIAS")
    const [dmarcas]=await db.query("SELECT * FROM MARCAS")
    const [registros]=await db.query(`SELECT 
          PD.*, 
          MC.idsubcategoria, 
          SC.idcategoria 
        FROM PRODUCTOS PD
        INNER JOIN MARCAS MC ON PD.idmarca = MC.idmarca
        INNER JOIN SUBCATEGORIAS SC ON MC.idsubcategoria = SC.idsubcategoria
        WHERE PD.idproducto = ?
        `, [req.params.id])

    if(registros.length>0){
      res.render('edit',{CATEGORIAS:dcategorias,SUBCATEGORIAS:dsubcategorias,MARCAS:dmarcas,producto:registros[0]})
    }else{
      res.redirect('/admi')
    }
  }catch(error){
    console.log(error)
  }
})

//PROCESO Y ACTUALIZACIÓN DE LOS DATOS
router.post('/edit/:id', upload.single('fotografia'), async (req, res) => {
  try{
    const { marca, precio, modelo, fechaRegistro, fotografia_actual } = req.body;
    const fotografia = req.file ? req.file.filename : fotografia_actual;

    await db.query("UPDATE PRODUCTOS SET idmarca=?,precio=?,modelo=?,fechaRegistro=?,fotografia=? WHERE idproducto=?",
      [marca,precio,modelo,fechaRegistro,fotografia,req.params.id])
      res.redirect('/admi')
  }catch(error){
    console.log(error)
  }
})

//Para eliminar
router.get('/delete/:id',async(req,res)=>{
  try{
    const resultado=await db.query('DELETE FROM PRODUCTOS WHERE idproducto=?',[req.params.id])
    res.redirect('/admi')
  }catch(error){
    console.log(error)
  }
})
module.exports=router