import express, { Application } from "express";
import connectDB from "./database/config";
import clienteRouter from "./routes/cliente.routes";
import promocionRouter from "./routes/promocion.routes";
import membresiaRouter from "./routes/membresia.routes";
import productoRouter from "./routes/producto.routes";
import sucursalRouter from "./routes/sucursal.routes";
//creamos el puerto y la variable de express
const PORT = 4000;
const app: Application = express();

app.use(express.json()); //permite que el servidor entienda json

//llamamos ala base de datos
connectDB();

//rutas

app.use("/api/cliente", clienteRouter);
app.use("/api/promocion", promocionRouter);
app.use("/api/membresia", membresiaRouter);
app.use("/api/producto", productoRouter);
app.use("/api/sucursal", sucursalRouter);
//iniciamos el servidor de express
app.listen(PORT, () => {
  console.log("express funcionando en el puerto", PORT);
});
