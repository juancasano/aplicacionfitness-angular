function mostrar(idLista, idInput, idResultado) {
	let num = document.getElementById(idInput).value;
	let nodosLi = document.getElementById(idLista).getElementsByTagName("li");
	let resultado = document.getElementById(idResultado);

	if (num > 0 && num <= nodosLi.length) {
		resultado.innerHTML = "Elemento: " + nodosLi[num - 1].innerHTML;
		resultado.className = "resultado success";
	} else {
		resultado.innerHTML = "No hay elemento con ese número";
		resultado.className = "resultado error";
	}
}

function insertar(idLista, idInput, idResultado) {
	let nombre = document.getElementById(idInput).value;
	let resultado = document.getElementById(idResultado);

	if (nombre.length == 0 || nombre == "") {
		resultado.innerHTML = "Introduce un nombre";
		resultado.className = "resultado error";
	} else {
		let nodoLi = document.createElement("li");
		let nodoTexto = document.createTextNode(nombre);
		nodoLi.appendChild(nodoTexto);
		document.getElementById(idLista).appendChild(nodoLi);
		resultado.innerHTML = "Elemento insertado: " + nombre;
		resultado.className = "resultado success";
		document.getElementById(idInput).value = "";
	}
}

function eliminar(idLista, idInput, idResultado) {
	let num = document.getElementById(idInput).value;
	let nodosLi = document.getElementById(idLista).getElementsByTagName("li");
	let resultado = document.getElementById(idResultado);

	if (num > 0 && num <= nodosLi.length) {
		let nombre = nodosLi[num - 1].innerHTML;
		nodosLi[num - 1].parentNode.removeChild(nodosLi[num - 1]);
		resultado.innerHTML = "Elemento eliminado: " + nombre;
		resultado.className = "resultado deleted";
		document.getElementById(idInput).value = "";
	} else {
		resultado.innerHTML = "No hay elemento con ese número";
		resultado.className = "resultado error";
	}
}
