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

    if (sessionStorage.getItem("fondo") !== null) {
        document.body.style.backgroundImage = "url(" + sessionStorage.getItem("fondo") + ")";

    }
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

const crearPlaneta = (planeta, idPlanetaCombate, idPlanetaCombate2) => {
    let planetaAux = new Planeta();
    planetaAux.id = planeta.id;
    planetaAux.setRandomNombre();
    planetaAux.setRadomTemperatura();
    planetaAux.setRandomGravedad();
    planetaAux.setRandomPoblacion();
    planetaAux.isPelea = planeta.id === idPlanetaCombate || planeta.id === idPlanetaCombate2;
    planetaAux.recompensa = !planetaAux.isPelea ? generarRecompensaSimple() : generarRecompensaPelea();
    planetaAux.isVisitado = false;
    return planetaAux;
}

const configurarEventoClick = (planeta) => {
    planeta.onclick = (e) => {
        if (isCombate) {
            return;
        }

        if (planeta.classList.contains("infoVisible")) {
            planeta.classList.remove("infoVisible");
            planeta.style.zIndex = "1";
            document.getElementById(planeta.id).firstElementChild.style.display = "none";
        } else {
            mostrarDatosPlanteta(e, planeta.id);
        }
    };
}

const cargarEventosPlanetas = () => {
    if (sessionStorage.getItem("infoPlanetas") !== null) {
        infoPlanetas = JSON.parse(sessionStorage.getItem("infoPlanetas"));
        planets.forEach((planeta) => {
            let planetaAux = infoPlanetas.find((planetaAux) => planetaAux.id === planeta.id);
            if (planetaAux.isVisitado) {
                planeta.classList.add("visited");
            }
            configurarEventoClick(planeta);
        });
        return;
    }
    infoPlanetas = [];
    let indexCombates = generarNumerosAleatorios();
    let idPlanetaCombate = planets[indexCombates[0]].id;
    let idPlanetaCombate2 = planets[indexCombates[1]].id;

    planets.forEach((planeta) => {
        let planetaAux = crearPlaneta(planeta, idPlanetaCombate, idPlanetaCombate2);
        infoPlanetas.push(planetaAux);
        configurarEventoClick(planeta);
    });
    sessionStorage.setItem("infoPlanetas", JSON.stringify(infoPlanetas));
};
const generarRecompensaPelea = () => {
    let recompensas = [];

    let supervivientes = 0;
    let energia = 0;
    let integridad = 0;
    let misiles = 0;

    for (let i = 0; i < 5; i++) {
        let recompensa = Math.floor(Math.random() * 3) + 1;
        let cantidad = Math.floor(Math.random() * 25) + 5;
        switch (recompensa) {
            case 1:
                supervivientes += cantidad;
                break;
            case 2:
                energia += cantidad;
                break;
            case 3:
                integridad += cantidad;
                break;
            case 4:
                misiles += cantidad;
                break;
        }
    }

    recompensas.push({ tipo: "supervivientes", cantidad: supervivientes });
    recompensas.push({ tipo: "energia", cantidad: energia });
    recompensas.push({ tipo: "integridad", cantidad: integridad });
    recompensas.push({ tipo: "misiles", cantidad: misiles });

    return recompensas;
};

const generarRecompensaSimple = () => {
    let recompensa = Math.floor(Math.random() * 3) + 1;
    let cantidad = Math.floor(Math.random() * 20) + 5;
    switch (recompensa) {
        case 1:
            return [{ tipo: "supervivientes", cantidad: cantidad }];
        case 2:
            return [{ tipo: "energia", cantidad: cantidad }];
        case 3:
            return [{ tipo: "integridad", cantidad: cantidad }];
        case 4:
            return [{ tipo: "misiles", cantidad: cantidad }];

    }
};

const storeData = () => {
    sessionStorage.setItem("nave", JSON.stringify(nave));
};

const startTiempoRestante = () => {
    let segundos = Math.ceil(Math.random() * (180 - 120) + 120);
    let minutos = Math.floor(segundos / 60);
    segundos = segundos % 60;
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    tiempoRestatnte.innerHTML = "0" + minutos + ":" + segundos;
};

let aux = 0;
const tiempoRestante = () => {
    minutos = tiempoRestatnte.innerHTML.split(":")[0];
    segundos = tiempoRestatnte.innerHTML.split(":")[1];
    segundos = segundos - 1;
    aux++;
    if (aux == 1) {
        tiempoRestatnte.style.animation = "";
    }
    if (aux == 30) {
        tiempoRestatnte.style.animation = "action30S 1s ";
        aux = 0;
    }

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

    if (minutos == "00" && segundos == "10") {
        tiempoRestatnte.style.animation = "avisoPocoTiempo 1s infinite";

    }

    tiempoRestatnte.innerHTML = minutos + ":" + segundos;
};

const cargarDatos = () => {

    grados = 0;
    if (getCookie("juego") === "") {
        setCookie("juego", "true", 30);
        nave = new Nave();
        nave.energia = 90;
        nave.supervivientes = 90;
        nave.integridad = 90;
        nave.misiles = 10;
        nave.tripulacion = [];
        nave.cantidadSaltos = 0;

        const escudos = {
            proa: 25,
            popa: 25,
            babor: 25,
            estribor: 25,
        };
        nave.escudos = escudos;
        sessionStorage.setItem("nave", JSON.stringify(nave));
    }

    nave = JSON.parse(sessionStorage.getItem("nave"));
    if (nave === null) {
        nave = new Nave();
        nave.energia = 90;
        nave.supervivientes = 90;
        nave.integridad = 90;
        nave.misiles = 10;
        nave.tripulacion = [];
        nave.cantidadSaltos = 0;

        const escudos = {
            proa: 25,
            popa: 25,
            babor: 25,
            estribor: 25,
        };
        nave.escudos = escudos;
        sessionStorage.setItem("nave", JSON.stringify(nave));
    }
    nave.escudos = escudos;


    supervivientes.value = nave.supervivientes;
    energia.forEach((campo) => {
        campo.value = nave.energia;
    });

    integridad.value = nave.integridad;
    misiles.value = nave.misiles;
    tripulacion = nave.tripulacion;
};

const initButtons = () => {
    gastoEnergia = 0;
    document.getElementById("girarIzquierda").onclick = () => girarNave('izquierda');
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


const combateIsOver = () => {
    if (!isCombate) {
        nave.historiaPeleas = nave.historiaPeleas + 1;
        sessionStorage.setItem("infoPlanetas", JSON.stringify(infoPlanetas));
        document.getElementById("btnCerrarPelea").disabled = false;
    }
};

const disabledButtons = () => {
    document.getElementById("girarIzquierda").onclick = "";
    document.getElementById("girarDerecha").onclick = "";
    document.getElementById("btnSaltoEmergencia").onclick = "";
    document.getElementById("btnSaltar").onclick = "";
    document.getElementById("bajarVelocidad").onclick = "";
    document.getElementById("subirVelocidad").onclick = "";
    btnCambiarArma.onclick = "";
    btnDisparar.onclick = "";
    btnRecargar.onclick = "";
    refrigeracion.onchange = "";
    document.getElementById("btnIgualarEscudos").onclick = "";

    for (const sliderName in sliders) {
        sliders[sliderName].addEventListener("input", function () {
        });
    }
    infoPlanetas.forEach((planeta) => {
        document.getElementById(planeta.id).onclick = "";
    });
};

const pintarValores = () => {
    supervivientes.value = nave.supervivientes;
    energia.forEach((campo) => {
        campo.value = nave.energia;
    });
    integridad.value = nave.integridad;
    misiles.value = nave.misiles;
    tripulacion = nave.tripulacion;

    document.getElementById("ammunition-meter-value").innerHTML = nave.misiles;
    document.getElementById("survivor-meter-value").innerHTML = nave.supervivientes;
    document.querySelectorAll("#energy-meter-value").forEach((campo) => {
        campo.innerHTML = nave.energia;
    });
    document.getElementById("damage-meter-value").innerHTML = nave.integridad;
};
const win = () => {
    return nave.cantidadSaltos == 10;
}

const isOver = () => {
    if (supervivientes.value == 0 || energia[0].value == 0 || integridad.value == 0 || tiempoRestatnte.innerHTML == "00:00") {
        return true;
    }
    return false;
};