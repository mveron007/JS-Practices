//// VARIABLES
const mascotaInput = document.querySelector("#nombre-mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horarioInput = document.querySelector("#horario");
const sintomasInput = document.querySelector("#sintomas");

const form = document.querySelector("#formulario");
const citas = document.querySelector("#citas");

///// EVENTOS
eventListeners();

//// FUNCIONES
function eventListeners(){

    mascotaInput.addEventListener("input", datosCita);
    propietarioInput.addEventListener("input", datosCita);
    telefonoInput.addEventListener("input", datosCita);
    fechaInput.addEventListener("input", datosCita);
    horarioInput.addEventListener("input", datosCita);
    sintomasInput.addEventListener("input", datosCita);

}

const citaObj = {
    mascota:'',
    propietario: '',
    telefono: '',
    fecha:'',
    horario: '',
    sintomas: ''
}

function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}
