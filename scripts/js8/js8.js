function calcular() {
	// Leemos los valores y los convertimos a números
	let num1 = Number(document.getElementById("n1").value);
	let num2 = Number(document.getElementById("n2").value);
	let mensajeMayor;
	let suma;

	// Determinamos cuál es el mayor
	if (num1 > num2) {
		mensajeMayor = "El número mayor es: " + num1;
	} else if (num2 > num1) {
		mensajeMayor = "El número mayor es: " + num2;
	} else {
		mensajeMayor = "Ambos números son iguales";
	}

	// Calculamos la suma
	suma = num1 + num2;

	// Escribimos el resultado en el HTML
	document.getElementById("resultado").innerHTML = 
		"<p>" + mensajeMayor + "</p>" +
		"<p>La suma de los dos números es: " + suma + "</p>";
}