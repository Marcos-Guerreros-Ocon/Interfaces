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