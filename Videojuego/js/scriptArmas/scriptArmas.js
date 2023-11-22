const disparar = () => {
    if (armaLaser.checked) {
        dipararLaser();
    } else {
        dispararMisil();
    }
};

const dipararLaser = () => {
    disparosLaser = disparosLaser + 1;
    nave.energia = nave.energia - 1;

    if (disparosLaser == 5) {
        btnDisparar.disabled = true;
    }

    if (isCombate) {
        let posicionNave = nave.posicion;

        const disparo = document.createElement("div");
        disparo.id = "disparo";

        let posicionX = 0;
        let posicionY = 0;
        switch (posicionNave) {
            case 'derecha':
                posicionY = 4;
                posicionX = 5;
                disparo.style.animation = "disparo 1s linear";
                break;
            case 'izquierda':
                disparo.style.animation = "disparo 1s linear reverse";
                posicionY = 4;
                posicionX = 1;
                break;
            case 'arriba':
                disparo.style.animation = "disparoY 1s linear reverse";
                posicionY = 2;
                posicionX = 3;
                break;
            case 'abajo':
                disparo.style.animation = "disparoY 1s linear";
                posicionY = 6;
                posicionX = 3;
                break;
        }

        enemigos.forEach((enemigo) => {
            if (enemigo.posicion === posicionNave) {
                enemigo.vida = enemigo.vida - 10;
                if (enemigo.vida == 0) {
                    enemigos.splice(enemigos.indexOf(enemigo), 1);
                    document.getElementById(enemigo.id).remove();
                }
            }
        });

        document.getElementById("tablaBatalla").rows[posicionY].cells[posicionX].appendChild(disparo);
        isCombate = enemigos.length > 0;
        if (!isCombate) combateIsOver();
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
    nave.misiles = nave.misiles - 1;

    if (isCombate) {
        let posicionNave = nave.posicion;
        enemigos.forEach((enemigo) => {
            if (enemigo.posicion === posicionNave) {
                enemigo.vida = enemigo.vida - 50;
                if (enemigo.vida == 0) {
                    enemigos.splice(enemigos.indexOf(enemigo), 1);
                    document.getElementById(enemigo.id).remove();
                }
            }
        });

        isCombate = enemigos.length > 0;
        if (!isCombate) combateIsOver();
    }
}