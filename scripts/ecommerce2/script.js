let productosGlobal = [];

function obtenerProductos() {
    return fetch("https://fakestoreapi.com/products")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        });
}

function leerDatos() {
    console.log("1. Se ha iniciado la llamada");

    obtenerProductos()
        .then((productos) => {
            console.log("3. Ya ha llegado la respuesta");
            productosGlobal = productos;
            return productos;
        })
        .then((productos) => {
            return productos.filter(product => product.price < 100);
        })
        .then((productosFiltrados) => {
            const grid = document.getElementById("productos-grid");
            productosFiltrados.forEach(product => {
                let producto = document.createElement("article");
                producto.classList.add("producto");
                producto.innerHTML = '<img src="' + product.image + '" alt="' + product.title + '">';
                producto.innerHTML += '<a href="#" onclick="cargarInfoProducto(' + product.id + ')"><h3>' + product.title + '</h3></a>';
                producto.innerHTML += '<p>' + product.description + '</p>';
                producto.innerHTML += '<p><strong>' + product.price + ' €</strong></p>';
                grid.appendChild(producto);
            });
        })
        .catch((error) => {
            console.log("Error al obtener los productos", error);
        });

    console.log("2. Javascript sigue");
}

function cargarInfoProducto(id) {
    let producto = productosGlobal.find(product => product.id === Number(id));
    console.log(producto);
    document.getElementById("productos-grid").style.display = "none";
    const detalle = document.getElementById("producto-detalle");
    detalle.innerHTML = '<button onclick="volverAlGrid()">&larr; Volver</button>';
    detalle.innerHTML += '<h2>' + producto.title + '</h2>';
    detalle.innerHTML += '<img src="' + producto.image + '" alt="' + producto.title + '" style="max-width:300px">';
    detalle.innerHTML += '<p><strong>Precio:</strong> ' + producto.price + ' €</p>';
    detalle.innerHTML += '<p><strong>Categoría:</strong> ' + producto.category + '</p>';
    detalle.innerHTML += '<p>' + producto.description + '</p>';
    detalle.innerHTML += '<p><strong>Valoración:</strong> ' + producto.rating.rate + ' (' + producto.rating.count + ' votos)</p>';
}

function volverAlGrid() {
    document.getElementById("producto-detalle").innerHTML = "";
    document.getElementById("productos-grid").style.display = "grid";
}
