//// VARIABLES
const mascotaInput = document.querySelector("#nombre-mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horarioInput = document.querySelector("#horario");
const sintomasInput = document.querySelector("#sintomas");

const form = document.querySelector("#formulario");
const listaCitas = document.querySelector("#citas");
const btnCita = document.querySelector("#btnCita");

class Cita{
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

}

class UI{

    imprimirAlerta(mensaje, tipo) {
        // Crear div mensaje
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "d-block", "alert", "col-12");

        //Clase segun tipo
        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        }else{
            divMensaje.classList.add("alert-success");
        }

        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector(".row").insertBefore(divMensaje, document.querySelector("#datos-paciente"));

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }


    imprimirCitas({citas}){
        console.log(citas);
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, horario, sintomas, id} = cita;

            const divCita = document.createElement("div");
            // divCita.classList.add("p-3");
            divCita.classList.add("card");
            divCita.dataset.id = id;
            const titleMascota = document.createElement("h5");
            titleMascota.classList.add("card-title");
            titleMascota.textContent = mascota;

            divCita.appendChild(titleMascota);

            listaCitas.appendChild(divCita);


        });
    }
}


const ui = new UI();

const adminCitas = new Cita();
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

    form.addEventListener("submit", nuevaCita);

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
}

function nuevaCita(e){
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, horario, sintomas} = citaObj;
    console.log(citaObj);
    if (mascota === "" || propietario === "" || telefono === "" || fecha === "" || horario === "" || sintomas === "") {
        ui.imprimirAlerta("Todos los campos son obligatorios", "error");
        return;
    }

    //Id Unico
    citaObj.id = Date.now();
    console.log(citaObj);
    adminCitas.agregarCita({...citaObj});

    //Reiniciar Objeto
    reiniciarObj();

    form.reset();

    ui.imprimirCitas(adminCitas);
}


function reiniciarObj() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.horario = "";
    citaObj.sintomas = "";

}