const STORAGE_KEY = "ecommerce_productos";
const API_URL = "https://fakestoreapi.com/products";

let productos = [];

window.onload = function() {
    inicializar();
};

function inicializar() {
    const guardados = localStorage.getItem(STORAGE_KEY);
    if (guardados) {
        productos = JSON.parse(guardados);
        console.log("Productos cargados desde localStorage:", productos);
        imprimirProductos();
    } else {
        cargarDesdeAPI();
    }
}

function cargarDesdeAPI() {
    console.log("Cargando productos desde la API...");
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            productos = data;
            guardarEnStorage();
            imprimirProductos();
            console.log("Productos cargados desde API:", productos);
        })
        .catch((error) => console.log("Error al cargar API:", error));
}

function guardarEnStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

function imprimirProductos() {
    const grid = document.getElementById("productos-grid");
    grid.innerHTML = "";

    productos.forEach((p) => {
        const article = document.createElement("article");
        article.classList.add("producto");
        article.innerHTML = `
            <img src="${p.image}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p class="categoria">${p.category}</p>
            <p>${p.description}</p>
            <p class="precio">${p.price} €</p>
            <button onclick="modificarProducto1(${p.id})">Modificar</button>
            <button onclick="borrarProducto(${p.id})">Borrar</button>
        `;
        grid.appendChild(article);
    });
}

function crearProducto() {
    const title = document.getElementById("title").value;
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    if (!title || isNaN(price)) {
        alert("Título y precio son obligatorios");
        return;
    }

    const nuevoId = productos.length === 0
        ? 1
        : Math.max(...productos.map((p) => p.id)) + 1;

    productos.push({
        id: nuevoId,
        title: title,
        price: price,
        category: category,
        image: image,
        description: description
    });

    guardarEnStorage();
    imprimirProductos();
    borrarFormulario();
    console.log("Producto creado con id:", nuevoId);
}

function modificarProducto1(id) {
    const p = productos.find((prod) => prod.id == id);
    if (!p) return;

    document.getElementById("idProducto").value = p.id;
    document.getElementById("title").value = p.title;
    document.getElementById("price").value = p.price;
    document.getElementById("category").value = p.category;
    document.getElementById("image").value = p.image;
    document.getElementById("description").value = p.description;

    document.getElementById("botonCrear").style.display = "none";
    document.getElementById("botonModificar").style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function modificarProducto2() {
    const id = parseInt(document.getElementById("idProducto").value);
    const p = productos.find((prod) => prod.id == id);
    if (!p) return;

    p.title = document.getElementById("title").value;
    p.price = parseFloat(document.getElementById("price").value);
    p.category = document.getElementById("category").value;
    p.image = document.getElementById("image").value;
    p.description = document.getElementById("description").value;

    guardarEnStorage();
    imprimirProductos();
    borrarFormulario();

    document.getElementById("botonCrear").style.display = "inline-block";
    document.getElementById("botonModificar").style.display = "none";
    console.log("Producto modificado:", p);
}

function borrarProducto(id) {
    const confirmar = confirm("¿Seguro que quieres borrar este producto?");
    if (confirmar === false) {
        return;
    }
    productos = productos.filter((p) => p.id != id);
    guardarEnStorage();
    imprimirProductos();
    console.log("Producto borrado, id:", id);
}

function borrarFormulario() {
    document.getElementById("idProducto").value = "";
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("image").value = "";
    document.getElementById("description").value = "";
}

function resetearProductos() {
    const confirmar = confirm("Esto borra todo y recarga desde la API. ¿Seguro?");
    if (confirmar === false) {
        return;
    }
    localStorage.removeItem(STORAGE_KEY);
    cargarDesdeAPI();
}
