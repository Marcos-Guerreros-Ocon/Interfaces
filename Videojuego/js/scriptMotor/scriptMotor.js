const accionRefrigerar = () => {
    gastoEnergia = gastoEnergia - refrigeracionAnterior + refrigeracion.value;
    refrigeracionAnterior = refrigeracion.value;

    if (progresoSalto.value == 0 && !isCombate) {
        document.getElementById("btnSaltar").disabled = false;
    }
};

const enfriamientoMotor = () => {
    if (progresoSalto.value > 0) {
        progresoSalto.value = progresoSalto.value - (1 + parseInt(refrigeracion.value));
        nave.energia = nave.energia - gastoEnergia;
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

    if (progresoSalto.value == 0 && isCombate === false) {
        document.getElementById("btnSaltar").disabled = false;
    }
}

const accionSalto = () => {
    document.getElementById("cinematica").style.display = "block";
    setTimeout(() => {
        document.getElementById("cinematica").style.display = "none"
    }, 3000);
    nave.cantidadSaltos = nave.cantidadSaltos + 1;

    tiempoRestatnte.style.animation = "";
    gastoEnergia = 0;
    sessionStorage.setItem("fondo", backgrounds[Math.floor(Math.random() * backgrounds.length)])
    document.body.style.backgroundImage = "url(" + sessionStorage.getItem("fondo") + ")";

    document.querySelectorAll(".visited").forEach((planeta) => {
        planeta.classList.remove("visited");
    });
    document.querySelectorAll(".info").forEach((info) => {
        info.style.display = "none";
    });

    sessionStorage.removeItem("infoPlanetas");
    ocultarTodasLasInterfaces();
    storeData();
    startTiempoRestante();
    setDefaultValues();
    cargarEventosPlanetas();
};

const accionSaltoEmergencia = () => {
    document.getElementById("cinematica").style.display = "block";
    setTimeout(() => {
        document.getElementById("cinematica").style.display = "none"
    }, 3000);
    sessionStorage.removeItem("infoPlanetas");
    isCombate = false;
    document.getElementById("modalBatalla").style.display = "none";
    sessionStorage.setItem("fondo", backgrounds[Math.floor(Math.random() * backgrounds.length)])
    document.body.style.backgroundImage = "url(" + sessionStorage.getItem("fondo") + ")";
    nave.cantidadSaltos = nave.cantidadSaltos + 1;

    nave.energia = nave.energia - 30;
    nave.supervivientes = nave.supervivientes - 30;
    nave.integridad = nave.integridad - 30;
    tiempoRestatnte.style.animation = "";
    if (nave.energia < 0) nave.energia = 0;
    if (nave.supervivientes < 0) nave.supervivientes = 0;
    if (nave.integridad < 0) nave.integridad = 0;

    document.querySelectorAll(".visited").forEach((planeta) => {
        planeta.classList.remove("visited");
    });
    document.querySelectorAll(".info").forEach((info) => {
        info.style.display = "none";
    });

    ocultarTodasLasInterfaces();
    storeData();
    pintarValores();
    startTiempoRestante();
    setDefaultValues();
    cargarEventosPlanetas();
};