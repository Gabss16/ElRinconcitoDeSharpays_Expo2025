// importo el archivo app.js
import app from "./app.js";
import "./database.js";
import multer from "multer";
// Creo una función
// que se encarga de ejecutar el servidor
async function main() {
  const port = 4000;
  app.listen(port);
  console.log("Server on port " + port);
}
//Ejecutamos todo
main();


const upload = multer();

// Este middleware debe agregarse antes de tus rutas si vas a usar FormData:
app.use(upload.none()); // Para leer texto de multipart/form-data
