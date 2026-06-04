// La única función genérica (15e)
function mostrar(idNumero, idLista) {
	let num = document.getElementById(idNumero).value;
	let lista = document.getElementById(idLista);
	let nodosLi = lista.getElementsByTagName("li");
	let resultado = document.getElementById("resultado" + idLista);

	if (num > 0 && num <= nodosLi.length) {
		let item = nodosLi[num - 1].innerHTML;
		resultado.innerHTML = "<strong>Elemento:</strong> " + item;
		resultado.className = "resultado success";
	} else {
		resultado.textContent = "No existe ese elemento";
		resultado.className = "resultado error";
	}
}

// Funciones específicas para Bebidas
function insertarBebida() {
	let nombreBebida = document.getElementById("nombreBebida").value;
	let resultado = document.getElementById("resultadolistaBebidas");

	if (nombreBebida.length == 0 || nombreBebida == "") {
		resultado.textContent = "Introduce una bebida";
		resultado.className = "resultado error";
	} else {
		let nodoLi = document.createElement("li");
		let nodoTexto = document.createTextNode(nombreBebida);
		nodoLi.appendChild(nodoTexto);
		let nodoBebidas = document.getElementById("listaBebidas");
		nodoBebidas.appendChild(nodoLi);
		
		resultado.innerHTML = "<strong>La bebida ha sido insertada:</strong> " + nombreBebida;
		resultado.className = "resultado success";
		document.getElementById("nombreBebida").value = ""; 
	}
}

function borrarBebida() {
	let numBebida = Number(document.getElementById("numBebida").value);
	let nodoBebidas = document.getElementById("listaBebidas");
	let nodosLi = nodoBebidas.getElementsByTagName("li");
	let resultado = document.getElementById("resultadolistaBebidas");

	if (numBebida > 0 && numBebida <= nodosLi.length) {
		let nombre = nodosLi[numBebida - 1].innerHTML;
		nodoBebidas.removeChild(nodosLi[numBebida - 1]);
		
		resultado.innerHTML = "<strong>La bebida ha sido borrada:</strong> " + nombre;
		resultado.className = "resultado deleted";
		document.getElementById("numBebida").value = "";
	} else {	
		resultado.textContent = "No hay bebida con ese número";
		resultado.className = "resultado error";
	}
}

// Funciones específicas para Pastas
function insertarPasta() {
	let nombrePasta = document.getElementById("nombrePasta").value;
	let resultado = document.getElementById("resultadolistaPastas");

	if (nombrePasta.length == 0 || nombrePasta == "") {
		resultado.textContent = "Introduce una pasta";
		resultado.className = "resultado error";
	} else {
		let nodoLi = document.createElement("li");
		let nodoTexto = document.createTextNode(nombrePasta);
		nodoLi.appendChild(nodoTexto);
		let nodoPastas = document.getElementById("listaPastas");
		nodoPastas.appendChild(nodoLi);
		
		resultado.innerHTML = "<strong>La pasta ha sido insertada:</strong> " + nombrePasta;
		resultado.className = "resultado success";
		document.getElementById("nombrePasta").value = ""; 
	}
}

function borrarPasta() {
	let numPasta = Number(document.getElementById("numPasta").value);
	let nodoPastas = document.getElementById("listaPastas");
	let nodosLi = nodoPastas.getElementsByTagName("li");
	let resultado = document.getElementById("resultadolistaPastas");

	if (numPasta > 0 && numPasta <= nodosLi.length) {
		let nombre = nodosLi[numPasta - 1].innerHTML;
		nodoPastas.removeChild(nodosLi[numPasta - 1]);
		
		resultado.innerHTML = "<strong>La pasta ha sido borrada:</strong> " + nombre;
		resultado.className = "resultado deleted";
		document.getElementById("numPasta").value = "";
	} else {	
		resultado.textContent = "No hay pasta con ese número"; 
		resultado.className = "resultado error";
	}
}