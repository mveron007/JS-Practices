/// VARIABLES
const form = document.querySelector("#formulario");
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const btnSend = document.querySelector("#sendBtn");


//// CLASES
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}


Seguro.prototype.cotizar = function(){
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo  1.35
    */

    let cantidad;
    const base = 2000;
   console.log(this.marca);
   switch (this.marca) {
       case "1":
           cantidad = base * 1.15;
           break;
   
       case "2":
        cantidad = base * 1.05;
           break;

       case "3":
        cantidad = base * 1.35;
           break;
       default:
           break;
   }


   const diferencia = new Date().getFullYear() - this.year;

   cantidad -=((diferencia * 3) * cantidad ) / 100;

   //BASICO ==> 30% más
   //COMPLETO ==> 50% más

   if (this.tipo === "Basico") {
       cantidad *= 1.30;
   } else {
        cantidad *= 1.50;
   }

   return cantidad;
}

function UI(){}

UI.prototype.loadOptions= function(){
    const maxYear = new Date().getFullYear(),
        minYear = maxYear - 10;
    
        for (let index = maxYear; index >= minYear; index--) {
            const opcion = document.createElement("option");
            opcion.value = index;
            opcion.textContent = index;
    
            year.appendChild(opcion);
            
        }

}


UI.prototype.mostrarMensaje = function(mensaje, tipo){
    const div = document.createElement("div");

    if (tipo === "error") {
        div.classList.add( "alert", "alert-danger");
    } else {
        div.classList.add("alert", "alert-success");
    }

    div.textContent = mensaje;

    //Insert in HTML
    const spinTable = document.querySelector("#spinner-table");
    spinTable.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (seguro, total) =>{

    const {marca, year, tipo} = seguro;
    let textoMarca;
    switch (marca) {
        case "1":
            textoMarca = "Americano";
            break;
        case "2":
            textoMarca = "Asiático";
            break;
        case "3":
            textoMarca = "Europeo";
            break;
        default:
            break;
    }

    const div = document.createElement("div");
    div.classList.add("mt-5");

    div.innerHTML = `
        <span class="header">Tu resumen</span>
        <span class="fw-bolder">Marca: ${textoMarca}</span>
        <span class="fw-bolder">Año: ${year}</span>
        <span class="fw-bolder">Tipo: ${tipo}</span>
        <span class="fw-bolder">Tu resumen: $ ${total}</span>
    `;

    const resultadoDiv = document.querySelector("#resultado");

    // resultadoDiv.appendChild(div);

    const spinner = document.querySelector("#spinner");

    spinner.classList.remove("d-none");

    spinner.classList.add("d-block");

    setTimeout(() => {
        spinner.classList.remove("d-block");
        spinner.classList.add("d-none");
        resultadoDiv.appendChild(div);
    }, 3000);


}

const ui = new UI();

//// FUNCIONES
loadPage();

function loadPage(){

    form.addEventListener("submit", cotizarSeguro);
    

    document.addEventListener("DOMContentLoaded", () =>{
        ui.loadOptions();
    })
}


function cotizarSeguro(e){
    e.preventDefault();

    //read selected year

    //read selected type of cover
    const cover = document.querySelector("input[name='cobertura']:checked").value;

    console.log(`${marca.value} - ${year.value} - ${cover}`);
    //validating empty values
    if (marca.value === "" || year.value === "" ) {

        ui.mostrarMensaje("Los campos no fueron completados", "error");
        return;
    }
    
    ui.mostrarMensaje("Cotizando...", "exito");

    //Hiding previous result
    const resultados = document.querySelector("#resultado div");

    if (resultados != null) {
        resultados.remove();
    }
    //Instance of seguro

    const seguro = new Seguro(marca.value, year.value, cover);

    // cotizando
    const total = seguro.cotizar();

    ui.mostrarResultado(seguro, total);
}
