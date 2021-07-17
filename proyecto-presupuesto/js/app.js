//VARIABLES Y SELECTORES
const form = document.querySelector("#formulario");
const gastoListado = document.querySelector("#gastos ul");

//EVENTOS
eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto);

    form.addEventListener("submit", agregarGasto);
}

//CLASSES
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos.push(gasto);
        // this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        
        this.restante = this.presupuesto - gastado;
    }
}

class UI{
    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        const presu = document.querySelector("#presupuesto");
        const rest = document.querySelector("#restante");

        presu.textContent = presupuesto;
        rest.textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        const div = document.createElement("div");
        div.classList.add("text-center", "alert");

        if (tipo === "error") {
            div.classList.add("alert-danger");
            div.textContent = mensaje;
        } else {
            div.classList.add("alert-success");
            div.textContent = mensaje;
        }

        document.querySelector("#mensajes").appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    mostrarGastos(gastos){

        ui.limpiarHTML();

        gastos.forEach(gasto => {
            const {nombre, cantidad, id} = gasto;
            const nuevoGasto = document.createElement("li");
            nuevoGasto.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            nuevoGasto.setAttribute("data-id",id);

            nuevoGasto.innerHTML = `
                ${nombre} <span class="badge rounded-pill bg-primary">$ ${cantidad}</span>
            `;
            
            const btnBorrar = document.createElement("button");
            btnBorrar.textContent = "Borrar";
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            btnBorrar.classList.add("btn", "btn-danger");

            nuevoGasto.appendChild(btnBorrar);

            gastoListado.appendChild(nuevoGasto);
        });
    }


    limpiarHTML(){
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante){
        const rest = document.querySelector("#restante");
        rest.textContent = restante;

    }

    comprobarPresupuesto(presupuestoObj){
        const {presupuesto, restante} = presupuestoObj;

        const restanteDiv = document.querySelector("#restante-div");
        
        // Comprobar 25%
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove("alert-success", "alert-warning");
            restanteDiv.classList.add("alert-danger");
        }else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove("alert-success");
            restanteDiv.classList.add("alert-warning");
        }else{
            restanteDiv.classList.remove("alert-danger", "alert-warning");
            restanteDiv.classList.add("alert-success");
        }

        if (restante <= 0) {
            ui.imprimirAlerta("El presupuesto se ha agotado", "error");

            form.querySelector('button[type="submit"]').disabled = true;
        }
    
    }
}

//Instanciar
const ui = new UI();
let presupuesto;

//FUNCIONES

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");

    if (presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e){
    e.preventDefault();

    const nombre = document.querySelector("#gasto").value;
    const cantidad = Number(document.querySelector("#cantidad").value);

    if (nombre === "" || cantidad === "") {
        ui.imprimirAlerta("Ambos campos son obligatorios", "error");
        return;
    }else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta("Cantidad no válida", "error");
        return;
    }


    //Generando gasto

    const gasto = {
        nombre, 
        cantidad, 
        id: Date.now()
    };

    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta("Gasto agregado con exito");

    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
    
    form.reset();

}


function eliminarGasto(id){
    presupuesto.eliminarGasto(id);
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
}