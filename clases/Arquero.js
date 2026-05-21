import Personaje from "./Personaje.js";

class Arquero extends Personaje {
    constructor(nombre) {
        super(nombre, 100, 40);
    }
}

export default Arquero;