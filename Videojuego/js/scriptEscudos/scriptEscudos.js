const updateSliders = (updatedSlider) => {
    let totalCurrentValue = 0;


    for (const sliderName in sliders) {
        totalCurrentValue += parseInt(sliders[sliderName].value);
    }

    const adjustment = 100 - totalCurrentValue;

    const otherSlidersCount = Object.keys(sliders).length - 1;
    const sharedAdjustment = adjustment / otherSlidersCount;

    for (const sliderName in sliders) {
        if (sliderName !== updatedSlider) {
            sliders[sliderName].value = (parseInt(sliders[sliderName].value) + sharedAdjustment).toFixed(2);
        }
    }

    sliders[updatedSlider].value = (100 - (totalCurrentValue - parseInt(sliders[updatedSlider].value))).toFixed(2);

    for (const sliderName in sliders) {
        escudos[sliderName] = sliders[sliderName].value;
    }
}
const igualarEscudos = () => {
    valorAntiguoBabor = 25;
    valorAntiguoEstribor = 25;
    valorAntiguoPopa = 25;
    valorAntiguoProa = 25;
    escudoBabor.value = 25;
    escudoEstribor.value = 25;
    escudoPopa.value = 25;
    escudoProa.value = 25;

    for (const sliderName in sliders) {
        escudos[sliderName] = sliders[sliderName].value;
    }
};