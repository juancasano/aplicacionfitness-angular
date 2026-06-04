async function leerDatos() {
	try {
		const response = await fetch("https://fakestoreapi.com/products");
		const productos = await response.json();
		console.log(productos);
		actualizarIU(productos);
	} catch (error) {
		console.log(error);
	}
}

function actualizarIU(productos) {
	console.log(productos);
	const grid = document.getElementById("productos-grid");
	for (const product of productos) {
		let producto = document.createElement("article");
		producto.classList.add("producto");
		producto.innerHTML = '<img src="' + product.image + '" alt="' + product.title + '">';
		producto.innerHTML += '<h3>' + product.title + '</h3>';
		producto.innerHTML += '<p>' + product.description + '</p>';
		producto.innerHTML += '<input type="button" onclick="borrarProducto(' + product.id + ')" value="Borrar">';
		grid.appendChild(producto);
	}
}

async function borrarProducto(id) {
	try {
		const response = await fetch('https://fakestoreapi.com/products/' + id, {
			method: 'DELETE'
		});
		const data = await response.json();
		document.getElementById("resultado").innerHTML = JSON.stringify(data);
	} catch (error) {
		document.getElementById("resultado").innerHTML = error;
	}
}
