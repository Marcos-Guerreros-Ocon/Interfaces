class Planeta {
    constructor(id, nombre, temperatura, gravedad, poblacion, isPelea, recompensa) {
        this.id = id;
        this.nombre = nombre;
        this.temperatura = temperatura;
        this.gravedad = gravedad;
        this.poblacion = poblacion;
        this.isPelea = isPelea;
        this.recompensa = recompensa;
    }

    setRandomNombre() {
        const nombres = ["Auroria", "Belerophon", "Cassiopeia", "Draconis", "Eurydice", "Feronia", "Ganymede", "Hydron", "Icaria", "Jovar", "Kronos", "Lysithea", "Mithra", "Nemesis", "Ophelia", "Pandora", "Quirinus", "Rhea", "Sirona", "Tethys"];
        this.nombre = nombres[Math.floor(Math.random() * nombres.length)];
    }

    setRadomTemperatura() {
        this.temperatura = Math.floor(Math.random() * 100);
    }
    setRandomGravedad() {
        this.gravedad = Math.floor(Math.random() * 100);
    }
    setRandomPoblacion() {
        this.poblacion = Math.floor(Math.random() * 100);
    }



}