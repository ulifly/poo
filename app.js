import Guerrero from "./clases/Guerrero.js";
import Mago from "./clases/Mago.js";
import Personaje from "./clases/Personaje.js";

const guerrero1 = new Guerrero(
    "Conan", 
    150, 
    "Espada de acero Vorpalina"
);

const mago1 = new Mago(
    "Dumbledore",
    80,
    "Magic Missile"
)

guerrero1.atacar(); // Imprime: "Conan ataca!"
mago1.atacar(); // Imprime: "Dumbledore ataca con su hechizo Magic Missile"

Personaje.saludar(); // Imprime: "¡Hola, soy un personaje!"

//guerrero1.saludar(); // Error: guerrero1.saludar is not a function 
                    // por que es un método estático y no se puede llamar 
                    // desde una instancia de la clase, 
                    // solo se puede llamar desde la clase misma.