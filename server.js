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
    console.log(`Personaje creado: ${JSON.stringify(personaje)}`);
});

function serializarEstado() { // esta funcion se encarga de convertir el estado del combate formato que se pueda enviar al cliente, eliminando metodos y propiedades innecesarias
    if(!combate) return null;
    return {
        jugador: {
            nombre: combate.jugador.nombre,
            vida: combate.jugador.vida,
            vidaMaxima: combate.jugador.vidaMaxima,
            ataque: combate.jugador.ataque,
            defendiendo: combate.jugador.defendiendo
        }, 
        enemigo: {
            nombre: combate.enemigo.nombre,
            vida: combate.enemigo.vida,
            vidaMaxima: combate.enemigo.vidaMaxima,
            ataque: combate.enemigo.ataque
        },
    }
}

app.post ('/iniciar-combate', (req, res) => {
    const jugador = jugadores[jugadores.length - 1]

    if(!jugador) {
        return res.status(400).json({ error: "No hay personajes disponibles para iniciar el combate" });
    }
    //jugador.vidaMaxima = jugador.vida; // guardamos la vida maxima  para generar la barra de vida
    jugador.defendiendo = false;

    const enemigo = new Dragon()     // Crear un enemigo 
   
    combate = { jugador, enemigo, turno: "jugador", mensajes: [] }; //inicializar el estado del combate

    combate.jugador.vidaMaxima = combate.jugador.vida; // guardamos la vida maxima  para generar la barra de vida del jugador
    combate.enemigo.vidaMaxima = combate.enemigo.vida; // guardamos la vida maxima  para generar la barra de vida del enemigo

    res.json({
        mensaje: `¡${jugador.nombre} se enfrenta al ${enemigo.nombre}!`,  // mensaje de bienvenida al combate
        estado: serializarEstado() // enviamos el estado inicial del combate al cliente
    }) 
    console.log(`Combate iniciado entre ${jugador.nombre} y ${enemigo.nombre}`);

});

app.post('/accion', (req, res) => {
    if (!combate) {
        return res.status(400).json({ error: "⛔ No hay un combate en curso" });
    }

    const { accion } = req.body;
    const {jugador, enemigo} = combate;
    const mensajes = [];

    if (accion === "atacar") {
        mensajes.push(`⚔️ ${jugador.atacar(enemigo)} `);
        console.log(`⚔️ ${jugador.nombre} ataca a ${enemigo.nombre} causando ${jugador.ataque} de daño`);
    } else if (accion === "defender") {
        mensajes.push (`🛡️ ${jugador.defender()} `);
        console.log(`Jugador ${jugador.nombre} se defiende`);
    } else {
        return res.status(400).json({ error: "Acción no válida" });
    }

    if (enemigo.vida <= 0) {    // revisar el estado del enemigo para ver si murio
        mensajes.push(`🏆 ¡${jugador.nombre} ha vencido al ${enemigo.nombre}!`);
        combate = null; // reiniciamos el combate para permitir iniciar uno nuevo
        return res.json({resultado: "victoria", mensajes, estado: null });
    }

    // turno del enemigo 

    mensajes.push(`🐉 ${enemigo.atacar(jugador)} `);
    console.log(`🐉 ${enemigo.nombre} ataca a ${jugador.nombre} causando ${enemigo.ataque} de daño`);

    jugador.terminarTurno(); // el personaje deja de defenderse al final del turno

    if (jugador.vida <= 0) {  // revisar el estado del personaje para ver si murio
        mensajes.push(`💀 ${jugador.nombre} ha sido derrotado por el ${enemigo.nombre}...`);
        console.log(`💀 ${jugador.nombre} ha sido derrotado por ${enemigo.nombre}`);
        return res.json( { resultado: "derrota", mensajes, estado: null } )
    }

    res.json( { 
        resultado: "continua",
        mensajes,
        estado: serializarEstado() // enviamos el estado actualizado del combate al cliente
     } );

});




app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});