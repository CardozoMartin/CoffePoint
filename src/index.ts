import express, { Application } from "express";
import connectDB from "./database/config";
import clienteRouter from "./routes/cliente.routes";
import promocionRouter from "./routes/promocion.routes";
import membresiaRouter from "./routes/membresia.routes";
import productoRouter from "./routes/producto.routes";
import sucursalRouter from "./routes/sucursal.routes";
import loginRouter from './routes/login.route';
import cors from "cors";
//creamos el puerto y la variable de express
const PORT = 4000;
const app: Application = express();

//configuramos los cors

app.use(cors({
  origin: "http://localhost:5173", //puerto del front
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json()); //permite que el servidor entienda json

//llamamos ala base de datos
connectDB();

//rutas

app.use("/api/cliente", clienteRouter);
app.use("/api/promocion", promocionRouter);
app.use("/api/membresia", membresiaRouter);
app.use("/api/producto", productoRouter);
app.use("/api/sucursal", sucursalRouter);
app.use('/api/login', loginRouter)
//iniciamos el servidor de express
app.listen(PORT, () => {
  console.log("express funcionando en el puerto", PORT);
});
