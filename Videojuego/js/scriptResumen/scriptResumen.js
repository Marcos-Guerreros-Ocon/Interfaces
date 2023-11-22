

const mostrarResumen = (isWin) => {
    ocultarTodasLasInterfaces();
    document.querySelectorAll(".panelControles")[0].style.display = "none";
    document.getElementById("bottom").style.display = "none";
    document.getElementById("modalBatalla").style.display = "none";
    sessionStorage.clear();
    document.querySelectorAll(".planeta").forEach((planeta) => {
        planeta.style.display = "none";
    });

    document.getElementById("modalResumen").innerHTML = "";

    const titulo = document.createElement("h1");
    isWin ? titulo.innerHTML = "¡Has ganado!" : titulo.innerHTML = "¡Has perdido!";

    const tituloResumen = document.createElement("h2");
    tituloResumen.innerHTML = "Resumen de la partida";

    const tituloCapitan = document.createElement("h3");
    tituloCapitan.innerHTML = "Tu titulo de capitan es: " + getTitulo();
    const div = document.createElement("div");

    div.innerHTML = "<p>Has terminado la partida con los siguientes valores: </p>";
    div.innerHTML += "<p>Supervivientes: " + nave.supervivientes + "</p>";
    div.innerHTML += "<p>Energia: " + nave.energia + "</p>";
    div.innerHTML += "<p>Integridad: " + nave.integridad + "</p>";
    div.innerHTML += "<p>Misiles: " + nave.misiles + "</p>";
    div.innerHTML += "<p>Historia de exploración: " + nave.historiaExploracion + "</p>";
    div.innerHTML += "<p>Historia de peleas: " + nave.historiaPeleas + "</p>";

    const divEnd = document.createElement("div");
    divEnd.classList.add("end");

    const btnCerrar = document.createElement("button");
    btnCerrar.id = "btnCerrarResumen";
    btnCerrar.innerHTML = "Cerrar";
    btnCerrar.onclick = () => {
        document.getElementById("modalResumen").style.display = "none";
        document.getElementById("modalBackDrop").style.display = "none";
        setCookie("juego", "true", -1);
    };
    btnCerrar.classList.add("btnVolver");
    divEnd.appendChild(btnCerrar);

    document.getElementById("modalResumen").appendChild(titulo);
    document.getElementById("modalResumen").appendChild(tituloResumen);
    document.getElementById("modalResumen").appendChild(tituloCapitan);
    document.getElementById("modalResumen").appendChild(div);
    document.getElementById("modalResumen").appendChild(divEnd);
    document.getElementById("modalResumen").style.display = "block";
    document.getElementById("modalBackDrop").style.display = "block";

};

const getTitulo = () => {
    if (nave.historiaExploracion == 0 && nave.historiaPeleas == 0) {
        return "El pasota";
    }

    if (nave.historiaExploracion == 20 && nave.historiaPeleas == 20) {
        return "El capitán legendario";
    }

    if (nave.historiaExploracion == 20) {
        return "El curioso";
    }

    if (nave.historiaPeleas == 20) {
        return "El temido";
    }

    if (nave.historiaExploracion > nave.historiaPeleas) {
        return "El explorador";
    }

    if (nave.historiaExploracion < nave.historiaPeleas) {
        return "El broncas";
    }

    if (nave.historiaExploracion == nave.historiaPeleas) {
        return "El justo";
    }
};