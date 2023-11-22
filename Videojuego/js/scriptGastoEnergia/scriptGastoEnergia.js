const aumentarGastoEnergia = () => {
    gastoEnergia = parseInt(gastoEnergia) + 1;
    velocidad.value = 100 * parseInt(gastoEnergia);
}

const disminuirGastoEnergia = () => {
    if (gastoEnergia > 0) {
        gastoEnergia = parseInt(gastoEnergia) - 1;
        velocidad.value = 100 * parseInt(gastoEnergia);
    }
}