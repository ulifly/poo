import express from "express";
import dotenv from "dotenv";

import Guerrero from "./clases/Guerrero.js";
import Mago from "./clases/Mago.js";
import Arquero from "./clases/Arquero.js";
import Dragon from "./clases/Dragon.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

const jugadores = [];
let combate = null

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

function serializarEstado() {
    return {
        personaje: {
            nombre: juego.personaje.nombre,
            vida: juego.personaje.vida,
            vidaMaxima: juego.personaje.vidaMaxima,
            ataque: juego.personaje.ataque,
            defendiendo: juego.personaje.defendiendo
        }, 
        enemigo: {
            nombre: juego.enemigo.nombre,
            vida: juego.enemigo.vida,
            vidaMaxima: juego.enemigo.vidaMaxima,
            ataque: juego.enemigo.ataque
        },
        terminado: juego.terminado
    }
}


app.post ('/iniciar-combate', (req, res) => {
    const { nombre, clase } = req.body;

    // crear el personaje del jugador segun la clase seleccionada
    let personaje;

    switch (clase) {
        case "guerrero":
            personaje = new Guerrero(nombre);
            break;
        case "mago":
            personaje = new Mago(nombre);
            break;
        case "arquero":
            personaje = new Arquero(nombre);
            break;4
        default:
            return res.status(400).json({ error: "Clase no válida" });
    }

    // guardamos la vida maxima  para generar la barra de vida
    
    personaje.vidaMaxima = personaje.vida;

    // Crear un enemigo 

    const enemigo = new Dragon()
    enemigo.vidaMaxima = enemigo.vida;

    combate = { personaje, enemigo, terminado:false };
    
    res.json(serializarEstado());

});

app.post('/accion', (req, res) => {
    if (!juego || juego.terminado) {
        return res.status(400).json({ error: "No hay un combate en curso" });
    }

    const { accion } = req.body;
    const mensajes = [];

    if (accion === "atacar") {
        mensajes.push(`⚔️ ${juego.personaje.ataque(juego.enemigo)} `);
    } else if (accion === "defender") {
        mensajes.push (`🛡️ ${juego.personaje.defender()} `);
    } else {
        return res.status(400).json({ error: "Acción no válida" });
    }

    // revisar el estado del enemigo para ver si murio

    if (juego.enemigo.vida <= 0) {
        juego.terminado = true;
        mensajes.push(`🏆 ¡${juego.personaje.nombre} ha vencido al ${juego.enemigo.nombre}!`);
        return res.json({ ...serializarEstado(), mensajes, resultado: "victoria" });
    }

    // turno del enemigo (ataca siempre)

    mensajes.push(`🐉 ${juego.enemigo.atacar(juego.personaje)} `);

    juego.personaje.terminarTurno(); // el personaje deja de defenderse al final del turno

    // revisar el estado del personaje para ver si murio
    if (juego.personaje.vida <= 0) {
        juego.terminado = true;
        mensajes.push(` 💀 ${juego.personaje.nombre} ha sido derrotado por el ${juego.enemigo.nombre}...`);
        return res.json( { ...serializarEstado(), mensajes, resultado: "derrota" } )
    }

    res.json( { ...serializarEstado(), mensajes, resultado: null } );

});





app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});