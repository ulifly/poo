import Personaje from "./Personaje.js";

class Mago extends Personaje {
    constructor(name, life, spell){
        super(name, life)

        this.hechizo = spell;
    }

    atacar() {
        console.log(
            `${this.nombre} ataca con su hechizo ${this.hechizo}`
        )
    }
} 

export default Mago;