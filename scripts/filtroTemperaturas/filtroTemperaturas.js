// Guardamos aquí las lecturas para poder filtrarlas sin volver a pedir los datos.
let sensorExterior = [];

function leerDatos() {
	var url = "https://borjamulleras.com/sensores/datosSensores.php";
	var request = new XMLHttpRequest();
	request.responseType = "application/json"; //Predeterminado
	request.open("GET", url); //Solo configura la llamada
	request.onload = function() {
		if (request.status == 200) { //200 significa correcto.
			actualizarIU(request.responseText);
		}
	};
	request.send(null);
}

function actualizarIU(json) {
	let sensores = JSON.parse(json);
	sensorExterior = Object.entries(sensores[11]);

	// Cuando se pulsa el botón, volvemos a pintar aplicando el filtro.
	document.getElementById("btnFiltrar").addEventListener("click", pintar);

	pintar(); // Pintado inicial.
}

function pintar() {
	// Valor que el usuario ha escrito en el input.
	let minimo = Number(document.getElementById("minimo").value);

	// filter -> nos quedamos solo con las lecturas que cumplan la condición.
	let filtradas = sensorExterior.filter((datos) => datos[1].temperatura >= minimo);

	let html = filtradas.reduce((acumulador, datos) =>
		acumulador + datos[0] + "<br>" +
		"Temperatura: " + datos[1].temperatura + "<br>" +
		"Humedad: " + datos[1].humedad + "<br>"
	, "");

	document.getElementById("temperaturas").innerHTML = html;
}
