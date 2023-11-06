let carta = null;
const aciertos = document.getElementById('aciertos');
const fallos = document.getElementById('fallos');

window.onload = function () {
    generacionAleatoria();
    const cartas = document.querySelectorAll('.carta');
    cartas.forEach(carta => {
        carta.addEventListener('click', function () {
            girarCarta(carta);
        });
    });
}

const compararCarta = (cartaNueva) => {
    if (carta == null) {
        carta = cartaNueva;
        return;
    }

    if (cartaNueva.attributes['name'].value == carta.attributes['name'].value) {
        aciertos.innerHTML = parseInt(aciertos.innerHTML) + 1;
    } else {
        carta.classList.remove('girada');
        cartaNueva.classList.remove('girada');
        fallos.innerHTML = parseInt(fallos.innerHTML) + 1;
    }
    carta = null;
}

const girarCarta = (cartaNueva) => {
    if (!cartaNueva.classList.contains('girada')) {
        cartaNueva.classList.add('girada');
        setTimeout(compararCarta, 500, cartaNueva);
    }
}

const generacionAleatoria = () => {

    document.querySelectorAll('.baraja')[0].innerHTML = "";
    let cartas = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    let numero = 0;

    let aux = 0;
    let fila = null;
    while (cartas.length > 0) {
        if (aux == 0) {
            fila = document.createElement('div');
        }
        numero = Math.floor(Math.random() * cartas.length);
        const div = document.createElement('div');
        div.classList.add('carta');
        div.classList.add('carta' + cartas[numero]);
        div.setAttribute('name', 'carta' + cartas[numero]);

        const anverso = document.createElement('div');
        anverso.classList.add('anverso');

        const reverso = document.createElement('div');
        reverso.classList.add('reverso');


        div.appendChild(anverso);
        div.appendChild(reverso);

        fila.appendChild(div);
        cartas.splice(numero, 1);
        aux++;
        if (aux == 3) {
            document.querySelectorAll('.baraja')[0].appendChild(fila);
            aux = 0;

        }

    }


};