import express, { Application} from 'express'
import connectDB from './database/config';
import clienteRouter from './routes/cliente.routes'

//creamos el puerto y la variable de express
const PORT = 4000
const app: Application = express();

//llamamos ala base de datos
connectDB();











//rutas

app.use("/api/cliente",clienteRouter)




//iniciamos el servidor de express
app.listen(PORT , ()=>{
    console.log("express funcionando en el puerto", PORT)
})