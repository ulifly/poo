import Personaje from './Personaje.js'; // importamos la clase Personaje desde el archivo Personaje.js

class Guerrero extends Personaje { // Guerrero hereda de Personaje
    constructor(nombre) { 
        super(nombre, 150, 30 ); // super se utiliza para llamar al constructor de la clase padre
    }
    
}

export default Guerrero; // exportamos la clase para poder importarla en otros archivos