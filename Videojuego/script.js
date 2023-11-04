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

let gastoEnergia = 0;
let planetasVisitados = new Map();
let tripulacion = [];
let interval = null;
let disparosLaser = 0;
let refrigeracionAnterior = 0;

window.onload = () => {
    startTiempoRestante();
    initButtons();
    cargarDatos();
    timer();
    setDefaultValues();


};

const setDefaultValues = () => {
    velocidad.value = 0;
    armaLaser.checked = true;
    refrigeracion.value = 0;
    progresoSalto.value = 100;
    document.getElementById("btnSaltar").disabled = true;
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





// JavaScript
var dialogo = document.getElementById('miDialogo');
var span = document.getElementsByClassName("cerrar")[0];

span.onclick = function () {
    dialogo.style.display = "none";

}

// Función para abrir el diálogo
function abrirDialogo() {
    prepararPelea();
    dialogo.style.display = "flex";

}

const initButtons = () => {
    document.getElementById("girarIzquierda").onclick = () => girarNave('izquerda');
    document.getElementById("girarDerecha").onclick = () => girarNave('derecha');
    document.getElementById("btnSaltoEmergencia").onclick = () => accionSaltoEmergencia();
    document.getElementById("bajarVelocidad").onclick = () => disminuirGastoEnergia();
    document.getElementById("subirVelocidad").onclick = () => aumentarGastoEnergia();
    btnCambiarArma.onclick = () => cambiarArma();
    btnDisparar.onclick = () => disparar();
    btnRecargar.onclick = () => recargarLaser();
    refrigeracion.onchange = () => accionRefrigerar();
    document.getElementById("btnSaltar").onclick = () => accionSalto();
};


const prepararPelea = () => {
    const campo = document.createElement("div");
    document.getElementById("mapaBatalla").innerHTML = "";


    const tabla = document.createElement("table");
    tabla.id = "tablaBatalla";

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < 12; j++) {
            const celda = document.createElement("td");
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    tabla.rows[4].cells[4].innerHTML = "<img src='res/navePropia1.png' class='navePropia'>";
    tabla.rows[4].cells[5].innerHTML = "<img src='res/navePropia2.png' class='navePropia'>";
    tabla.rows[4].cells[6].innerHTML = "<img src='res/navePropia3.png' class='navePropia'>";

    campo.appendChild(tabla);

    document.querySelector("#mapaBatalla").appendChild(campo);

};

function girarNave(direccion) {
    switch (direccion) {
        case 'izquerda':
            const tabla = document.getElementById("tablaBatalla");
            let grados = 0;
            const nave1 = document.querySelectorAll(".navePropia")[0];
            const nave2 = document.querySelectorAll(".navePropia")[1];
            const nave3 = document.querySelectorAll(".navePropia")[2];



            if (nave1.style.transform != "") {
                grados = nave1.style.transform.split("(")[1].split("deg")[0];
            }

            grados = parseInt(grados) + 90;
            if (grados == 360) {
                grados = 0;
            }


            nave1.style.transform = "rotate(" + grados + "deg)";
            nave2.style.transform = "rotate(" + grados + "deg)";
            nave3.style.transform = "rotate(" + grados + "deg)";

            switch (grados) {
                case 0:
                    tabla.rows[4].cells[4].innerHTML = nave1.innerHTML;
                    tabla.rows[4].cells[5].innerHTML = nave2.innerHTML;
                    tabla.rows[4].cells[6].innerHTML = nave3.innerHTML;
                case 90:
                    tabla.rows[3].cells[5].innerHTML = nave1.innerHTML;
                    tabla.rows[4].cells[5].innerHTML = nave2.innerHTML;
                    tabla.rows[5].cells[5].innerHTML = nave3.innerHTML;
                    break;
                case 180:
                    tabla.rows[4].cells[6].innerHTML = nave1.innerHTML;
                    tabla.rows[4].cells[5].innerHTML = nave2.innerHTML;
                    tabla.rows[4].cells[4].innerHTML = nave3.innerHTML;
                    break;
                case 270:
                    tabla.rows[4].cells[6].innerHTML = nave1.innerHTML;
                    tabla.rows[4].cells[5].innerHTML = nave2.innerHTML;
                    tabla.rows[4].cells[4].innerHTML = nave3.innerHTML;
                    break;

            }



            break;
        case 'derecha':

            break;
    }
};

// Almacenar datos en el navegador
const storeData = () => {
    sessionStorage.setItem("supervivientes", supervivientes.value);
    sessionStorage.setItem("energia", energia[0].value);
    sessionStorage.setItem("integridad", integridad.value);
    sessionStorage.setItem("misiles", misiles.value);
    sessionStorage.setItem("tripulacion", JSON.stringify(tripulacion));
};

// contador de tiempo, no es editable, al cargar la página tiene un valor de entre 2 y 3 minutos. Cada segundo se descuenta un segundo.
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

// Se cargan los datos del navegador, si no hay datos se crean unos nuevos
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

    integridad.value = sessionStorage.getItem("integridad");
    misiles.value = sessionStorage.getItem("misiles");
    tripulacion = sessionStorage.getItem("tripulacion");
};

/*
const actualizarValues = () => {
    supervivientes.value = supervivientes.value - 1;
    energia.forEach((campo) => {
        campo.value = campo.value - gastoEnergia;
    });

    integridad.value = integridad.value - 1;
    misiles.value = misiles.value - 1;
    tripulacion = tripulacion - 1;
};
*/
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
    }
}

const accionSalto = () => {
    ocultarTodasLasInterfaces();
    storeData();
    startTiempoRestante();
    setDefaultValues();
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
};
// END :: FUNCIONES DEL MOTOR DE SALTO

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
}
function destroyCookie(key) {
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
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