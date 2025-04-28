const express=require('express')
const bodyParser=require('body-parser') //instalar  npm install body-parser
const path=require('path')

//acceso a rutas
const rutaproducto=require('./routes/productos')

//Iniciar la App
const app=express()
const PORT =process.env.PORT || 3000

//configurar "middleware" =>"capa de comunicación"
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))


//motor de plantillas
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
//configuración rutas
app.use('/',rutaproducto) //principal

//servidor web
app.listen(PORT,()=>{
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
})