import Personaje from './Personaje.js'; // importamos la clase Personaje desde el archivo Personaje.js

class Gerrero extends Personaje { // Guerrero hereda de Personaje
    constructor(name, life, sword) { 

        super(name, life); // super se utiliza para llamar al constructor de la clase padre

        this.espada = sword; // agregamos una propiedad específica de Guerrero
    }
    
    atacar() {
        console.log(
            `${this.nombre} ataca con su ${this.espada}`
        );
    }
}

export default Gerrero; // exportamos la clase para poder importarla en otros archivos