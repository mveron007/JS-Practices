const carrito = document.getElementById("carrito");

const listaCarrito = document.querySelector("#lista-carrito tbody");

const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

const listaCursos = document.querySelector("#lista-cursos");

const carritoBadge = document.querySelector("#cart-items");

let articulosCarrito = [];

let suma = 0;

const btnCart = document.getElementById("btn-cart");

loadEventListeners();

function loadEventListeners() {
    
    listaCursos.addEventListener("click", agregarCarrito);

    listaCarrito.addEventListener("click", eliminarProducto)


    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];

        carritoBadge.textContent = 0;

        limpiarHTML();
    })

    btnCart.addEventListener("click", (e) => {
        if (carrito.style.visibility === "visible") {
            carrito.style.visibility = "hidden";
        } else {
            carrito.style.visibility = "visible";
            
        }
        console.log("h");
    })

    loadPage();
}

//Funciones

function agregarCarrito(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const productSelected = e.target.parentElement.parentElement;
        leerDatos(productSelected);
        console.log("Agregando");

        cargarHTML();
    }
}

function eliminarProducto(e) {
    // console.log(e.target);
    if (e.target.classList.contains("borrar-producto")) {
        const productoId = e.target.getAttribute("data-id");

        articulosCarrito = articulosCarrito.filter(producto => productoId !== producto.id);
        
        cargarHTML();
        
    }
}

function leerDatos(product) {
    console.log(product);

    const infoCurso = {
        imagen: product.querySelector("img").src,
        titulo: product.querySelector("h5").textContent,
        precio: product.querySelector(".precio span").textContent,
        id: product.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    }
    console.log(infoCurso);
    let sumaCant = [];
    articulosCarrito.map( producto =>{
        
        
        let reducer = (accumulator, curr) => accumulator + curr;
        sumaCant.push(producto.cantidad);
        const res = sumaCant.reduce(reducer);
        
        suma = res === 0 ? 1 : res + 1;

        carritoBadge.textContent = suma;
    });

    console.log(`SUMA: ${suma}`);

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {

        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad ++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito = [...cursos];  
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];

    }


    console.log(articulosCarrito);

}

function cargarHTML() {
    limpiarHTML();
    articulosCarrito.forEach(producto => {
        const {imagen, titulo, precio, cantidad, id} = producto;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src = "${imagen}" width="60px;">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
              <a href="#" class="btn btn-danger bi-x-square borrar-producto" 
              style="font-size: 1rem; color: white;" data-id="${id}"> 
              </a>
            </td>
        `;

        listaCarrito.appendChild(row);
    })

    //Agregar el carrito al storage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
    while (listaCarrito.firstChild) {
        
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

function loadPage() {
    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

        cargarHTML();
    })
}