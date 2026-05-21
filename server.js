import express from "express";
import dotenv from "dotenv";

import Guerrero from "./clases/Guerrero.js";
import Mago from "./clases/Mago.js";
import Arquero from "./clases/Arquero.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

const jugadores = [];

app.use(express.json());

app.use(express.static("public"));

app.post('/crear-personaje', (req, res) => {
    
    const { nombre, clase } = req.body;

    let personaje;

    if (clase === "guerrero") {
        personaje = new Guerrero(nombre);
    } else if (clase === "mago") {
        personaje = new Mago(nombre)
    } else if (clase === "arquero") {
        personaje = new Arquero(nombre)
    } 

    jugadores.push(personaje);
    res.json({ mensaje: `Personaje creado exitosamente`, personaje});
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});