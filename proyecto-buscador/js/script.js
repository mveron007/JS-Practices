//VARIABLES
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#precio-min");
const maximo = document.querySelector("#precio-max");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");


const resultado= document.querySelector("#resultado");


const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

const datosBusqueda = {
    marca:'',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:'',
}

//EVENTOS
document.addEventListener("DOMContentLoaded", ()=>{
    mostrarAutos(autos);


    llenarMarca();
    llenarYear();
    llenarColor();
})

marca.addEventListener("change", e =>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
})

year.addEventListener("change", e =>{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
})

minimo.addEventListener("change", e =>{
    datosBusqueda.minimo = parseInt(e.target.value);

    console.log(`Minimo: ${datosBusqueda.minimo}`);

    const span = document.querySelector("#minimo");
    span.textContent = e.target.value;

    filtrarAuto();

})

maximo.addEventListener("change", e =>{
    datosBusqueda.maximo = e.target.value;

    console.log(`maximo: ${datosBusqueda.maximo}`);

    const span = document.querySelector("#maximo");
    span.textContent = e.target.value;

    filtrarAuto();
})

puertas.addEventListener("change", e =>{
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();

})

transmision.addEventListener("change", e =>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();

})

color.addEventListener("change", e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();

})

//FUNCIONES

function llenarYear(){

    for (let index = maxYear; index >= minYear; index--) {
        const opcion = document.createElement("option");
        opcion.value = index;
        opcion.textContent = index;
        year.appendChild(opcion);
        
    }
}

function llenarMarca(){
    let arrayMarcas = [];
    autos.forEach(auto => {
        //Chequeo que no exista una marca repetida
        if (!arrayMarcas.includes(auto.marca)) {
            arrayMarcas.push(auto.marca);
        }
    })

    //Cargo el select
    for (let index = 0; index < arrayMarcas.length; index++) {
        const opcion = document.createElement("option");
        opcion.value = arrayMarcas[index];
        opcion.textContent = arrayMarcas[index];
        marca.appendChild(opcion);
    }
}


function llenarColor(){
    let arrayColores = [];
    autos.forEach(auto => {
        //Chequeo que no exista una marca repetida
        if (!arrayColores.includes(auto.color)) {
            arrayColores.push(auto.color);
        }
    })

    //Cargo el select
    for (let index = 0; index < arrayColores.length; index++) {
        const opcion = document.createElement("option");
        opcion.value = arrayColores[index];
        opcion.textContent = arrayColores[index];
        color.appendChild(opcion);
    }
}

function mostrarAutos(autos){

    limpiarHTML();
    
    autos.forEach(auto => {
        const autoHTML = document.createElement("p");

        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        autoHTML.textContent = `
            ${marca}
            ${modelo} - 
            ${year} - 
            ${puertas} Puertas - 
            Transmisión: ${transmision} - 
            Precio: ${precio} - 
            Color: ${color}
        `;
        autoHTML.classList.add("text-center");

        resultado.appendChild(autoHTML);
    });    
    
    
}

function limpiarHTML(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).
    filter(filtrarYear).
    filter(filtrarMinimo).
    filter(filtrarMaximo).
    filter(filtrarPuertas).
    filter(filtrarTransmision).
    filter(filtrarColor);

    console.log(resultado);

    if (resultado.length > 0) {
        mostrarAutos(resultado);

    }else{
        limpiarHTML();
        sinResultado();
    }
}

function sinResultado(){
    const sinResultado = document.createElement("div");
    sinResultado.classList.add("alert", "alert-warning");
    sinResultado.textContent = "No hay resultados para la busqueda";

    resultado.appendChild(sinResultado);

}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;

    if (year) {
        console.log(year);
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;

    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}


function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;

    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;

    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;

    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;

    if (color) {
        return auto.color === color;
    }
    return auto;
}