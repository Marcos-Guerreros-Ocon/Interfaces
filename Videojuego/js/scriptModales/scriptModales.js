function abrirDialogoRecompensa(id) {
    if (infoPlanetas.find((planeta) => planeta.id === id).isVisitado) {
        return;
    }
    infoPlanetas.find((planeta) => planeta.id === id).isVisitado = true;
    document.getElementById(id).classList.add("visited");

    const titulo = document.createElement("h2");
    titulo.innerHTML = "¡Has encontrado una recompensa!";

    const texto = document.createElement("p");

    infoPlanetas.find((planeta) => planeta.id === id).recompensa.forEach((recompensa) => {
        texto.innerHTML += "Has encontrado " + recompensa.cantidad + " " + recompensa.tipo + "<br>";
        switch (recompensa.tipo) {
            case "supervivientes":
                nave.supervivientes = nave.supervivientes + recompensa.cantidad;
                break;
            case "energia":
                nave.energia = nave.energia + recompensa.cantidad;
                break;
            case "integridad":
                nave.integridad = nave.integridad + recompensa.cantidad;
                break;
            case "misiles":
                nave.misiles = nave.misiles + recompensa.cantidad;
                break;
        }
    });

    if (nave.energia > 100) {
        nave.energia = 100;
    }
    if (nave.integridad > 100) {
        nave.integridad = 100;
    }
    if (nave.misiles > 100) {
        nave.misiles = 100;
    }
    if (nave.supervivientes > 100) {
        nave.supervivientes = 100;
    }

    const divEnd = document.createElement("div");
    divEnd.classList.add("end");
    const btnCerrar = document.createElement("button");
    btnCerrar.classList.add("btnVolver");
    btnCerrar.id = "btnCerrarReconmpensa";
    btnCerrar.innerHTML = "Cerrar";
    btnCerrar.onclick = () => cerrarDialogoRecompensa();
    divEnd.appendChild(btnCerrar);

    document.getElementById("modalRecompensa").innerHTML = "";
    document.getElementById("modalRecompensa").appendChild(titulo);
    document.getElementById("modalRecompensa").appendChild(texto);
    document.getElementById("modalRecompensa").appendChild(divEnd);

    document.getElementById("modalRecompensa").style.display = "block";
    document.getElementById("modalBackDrop").style.display = "block";
    nave.historiaExploracion = nave.historiaExploracion + 1;
    sessionStorage.setItem("infoPlanetas", JSON.stringify(infoPlanetas));
}
function abrirDialogoPelea(id) {
    if (infoPlanetas.find((planeta) => planeta.id === id).isVisitado) {
        return;
    }
    grados = 0;
    infoPlanetas.find((planeta) => planeta.id === id).isVisitado = true;
    document.getElementById(id).classList.add("visited");

    const btnCerrar = document.createElement("button");
    btnCerrar.id = "btnCerrarPelea";
    btnCerrar.classList.add("btnVolver");
    btnCerrar.innerHTML = "Cerrar";
    btnCerrar.disabled = true;
    btnCerrar.onclick = () => { cerrarDialogoPelea(); recompensaPelea() };

    document.getElementById("modalBatalla").innerHTML = "";
    prepararPelea();

    const div = document.createElement("div");
    div.classList.add("end");
    div.appendChild(btnCerrar);
    document.getElementById("modalBatalla").appendChild(div);
    document.getElementById("modalBatalla").style.display = "block";

    isCombate = true;
    objCombate = new Combate(infoPlanetas.find((planeta) => planeta.id === id), nave, enemigos);

}

function cerrarDialogoPelea() {
    isCombate = false;
    document.getElementById("modalBatalla").style.display = "none";
}

function cerrarDialogoRecompensa() {
    document.getElementById("modalRecompensa").style.display = "none";
    document.getElementById("modalBackDrop").style.display = "none";
}

const mostrarDatosPlanteta = (e, id) => {
    document.querySelectorAll(".infoVisible").forEach((info) => {
        info.classList.remove("infoVisible");
    });
    planets.forEach((planeta) => {
        planeta.style.zIndex = "2";
    });


    document.querySelectorAll(".info").forEach((info) => {
        info.style.display = "none";
    });

    let planeta = infoPlanetas.find((planeta) => planeta.id === id);

    let txt = `
    <p>Nombre del planeta: ${planeta.nombre} </p>
    <p>Temperatura del planeta: ${planeta.temperatura}ºC</p>
    <p>Gravedad del planteta: ${planeta.gravedad}G</p>
    <p>Poblacion del planeta: ${planeta.poblacion}M</p>`;

    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerHTML = "Viajar al planeta";
    if (planeta.isVisitado) {
        btn.disabled = true;
    }
    btn.onclick = () => {
        if (planeta.isPelea) {
            abrirDialogoPelea(id);
        } else {
            abrirDialogoRecompensa(id);
        }
    };

    document.getElementById(id).classList.add("infoVisible");
    document.getElementById(id).firstElementChild.innerHTML = txt;
    document.getElementById(id).firstElementChild.append(btn);
    document.getElementById(id).firstElementChild.style.display = "flex";


    document.getElementById(id).firstElementChild.style.transform = "translateX(0px)";
    document.getElementById(id).firstElementChild.style.opacity = "0";
    if (e.x - 550 < 0 || e.x + 150 > window.innerWidth) {
        setTimeout(() => {
            document.getElementById(id).firstElementChild.style.transform = "translateX(150px)";
            document.getElementById(id).firstElementChild.style.opacity = "1";

        }, 100);
    } else {
        setTimeout(() => {
            document.getElementById(id).firstElementChild.style.transform = "translateX(-250px)";
            document.getElementById(id).firstElementChild.style.opacity = "1";

        }, 100);
    }
    document.getElementById(id).style.zIndex = "4";

};
const recompensaPelea = () => {
    const titulo = document.createElement("h2");
    titulo.innerHTML = "¡Has encontrado una recompensa digna de la pelea!";
    const texto = document.createElement("p");
    let supervivientes = 0;
    let energia = 0;
    let integridad = 0;
    let misiles = 0;
    objCombate.planeta.recompensa.forEach((recompensa) => {
        if (recompensa.cantidad != 0) {
            texto.innerHTML += "Has encontrado " + recompensa.cantidad + " " + recompensa.tipo + "<br>";
        }
        switch (recompensa.tipo) {
            case "supervivientes":
                supervivientes += recompensa.cantidad;
                break;
            case "energia":
                energia += recompensa.cantidad;
                break;
            case "integridad":
                integridad += recompensa.cantidad;
                break;
            case "misiles":
                misiles += recompensa.cantidad;
                break;
        }
    });

    objCombate = null;

    nave.supervivientes = nave.supervivientes + supervivientes;
    nave.energia = nave.energia + energia;
    nave.integridad = nave.integridad + integridad;
    nave.misiles = nave.misiles + misiles;

    if (nave.energia > 100) {
        nave.energia = 100;
    }
    if (nave.integridad > 100) {
        nave.integridad = 100;
    }
    if (nave.misiles > 100) {
        nave.misiles = 100;
    }
    if (nave.supervivientes > 100) {
        nave.supervivientes = 100;
    }
    const divEnd = document.createElement("div");
    divEnd.classList.add("end");

    const btnCerrar = document.createElement("button");
    btnCerrar.id = "btnCerrarReconmpensa";
    btnCerrar.innerHTML = "Cerrar";
    btnCerrar.onclick = () => cerrarDialogoRecompensa();
    btnCerrar.classList.add("btnVolver");

    divEnd.appendChild(btnCerrar);
    document.getElementById("modalRecompensa").innerHTML = "";
    document.getElementById("modalRecompensa").appendChild(titulo);
    document.getElementById("modalRecompensa").appendChild(texto);
    document.getElementById("modalRecompensa").appendChild(divEnd);

    document.getElementById("modalRecompensa").style.display = "flex";
    document.getElementById("modalBackDrop").style.display = "block";

};