class Personaje {   
    constructor(name, life) { // constructor es un método especial 
                                // que se ejecuta automáticamente al crear 
                                // una instancia de la clase
        this.nombre = name; // this hace referencia a la instancia actual
        this.vida = life; 
    }

    static saludar(){
        console.log("¡Hola, soy un personaje!");
    }

    atacar() {
        console.log(`${this.nombre} ataca!`);
    }

}

export default Personaje; // exportamos la clase para poder importarla en otros archivos