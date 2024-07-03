

const btnConversion = document.querySelector('#conversion')
const urlBase = "https://mindicador.cl/api"
async function conversorDivisas() {
    try {
    const clp = document.querySelector('#pesosClp').value
    const monedaAelegir = document.querySelector('#convertirA').value
    const urlApi = (`${urlBase}/${monedaAelegir}`)
    const res = await fetch(urlApi)
    const data = await res.json()

    const valorCero = data.serie[0]['valor']

    const resultadoCoversion = document.querySelector('#resultadoConversion')
    const resultado = (Number(clp) / valorCero).toFixed(2)

    resultadoCoversion.innerHTML = `<strong>Resultado: $ ${resultado}</strong>`

    const labels = data.serie.slice(0,10).reverse().map((datosGrafico) => {
        return datosGrafico.fecha.substring(0,10);

    })

    const datos = data.serie.slice(0,10).map((datosGrafico) => {
        return datosGrafico.valor;
    })

    
    const datasets = [
        {
            label: monedaAelegir,
            borderColor: "rgb(255, 99, 132)",
            data: datos
        }
    ]
    const objectGraphic = {labels, datasets};

    const config = {
        type: "line",
        data: objectGraphic
    }

    const grafico = document.querySelector('#grafico')
    grafico.style.backgroundColor = 'white';
    new Chart(grafico, config);
}

catch(e) {
    alert(e.message)
}
}

    btnConversion.addEventListener("click", conversorDivisas)

    