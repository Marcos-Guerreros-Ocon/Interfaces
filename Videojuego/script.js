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

const backgrounds = [
    'https://wallpapercave.com/wp/wp12331958.png',
    'https://wallpapercave.com/wp/wp12332023.jpg',
    'https://i.redd.it/3zlcw9izsqr31.png',
    'https://wallpapercave.com/wp/wp6659898.jpg',
    'https://rare-gallery.com/uploads/posts/1102207-video-games-pixel-art-galaxy-planet-space-science-fiction-pixels-atmosphere-universe-astronomy-indie-games-Steredenn-screenshot-outer-space-astronomical-object.jpg'
]
let gastoEnergia = 0;
let infoPlanetas = [];
let tripulacion = [];
let interval = null;
let disparosLaser = 0;
let refrigeracionAnterior = 0;
let peleaPlaneta = new Map();
let cantidadSaltos = 0;
let objCombate = null;
let grados = 0;
let nave;
let enemigos = [];
let isCombate = false;

const sliders = {
    proa: document.getElementById("proa-shield"),
    popa: document.getElementById("popa-shield"),
    babor: document.getElementById("babor-shield"),
    estribor: document.getElementById("estribor-shield"),
};

const escudos = {
    proa: 25,
    popa: 25,
    babor: 25,
    estribor: 25,
};

window.onload = () => {
    cargarDatos();
    startTiempoRestante();
    setDefaultValues();
    cargarEventosPlanetas();
    timer();
    initButtons();
};
const timer = () => {
    const a = setInterval(() => {
        tiempoRestante();
        storeData();
        pintarValores();
        enfriamientoMotor();
        if (isCombate) {
            damageCombate();
        }
        if (win()) {
            clearInterval(a);
            mostrarResumen(true);

        }
        if (isOver()) {
            clearInterval(a);
            disabledButtons();
            mostrarResumen(false);
        }

    }, 1000);
};