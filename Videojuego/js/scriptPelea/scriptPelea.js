const prepararPelea = () => {
    const indexPosicion = generarNumerosAleatorios();
    const posiblesPosiciones = ["arriba", "abajo", "izquierda", "derecha"];
    const posicion0 = posiblesPosiciones[indexPosicion[0]];
    const posicion1 = posiblesPosiciones[indexPosicion[1]];
    const posiciones = [posicion0, posicion1];

    const campo = document.createElement("div");
    document.getElementById("mapaBatalla").innerHTML = "";


    const tabla = document.createElement("table");
    tabla.setAttribute("cellspacing", "0");
    tabla.setAttribute("cellpadding", "0");

    tabla.id = "tablaBatalla";

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const celda = document.createElement("td");
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }

    let enemigosAux = [];
    let id = 0;
    posiciones.forEach((posicion) => {
        switch (posicion) {
            case 'arriba':
                tabla.rows[1].cells[3].innerHTML = "<img id='" + id + "' src='res/naveEnemiga.png' class='naveEnemiga'>";
                break;
            case 'abajo':
                tabla.rows[7].cells[3].innerHTML = "<img id='" + id + "' src='res/naveEnemiga.png' class='naveEnemiga'>";
                break;
            case 'izquierda':
                tabla.rows[4].cells[0].innerHTML = "<img id='" + id + "' src='res/naveEnemiga.png' class='naveEnemiga'>";
                break;
            case 'derecha':
                tabla.rows[4].cells[6].innerHTML = "<img id='" + id + "'  src='res/naveEnemiga.png' class='naveEnemiga'>";
                break;
        }
        enemigosAux.push(new NaveEnemiga(id, 100, 25, posicion));
        id = id + 1;
    });
    enemigos = enemigosAux;

    tabla.rows[4].cells[2].innerHTML = "<img src='res/navePropia1.png' style='transform:rotate(0deg)' class='navePropia'>";
    tabla.rows[4].cells[3].innerHTML = "<img src='res/navePropia2.png' style='transform:rotate(0deg)' class='navePropia'>";
    tabla.rows[4].cells[4].innerHTML = "<img src='res/navePropia3.png' style='transform:rotate(0deg)' class='navePropia'>";

    nave.posicion = 'derecha';
    campo.appendChild(tabla);

    document.querySelector("#modalBatalla").appendChild(campo);

};

function girarNave(direccion) {
    const tabla = document.getElementById("tablaBatalla");
    const naves = document.querySelectorAll(".navePropia");

    grados = direccion === 'izquierda' ? (grados - 90 + 360) % 360 : (grados + 90) % 360;

    const posiciones = {
        izquierda: {
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

    switch (grados) {
        case 0:
            nave.posicion = 'derecha';
            break;
        case 90:
            nave.posicion = 'abajo';
            break;
        case 180:
            nave.posicion = 'izquierda';
            break;
        case 270:
            nave.posicion = 'arriba';
            break;
    }


    naves.forEach((nave, index) => {
        const [fila, columna] = posiciones[direccion][grados][index];
        tabla.rows[fila].cells[columna].appendChild(nave);
        nave.style.transform = `rotate(${grados}deg)`;
    });
}

const damageCombate = () => {
    enemigos.forEach((enemigo) => {
        let damage = 0;

        switch (enemigo.posicion) {
            case 'arriba':
                switch (nave.posicion) {
                    case 'arriba':
                        damage = (escudos.proa - enemigo.ataque);
                        break;
                    case 'abajo':
                        damage = (escudos.popa - enemigo.ataque);
                        break;
                    case 'izquierda':
                        damage = (escudos.estribor - enemigo.ataque);
                        break;
                    case 'derecha':
                        damage = (escudos.babor - enemigo.ataque);
                        break;
                };
                break;
            case 'abajo':
                switch (nave.posicion) {
                    case 'arriba':
                        damage = (escudos.popa - enemigo.ataque);
                        break;
                    case 'abajo':
                        damage = (escudos.proa - enemigo.ataque);
                        break;
                    case 'izquierda':
                        damage = (escudos.babor - enemigo.ataque);
                        break;
                    case 'derecha':
                        damage = (escudos.estribor - enemigo.ataque);
                        break;
                };
                break;
            case 'izquierda':
                switch (nave.posicion) {
                    case 'arriba':
                        damage = (escudos.estribor - enemigo.ataque);
                        break;
                    case 'abajo':
                        damage = (escudos.babor - enemigo.ataque);
                        break;
                    case 'izquierda':
                        damage = (escudos.proa - enemigo.ataque);
                        break;
                    case 'derecha':
                        damage = (escudos.popa - enemigo.ataque);
                        break;
                };
                break;
            case 'derecha':
                switch (nave.posicion) {
                    case 'arriba':
                        damage = (escudos.babor - enemigo.ataque);
                        break;
                    case 'abajo':
                        damage = (escudos.estribor - enemigo.ataque);
                        break;
                    case 'izquierda':
                        damage = (escudos.popa - enemigo.ataque);
                        break;
                    case 'derecha':
                        damage = (escudos.proa - enemigo.ataque);
                        break;
                };
                break;
        }

        if (damage == 0) {
            nave.supervivientes = nave.supervivientes - enemigos.length;;
            nave.energia = nave.energia - 1 * enemigos.length;
            nave.integridad = nave.integridad - enemigos.length;;
            return;
        }

        if (damage > 0) {
            nave.supervivientes = nave.supervivientes - 0;
            nave.energia = nave.energia - 0;
            nave.integridad = nave.integridad - 0;
            return;
        }

        if (damage < 0) {
            nave.supervivientes = nave.supervivientes - 2 * enemigos.length;;
            nave.energia = nave.energia - 2 * enemigos.length;
            nave.integridad = nave.integridad - 2 * enemigos.length;
            return;
        }

    });
}

