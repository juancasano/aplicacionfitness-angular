function mostrar(idNumero, idLista) {
	let num = document.getElementById(idNumero).value;
	let lista = document.getElementById(idLista);
	let nodosLi = lista.getElementsByTagName("li");
	let resultado = document.getElementById("resultado" + idLista);

	if (num > 0 && num <= nodosLi.length) {
		let item = nodosLi[num - 1].innerHTML;
		// Usamos el += y el <br> como pide el profe
		resultado.innerHTML += "<strong>Visto:</strong> " + item + "<br>";
		resultado.className = "resultado success";
	} else {
		resultado.innerHTML += "No existe ese elemento<br>";
		resultado.className = "resultado error";
	}
}

function insertar(idNombre, idLista) {
	let nombre = document.getElementById(idNombre).value;
	let resultado = document.getElementById("resultado" + idLista);

	if (nombre.trim() === "") {
		resultado.innerHTML += "Introduce un elemento<br>";
		resultado.className = "resultado error";
	} else {
		let nodoLi = document.createElement("li");
		let nodoTexto = document.createTextNode(nombre);
		nodoLi.appendChild(nodoTexto);
		let nodo = document.getElementById(idLista);
		nodo.appendChild(nodoLi);
		
		resultado.innerHTML += "El elemento <strong>" + nombre + "</strong> ha sido insertado<br>";
		resultado.className = "resultado success";
		
		document.getElementById(idNombre).value = ""; 
	}
}

function borrar(idNumero, idLista) {
	let num = Number(document.getElementById(idNumero).value);
	let nodo = document.getElementById(idLista);
	let nodosLi = nodo.getElementsByTagName("li");
	let resultado = document.getElementById("resultado" + idLista);

	if (num > 0 && num <= nodosLi.length) {
		let nombre = nodosLi[num - 1].innerHTML;
		nodo.removeChild(nodosLi[num - 1]);
		
		resultado.innerHTML += "El elemento <strong>" + nombre + "</strong> ha sido borrado<br>";
		resultado.className = "resultado deleted";
		
		// Vaciamos el cajón de texto
		document.getElementById(idNumero).value = ""; 
	} else {	
		resultado.innerHTML += "No se encuentra el elemento<br>";
		resultado.className = "resultado error";
	}
}