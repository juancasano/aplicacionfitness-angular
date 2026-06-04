let productosGlobal = [];

function leerDatos() {
    const url = "https://fakestoreapi.com/products";
    let request = new XMLHttpRequest();
    request.responseType = "json";
    request.open("GET", url);
    request.onload = function() {
        if (request.status === 200) {
            console.log("3. Ya ha llegado la respuesta");
            actualizarUI(request.response);
        }
    };
    console.log("1. Se ha iniciado la llamada");
    request.send();
    console.log("2. Javascript sigue");
}

function actualizarUI(productos) {
    console.log(productos);
    productosGlobal = productos;
    const grid = document.getElementById("productos-grid");
    for (product of productos) {
        let producto = document.createElement("article");
        producto.classList.add("producto");
        producto.innerHTML = '<img src="' + product.image + '" alt="' + product.title + '">';
        producto.innerHTML += '<a href="#" onclick="cargarInfoProducto(' + product.id + ')"><h3>' + product.title + '</h3></a>';
        producto.innerHTML += '<p>' + product.description + '</p>';
        grid.appendChild(producto);
    }
}

function cargarInfoProducto(id) {
    let producto = productosGlobal.find(product => product.id === Number(id));
    console.log(producto);
    document.getElementById("productos-grid").style.display = "none";
    const detalle = document.getElementById("producto-detalle");
    detalle.innerHTML = '<button onclick="volverAlGrid()">&larr; Volver</button>';
    detalle.innerHTML += '<h2>' + producto.title + '</h2>';
    detalle.innerHTML += '<img src="' + producto.image + '" alt="' + producto.title + '">';
    detalle.innerHTML += '<p><strong>Precio:</strong> ' + producto.price + ' €</p>';
    detalle.innerHTML += '<p><strong>Categoría:</strong> ' + producto.category + '</p>';
    detalle.innerHTML += '<p>' + producto.description + '</p>';
    detalle.innerHTML += '<p><strong>Valoración:</strong> ' + producto.rating.rate + ' (' + producto.rating.count + ' votos)</p>';
}

function volverAlGrid() {
    document.getElementById("producto-detalle").innerHTML = "";
    document.getElementById("productos-grid").style.display = "grid";
}
