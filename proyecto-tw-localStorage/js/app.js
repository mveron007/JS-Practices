//VARIABLES
const form = document.querySelector("#formulario");
const listaTw = document.querySelector("#lista-tweets");

const btnSubmit = document.querySelector("#btnSend");
const listaAlertas = document.querySelector("#lista-alertas");

let tweets= [];

//EVENTOS

eventListeners();

function eventListeners(){
    form.addEventListener("submit", agregarTweet);
    
    document.addEventListener("DOMContentLoaded", () =>{
        tweets = JSON.parse(localStorage.getItem("tweets") || []);
    });
}

//FUNCIONES

function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector("#tweet").value;

    if (tweet === "") {
        // btnSubmit.disabled = true;
        // btnSubmit.classList.add("disabled");
        mostrarError("Un mensaje no puede ir vacío");
        return;
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweet, 
    }

    tweets = [...tweets, tweetObj];

    console.log(tweets);

    crearHTML();

    form.reset();
    
}

function mostrarError(mensaje){
    const span = document.createElement("span");
    span.textContent = mensaje;

    listaAlertas.classList.add("alert", "alert-danger");
    listaAlertas.appendChild(span);

    setTimeout(() => {
        listaAlertas.classList.remove("alert", "alert-danger");
        listaAlertas.removeChild(span);
    }, 3000);
}

function crearHTML(){

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet =>{
            const li = document.createElement("li");
            li.classList.add("d-flex", "justify-content-between", "mb-3");

            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("btn-close");

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            li.innerText = tweet.texto;

            li.appendChild(btnEliminar);
            listaTw.appendChild(li);
        })
    }

    sincronizarStorage();
}


function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function limpiarHTML(){
    while (listaTw.firstChild) {
        listaTw.removeChild(listaTw.firstChild);
    }
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    console.log(tweets);
    crearHTML();
}