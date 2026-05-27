import Personaje from "./Personaje.js";

class Enemigo extends Personaje {
    constructor(nombre, vida, ataque) {
        super(nombre, vida, ataque);
    }
}
export default Enemigo;