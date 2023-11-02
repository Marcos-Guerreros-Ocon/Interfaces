const planets = document.querySelectorAll('.planeta');
const saltoEmergencia = document.getElementById('jump-progress');
const tiempoRestatnte = document.getElementById('tiempoRestante');
let planetasVisitados = new Map();

window.onload = () => {
    startTimer();
    startTimerLeft();
};

const reiniciarTiempo = () => {
    startTimerLeft();
    startTimer();
};


planets.forEach((planet) => {
    planet.addEventListener('click', (event) => {
        let posibilidad = Math.round(Math.random() * 100);

        if (planetasVisitados.has(event.target.id)) {
            posibilidad = planetasVisitados.get(event.target.id);
        } else {
            planetasVisitados.set(event.target.id, posibilidad);
            abrirDialogo();
        }

        if (posibilidad < 50) {


        } else {



        }

    });

});

const startTimerLeft = () => {
    let segundos = Math.ceil(Math.random() * (180 - 120) + 120);
    let minutos = Math.floor(segundos / 60);
    segundos = segundos % 60;
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    tiempoRestatnte.value = "0" + minutos + ":" + segundos;


    let intervalTiempoRestante = setInterval(() => {
        minutos = tiempoRestatnte.value.split(":")[0];
        segundos = tiempoRestatnte.value.split(":")[1];
        segundos = segundos - 1;

        if (minutos == 0 && segundos == 0) {
            clearInterval(intervalTiempoRestante);
            //reiniciarTiempo();
        }

        if (segundos == 0 && minutos > 0) {
            minutos = minutos - 1;
            segundos = 59;
        }
        if (segundos < 10) {
            segundos = "0" + segundos;
        }

        if (!new String(minutos).startsWith("0")) {
            minutos = "0" + minutos;

        }
        tiempoRestatnte.value = minutos + ":" + segundos;
    }, 1000);
};

const startTimer = () => {
    saltoEmergencia.value = 100;
    setInterval(() => {
        if (saltoEmergencia.value > 0) {
            saltoEmergencia.value = saltoEmergencia.value - 1;
        }
    }, 1000);
}

function mostrarEscudoInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("shield-interface").style.display = "block";
}

function mostrarPropulsorInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("propulsor-interface").style.display = "block";
}

function mostrarArmaInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("arma-interface").style.display = "block";
}

function mostrarTripulacionInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("tripulacion-interface").style.display = "block";
}

function mostrarMotorSaltoInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("motor-salto-interface").style.display = "block";
}

function ocultarTodasLasInterfaces() {
    document.getElementById("shield-interface").style.display = "none";
    document.getElementById("propulsor-interface").style.display = "none";
    document.getElementById("arma-interface").style.display = "none";
    document.getElementById("tripulacion-interface").style.display = "none";
    document.getElementById("motor-salto-interface").style.display = "none";
}



// JavaScript
var dialogo = document.getElementById('miDialogo');
var span = document.getElementsByClassName("cerrar")[0];

// Función para abrir el diálogo
function abrirDialogo() {
    prepararPelea();
    dialogo.style.display = "flex";

}


const prepararPelea = () => {
    const campo = document.createElement("div");

    campo.classList.add("campo");
    const tabla = document.createElement("table");
    let pintado = false;
    for (let i = 0; i < 8; i++) {
        const fila = document.createElement("tr");


        for (let j = 0; j < 12; j++) {
            const celda = document.createElement("td");
            if (j > 4 && j < 8 && i == 4) {
                if (!pintado) {
                    celda.colSpan = 4;
                    celda.innerHTML = "<img src='res/navePropia.png'>";
                }
                pintado = true;

            }

            fila.appendChild(celda);
        }

        tabla.appendChild(fila);
    }

    campo.appendChild(tabla);
    document.querySelector(".dialogo-contenido").appendChild(campo);

};