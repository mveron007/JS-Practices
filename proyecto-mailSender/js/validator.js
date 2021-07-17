// VARIABLES BOTONES
const btnSend = document.querySelector("#send-btn");
const btnReset = document.querySelector("#reset-btn");

//VARIABLES INPUT

const correo = document.querySelector("#correo");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

//FORMULARIO
const formulario = document.querySelector("#form-mail");

const alertList = document.querySelector("#error-alert");

const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

//FUNCTIONS

loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", iniciarApp);

    correo.addEventListener("blur", validarForm);
    asunto.addEventListener("blur", validarForm);
    mensaje.addEventListener("blur", validarForm);

    formulario.addEventListener("submit", enviarMensaje);

    btnReset.addEventListener("click", resetForm);
}


function iniciarApp() {
    btnSend.disabled = true;
    btnSend.classList.add('disabled');
}

function validarForm(e){
    if (e.target.value.length > 0) {
        const error = document.querySelector("span.error");
        if (error) {
            error.remove();
            alertList.classList.remove("alert", "alert-danger");

        }
        
        e.target.classList.remove('is-invalid');
        e.target.classList.add('is-valid');
    }else{
        e.target.classList.remove('is-valid');
        e.target.classList.add('is-invalid');

        mostrarError("Todos los campos son obligatorios");
    }

    if (e.target.type === "email") {

        if (reg.test(e.target.value)) {
            const error = document.querySelector("span.error");

            if (error) {
                error.remove();
                alertList.classList.remove("alert", "alert-danger");

            }
            console.log("Valido");
            e.target.classList.remove('is-invalid');
            e.target.classList.add('is-valid');

        }else{
            console.log("Email no valido");
            e.target.classList.remove('is-valid');

            e.target.classList.add('is-invalid');

            mostrarError("El formato es inválido");
        }
        
    }

    if (reg.test(correo.value) && asunto.value !== "" && mensaje.value !== "") {
        btnSend.disabled = false;
        btnSend.classList.remove('disabled');
    }
}

function mostrarError(mensaje){
    alertList.classList.add("alert", "alert-danger");

    const mensajeError = document.createElement("span");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("error");

    // alertList.appendChild(mensajeError);

    const errores = document.querySelectorAll(".error");

    if (errores.length === 0) {
        alertList.appendChild(mensajeError);
    }

}


function enviarMensaje(e){
    e.preventDefault();

    const spinner = document.querySelector("#spinner");

    spinner.classList.add("visible");
    spinner.classList.remove("invisible");

    setTimeout(() => {
        spinner.classList.add("invisible");
        spinner.classList.remove("visible");

        alertList.classList.add("alert", "alert-success");

        const mensajeExito = document.createElement("span");
        mensajeExito.textContent = "El mensaje ha sido enviado con exito.";

        alertList.appendChild(mensajeExito);


        setTimeout(() => {
            alertList.classList.remove("alert", "alert-success");
            mensajeExito.remove();

            resetForm();
        }, 5000);
    }, 3000);

}

function resetForm(){
    formulario.reset();

    iniciarApp();
}