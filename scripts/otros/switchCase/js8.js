function calcular() {
	let num1 = Number(document.getElementById("n1").value);
	let num2 = Number(document.getElementById("n2").value);
	let mensajeMayor;

	// Usamos switch para determinar el mayor
	switch (true) {
		case (num1 > num2):
			mensajeMayor = "El número mayor es: " + num1;
			break;
		case (num2 > num1):
			mensajeMayor = "El número mayor es: " + num2;
			break;
		default:
			mensajeMayor = "Ambos números son iguales";
			break;
	}

	// Calculamos la suma fuera del switch
	let suma = num1 + num2;

	// Escribimos los dos resultados
	document.getElementById("resultado").innerHTML = 
		"<p>" + mensajeMayor + "</p>" +
		"<p>La suma de los dos números es: " + suma + "</p>";
}