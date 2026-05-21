class Personaje {   
    constructor(nombre, vida, ataque) { // constructor es un método especial 
                                // que se ejecuta automáticamente al crear 
                                // una instancia de la clase
        this.nombre = nombre; // this hace referencia a la instancia actual
        this.vida = vida; 
        this.ataque = ataque;

        this.defendiendo = false; // propiedad para saber si el personaje se está defendiendo

    }

    atacar(objetivo) {
        let danio = this.ataque; // el daño base es el ataque del personaje 

        if (objetivo.defendiendo) { // si el objetivo se está defendiendo, el daño se reduce a la mitad\
            danio = Math.floor(danio / 2); // redondeamos hacia abajo el daño reducido
        }
        objetivo.vida -= danio; // restamos el daño a la vida del objetivo
        return `${this.nombre} le causa ${danio} de daño.`;
    }

    defender() {
        this.defendiendo = true; // el personaje se pone en modo defensa

        return `${this.nombre} se está defendiendo.`;
    }

    terminarTurno() {
        this.defendiendo = false; // el personaje deja de defendirse
    }

}

export default Personaje; // exportamos la clase para poder importarla en otros archivos