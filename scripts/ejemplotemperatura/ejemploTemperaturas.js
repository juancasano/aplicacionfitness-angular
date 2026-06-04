function leerDatos() {
	var url = "https://borjamulleras.com/sensores/datosSensores.php";
	var request = new XMLHttpRequest();
	request.responseType = "application/json"; //Predeterminado
	request.open("GET", url); //Solo configura la llamada
	request.onload = function() {
		if (request.status == 200) { //200 significa correcto.
			actualizarIU(request.responseText); }
		};
	request.send(null);
}
function actualizarIU(json) {
	//console.log(json);
	let sensores = JSON.parse(json);
	let sensorExterior = Object.entries(sensores[11]);
	console.log(sensorExterior);
	//Nos quedamos solo con las temperaturas positivas.
	let sensoresCalidos = sensorExterior.filter(([fechaHora,datosSensor]) => datosSensor.temperatura > 0);
	html = sensoresCalidos.reduce((acumulador,datos) =>
		                          acumulador + datos[0]+"<br>"+
		                          "Temperatura: "+datos[1].temperatura+"<br>"+
		                          "Humedad: "+datos[1].humedad+"<br>"

		                          ,"");
	document.getElementById("temperaturas").innerHTML = html;
}