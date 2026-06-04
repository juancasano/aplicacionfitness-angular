function mostrarBebida() {
	let numBebida = document.getElementById("numBebida").value;
	let nodosLi = document.getElementsByTagName("li");
	let resultado = document.getElementById("resultado");

	if (numBebida > 0 && numBebida <= nodosLi.length) {
		let bebida = nodosLi[numBebida - 1].innerHTML;
		resultado.innerHTML = "Bebida: " + bebida;
		resultado.className = "success";
	} else {
		resultado.innerHTML = "No hay bebida";
		resultado.className = "error";
	}
}

function insertarBebida() {
	let nombreBebida = document.getElementById("nombreBebida").value;
	let resultado = document.getElementById("resultado");

	if (nombreBebida.length == 0 || nombreBebida == "") {
		resultado.innerHTML = "Introduce una bebida";
		resultado.className = "error";
	} else {
		let nodoLi = document.createElement("li");
		let nodoTexto = document.createTextNode(nombreBebida);
		nodoLi.appendChild(nodoTexto);
		let nodoBebidas = document.getElementById("listaBebidas");
		nodoBebidas.appendChild(nodoLi);
		resultado.innerHTML = "La bebida ha sido insertada";
		resultado.className = "success";
		document.getElementById("nombreBebida").value = "";
	}
}
