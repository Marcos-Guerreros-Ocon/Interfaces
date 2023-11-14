const planets = document.querySelectorAll('.planeta');
const progresoSalto = document.getElementById('jump-progress');
const tiempoRestatnte = document.getElementById('tiempoRestante');
const supervivientes = document.getElementById("survivor-meter");
const energia = document.querySelectorAll("#energy-meter");
const integridad = document.getElementById("damage-meter");
const misiles = document.getElementById("ammunition-meter");
const velocidad = document.getElementById("speed-slider");
const armaLaser = document.getElementById("weapon1");
const armaMisil = document.getElementById("weapon2");
const municionMisil = document.getElementById("ammunition-meter");
const btnDisparar = document.getElementById("btnDisparar");
const btnRecargar = document.getElementById("btnRecargar");
const btnCambiarArma = document.getElementById("btnCambiarArma");
const refrigeracion = document.getElementById("refrigerarMotor");
const escudoProa = document.getElementById("proa-shield");
const escudoPopa = document.getElementById("popa-shield");
const escudoBabor = document.getElementById("babor-shield")
const escudoEstribor = document.getElementById("estribor-shield");

let gastoEnergia = 0;
let planetasVisitados = new Map();
let tripulacion = [];
let interval = null;
let disparosLaser = 0;
let refrigeracionAnterior = 0;
let peleaPlaneta = new Map();

const sliders = {
    proa: document.getElementById("proa-shield"),
    popa: document.getElementById("popa-shield"),
    babor: document.getElementById("babor-shield"),
    estribor: document.getElementById("estribor-shield"),
};

window.onload = () => {
    cargarDatos();
    startTiempoRestante();
    setDefaultValues();
    cargarEventosPlanetas();
    timer();
    initButtons();
};

// BEGIN :: FUNCIONES GENERALES
const setDefaultValues = () => {
    velocidad.value = 0;
    armaLaser.checked = true;
    refrigeracion.value = 0;
    progresoSalto.value = 100;
    escudoProa.value = 25;
    escudoPopa.value = 25;
    escudoBabor.value = 25;
    escudoEstribor.value = 25;
    document.getElementById("btnSaltar").disabled = true;

    document.getElementById("survivor-meter-value").innerHTML = supervivientes.value;
    document.querySelectorAll("#energy-meter-value").forEach((campo) => {
        campo.innerHTML = energia[0].value;
    });
    document.getElementById("damage-meter-value").innerHTML = integridad.value;

};

const generarNumerosAleatorios = () => {
    let num1 = Math.floor(Math.random() * 4);
    let num2 = Math.floor(Math.random() * 4);
    while (num2 === num1) {
        num2 = Math.floor(Math.random() * 4);
    }
    return [num1, num2];
};

const cargarEventosPlanetas = () => {
    planetasVisitados.clear();
    let indexCombates = generarNumerosAleatorios();
    let idPlanetaCombate = planets[indexCombates[0]].id;
    let idPlanetaCombate2 = planets[indexCombates[1]].id;

    planets.forEach((planeta) => {
        if (planeta.id === idPlanetaCombate || planeta.id === idPlanetaCombate2) {
            planeta.onclick = () => {

                abrirDialogoPelea(planeta.id);
            }
        } else {
            planeta.onclick = () => {
                abrirDialogoRecompensa(planeta.id);
            }
        }
    });
};

const storeData = () => {
    sessionStorage.setItem("supervivientes", supervivientes.value);
    sessionStorage.setItem("energia", energia[0].value);
    sessionStorage.setItem("integridad", integridad.value);
    sessionStorage.setItem("misiles", misiles.value);
    sessionStorage.setItem("tripulacion", tripulacion);
};

const startTiempoRestante = () => {
    let segundos = Math.ceil(Math.random() * (180 - 120) + 120);
    let minutos = Math.floor(segundos / 60);
    segundos = segundos % 60;
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    tiempoRestatnte.value = "0" + minutos + ":" + segundos;
};

const tiempoRestante = () => {
    minutos = tiempoRestatnte.value.split(":")[0];
    segundos = tiempoRestatnte.value.split(":")[1];
    segundos = segundos - 1;

    if (segundos == -1) {
        minutos = minutos - 1;
        segundos = 59;
    }

    if (minutos < 10 && !new String(minutos).startsWith("0")) {
        minutos = "0" + minutos;
    }
    if (minutos == "0") {
        minutos = "0" + minutos;
    }

    if (segundos < 10) {
        segundos = "0" + segundos;
    }

    tiempoRestatnte.value = minutos + ":" + segundos;
};

const cargarDatos = () => {

    if (getCookie("juego") === "") {
        setCookie("juego", "true", 30);
        sessionStorage.setItem("supervivientes", 90);
        sessionStorage.setItem("energia", 90);
        sessionStorage.setItem("integridad", 90);
        sessionStorage.setItem("misiles", 10);
        sessionStorage.setItem("tripulacion", JSON.stringify([]));
    }

    supervivientes.value = sessionStorage.getItem("supervivientes");
    energia.forEach((campo) => {
        campo.value = sessionStorage.getItem("energia");
    });

    document.getElementById("ammunition-meter-value").innerHTML = sessionStorage.getItem("misiles");
    integridad.value = sessionStorage.getItem("integridad");
    misiles.value = sessionStorage.getItem("misiles");
    tripulacion = sessionStorage.getItem("tripulacion");
};

const initButtons = () => {
    document.getElementById("girarIzquierda").onclick = () => girarNave('izquerda');
    document.getElementById("girarDerecha").onclick = () => girarNave('derecha');
    document.getElementById("btnSaltoEmergencia").onclick = () => accionSaltoEmergencia();
    document.getElementById("btnSaltar").onclick = () => accionSalto();
    document.getElementById("bajarVelocidad").onclick = () => disminuirGastoEnergia();
    document.getElementById("subirVelocidad").onclick = () => aumentarGastoEnergia();
    btnCambiarArma.onclick = () => cambiarArma();
    btnDisparar.onclick = () => disparar();
    btnRecargar.onclick = () => recargarLaser();
    refrigeracion.onchange = () => accionRefrigerar();
    document.getElementById("btnIgualarEscudos").onclick = () => igualarEscudos();

    for (const sliderName in sliders) {
        sliders[sliderName].addEventListener("input", function () {
            updateSliders(sliderName);
        });
    }
};

const timer = () => {
    const a = setInterval(() => {
        actuliazarEnergia();
        tiempoRestante();
        storeData();
        enfriamientoMotor();
        if (isOver()) {
            clearInterval(a);
            alert("GAME OVER");
            setCookie("juego", "true", -1);
        }

    }, 1000);
};

const isOver = () => {
    if (supervivientes.value == 0 || energia[0].value == 0 || integridad.value == 0 || tiempoRestatnte.value == "00:00") {
        return true;
    }
    return false;
};
// END :: FUNCIONES GENERALES

// BEGIN :: FUNCIONES DE LOS MODALES
function abrirDialogoRecompensa(id) {
    if (planetasVisitados.has(id)) {
        return;
    }

    planetasVisitados.set(id, true);

    const titulo = document.createElement("h2");
    titulo.innerHTML = "¡Has encontrado una recompensa!";

    const texto = document.createElement("p");

    let recompensa = Math.floor(Math.random() * 3) + 1;
    let cantidad = Math.floor(Math.random() * 20) + 5;
    switch (recompensa) {
        case 1:
            supervivientes.value = parseInt(supervivientes.value) + cantidad;
            texto.innerHTML = "Has encontrado " + cantidad + " supervivientes";
            document.getElementById("survivor-meter-value").innerHTML = supervivientes.value;
            break;
        case 2:
            energia.forEach((campo) => {
                campo.value = parseInt(campo.value) + cantidad;;
            });
            texto.innerHTML = "Has encontrado " + cantidad + " energía";
            document.getElementById("energy-meter-value").innerHTML = energia[0].value;
            break;
        case 3:
            integridad.value = parseInt(integridad.value) + cantidad;
            texto.innerHTML = "Has recuperado " + cantidad + " de integridad";
            document.getElementById("damage-meter-value").innerHTML = integridad.value;
            break;
        case 4:
            misiles.value = parseInt(misiles.value) + cantidad;
            texto.innerHTML = "Has encontrado " + cantidad + " misiles";
            break;
    }
    if (energia[0].value > 100) {
        energia.forEach((campo) => {
            campo.value = 100;
        });
    }
    if (integridad.value > 100) {
        integridad.value = 100;
    }
    if (misiles.value > 100) {
        misiles.value = 100;
    }
    if (supervivientes.value > 100) {
        supervivientes.value = 100;
    }


    const btnCerrar = document.createElement("button");
    btnCerrar.id = "btnCerrarReconmpensa";
    btnCerrar.innerHTML = "Cerrar";
    btnCerrar.onclick = () => cerrarDialogoRecompensa();

    document.getElementById("modalRecompensa").innerHTML = "";
    document.getElementById("modalRecompensa").appendChild(titulo);
    document.getElementById("modalRecompensa").appendChild(texto);
    document.getElementById("modalRecompensa").appendChild(btnCerrar);

    document.getElementById("modalRecompensa").style.display = "block";
    document.getElementById("modalBackDrop").style.display = "block";


}
function abrirDialogoPelea(id) {
    if (planetasVisitados.has(id)) {
        return;
    }

    const btnCerrar = document.createElement("button");
    btnCerrar.id = "btnCerrarPelea";
    btnCerrar.innerHTML = "Cerrar";
    btnCerrar.onclick = () => cerrarDialogoPelea();

    document.getElementById("modalBatalla").innerHTML = "";
    prepararPelea();

    document.getElementById("modalBatalla").appendChild(btnCerrar);
    document.getElementById("modalBatalla").style.display = "block";
}
function cerrarDialogoPelea() {
    document.getElementById("modalBatalla").style.display = "none";
}

function cerrarDialogoRecompensa() {
    document.getElementById("modalRecompensa").style.display = "none";
    document.getElementById("modalBackDrop").style.display = "none";
}
// END :: FUNCIONES DE LOS MODALES

// BEGIN :: FUNCIONES DE LA PELEA
const prepararPelea = (tablaLista) => {
    if (tablaLista !== undefined) {
        document.getElementById("mapaBatalla").innerHTML = "";
        document.getElementById("mapaBatalla").appendChild(tabla);
        return;
    }

    const indexPosicion = generarNumerosAleatorios();
    const posiblesPosiciones = ["arriba", "abajo", "izquerda", "derecha"];
    const posicion0 = posiblesPosiciones[indexPosicion[0]];
    const posicion1 = posiblesPosiciones[indexPosicion[1]];
    const posiciones = [posicion0, posicion1];

    const campo = document.createElement("div");
    document.getElementById("mapaBatalla").innerHTML = "";


    const tabla = document.createElement("table");
    tabla.setAttribute("cellpadding", "0");
    tabla.setAttribute("cellspacing", "0");

    tabla.id = "tablaBatalla";

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const celda = document.createElement("td");
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }


    posiciones.forEach((posicion) => {
        switch (posicion) {
            case 'arriba':
                tabla.rows[1].cells[3].innerHTML = "<img src='res/naveEnemiga.png' class='naveEnemiga'>";
                break;
            case 'abajo':
                tabla.rows[7].cells[3].innerHTML = "<img src='res/naveEnemiga.png' class='naveEnemiga'>";
                break;
            case 'izquerda':
                tabla.rows[4].cells[0].innerHTML = "<img src='res/naveEnemiga.png' class='naveEnemiga'>";
                break;
            case 'derecha':
                tabla.rows[4].cells[6].innerHTML = "<img src='res/naveEnemiga.png' class='naveEnemiga'>";
                break;
        }
    });


    tabla.rows[4].cells[2].innerHTML = "<img src='res/navePropia1.png' class='navePropia'>";
    tabla.rows[4].cells[3].innerHTML = "<img src='res/navePropia2.png' class='navePropia'>";
    tabla.rows[4].cells[4].innerHTML = "<img src='res/navePropia3.png' class='navePropia'>";



    campo.appendChild(tabla);

    document.querySelector("#modalBatalla").appendChild(campo);

};

let grados = 0;
function girarNave(direccion) {
    const tabla = document.getElementById("tablaBatalla");
    const naves = document.querySelectorAll(".navePropia");

    grados = direccion === 'izquerda' ? (grados - 90 + 360) % 360 : (grados + 90) % 360;

    const posiciones = {
        izquerda: {
            0: [[4, 2], [4, 3], [4, 4]],
            90: [[5, 3], [4, 3], [3, 3]],
            180: [[4, 2], [4, 3], [4, 4]],
            270: [[5, 3], [4, 3], [3, 3]]
        },
        derecha: {
            0: [[4, 4], [4, 3], [4, 2]],
            90: [[3, 3], [4, 3], [5, 3]],
            180: [[4, 4], [4, 3], [4, 2]],
            270: [[3, 3], [4, 3], [5, 3]]
        }
    };

    naves.forEach((nave, index) => {
        const [fila, columna] = posiciones[direccion][grados][index];
        tabla.rows[fila].cells[columna].appendChild(nave);
        nave.style.transform = `rotate(${grados}deg)`;
    });
}
// END :: FUNCIONES DE LA PELEA

// BEGIN :: FUNCIONES DE LOS ESCUDOS
const updateSliders = (updatedSlider) => {
    let totalCurrentValue = 0;


    for (const sliderName in sliders) {
        console.log(sliderName);
        totalCurrentValue += parseInt(sliders[sliderName].value);
    }

    const adjustment = 100 - totalCurrentValue;

    const otherSlidersCount = Object.keys(sliders).length - 1;
    const sharedAdjustment = adjustment / otherSlidersCount;

    for (const sliderName in sliders) {
        if (sliderName !== updatedSlider) {
            sliders[sliderName].value = (parseInt(sliders[sliderName].value) + sharedAdjustment).toFixed(2);
        }
    }

    sliders[updatedSlider].value = (100 - (totalCurrentValue - parseInt(sliders[updatedSlider].value))).toFixed(2);
}
const igualarEscudos = () => {
    valorAntiguoBabor = 25;
    valorAntiguoEstribor = 25;
    valorAntiguoPopa = 25;
    valorAntiguoProa = 25;
    escudoBabor.value = 25;
    escudoEstribor.value = 25;
    escudoPopa.value = 25;
    escudoProa.value = 25;
};
// END :: FUNCIONES DE LOS ESCUDOS

const aumentarGastoEnergia = () => {
    gastoEnergia = gastoEnergia + 1;
    velocidad.value = 100 * gastoEnergia;
}

const disminuirGastoEnergia = () => {
    if (gastoEnergia > 0) {
        gastoEnergia = gastoEnergia - 1;
        velocidad.value = 100 * gastoEnergia;
    }
}

const actuliazarEnergia = () => {
    energia.forEach((campo) => {
        campo.value = campo.value - gastoEnergia;
        document.querySelectorAll("#energy-meter-value").forEach((campo) => {
            campo.innerHTML = energia[0].value;
        });
    });
};

// BEGIN :: FUNCIONES DE LAS ARMAS
const disparar = () => {
    if (armaLaser.checked) {
        dipararLaser();
    } else {
        dispararMisil();
    }
};

const dipararLaser = () => {

    disparosLaser = disparosLaser + 1;

    energia.forEach((campo) => {
        campo.value = campo.value - 1;
    });

    if (disparosLaser == 5) {
        btnDisparar.disabled = true;
    }
};

const recargarLaser = () => {
    disparosLaser = 0;
    btnDisparar.disabled = false;

};

const cambiarArma = () => {
    if (armaLaser.checked) {
        armaMisil.checked = true;
        btnDisparar.disabled = false;
    } else {
        if (disparosLaser == 5) btnDisparar.disabled = true;
        armaLaser.checked = true;
    }
};

const dispararMisil = () => {
    document.getElementById("ammunition-meter-value").innerHTML = misiles.value;
    if (misiles.value == 0) {
        return;
    }
    misiles.value = misiles.value - 1;
}
// END :: FUNCIONES DE LAS ARMAS

// BEGIN :: FUNCIONES DEL MOTOR DE SALTO
const accionRefrigerar = () => {
    gastoEnergia = gastoEnergia - refrigeracionAnterior + refrigeracion.value;
    refrigeracionAnterior = refrigeracion.value;



    if (progresoSalto.value == 0) {
        document.getElementById("btnSaltar").disabled = false;
    }
};

const enfriamientoMotor = () => {
    if (progresoSalto.value > 0) {
        progresoSalto.value = progresoSalto.value - (1 + parseInt(refrigeracion.value));
        document.getElementById("jump-progress-value").innerHTML = progresoSalto.value + "%";
    }
    if (progresoSalto.value >= 50) {
        progresoSalto.classList = [];
        progresoSalto.classList.add("rojo");
    } else if (progresoSalto.value >= 25) {
        progresoSalto.classList = [];
        progresoSalto.classList.add("amarillo");
        progresoSalto.style.background = "yellow";
    } else {
        progresoSalto.classList = [];
    }

    if (progresoSalto.value == 0) {
        document.getElementById("btnSaltar").disabled = false;

    }
}

const accionSalto = () => {
    ocultarTodasLasInterfaces();
    storeData();
    startTiempoRestante();
    setDefaultValues();
    cargarEventosPlanetas();
};

const accionSaltoEmergencia = () => {
    energia.forEach((campo) => {
        campo.value = campo.value - 30;
    });
    supervivientes.value = supervivientes.value - 30;
    integridad.value = integridad.value - 30;

    if (supervivientes.value < 0) {
        supervivientes.value = 0;
    }
    energia.forEach((campo) => {
        if (campo.value < 0) {
            campo.value = 0;
        }
    });
    if (integridad.value < 0) {
        integridad.value = 0;
    }

    ocultarTodasLasInterfaces();
    storeData();
    startTiempoRestante();
    setDefaultValues();
    cargarEventosPlanetas();
};
// END :: FUNCIONES DEL MOTOR DE SALTO

// BEGIN :: FUNCIONES DE LAS COOKIES
function setCookie(key, value, day) {
    const d = new Date();
    d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}
function getCookie(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
// END :: FUNCIONES DE LAS COOKIES

// BEGIN :: FUNCIONES DE LA INTERFAZ
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

// END :: FUNCIONES DE LA INTERFAZ

