function calcular() {
	let nota = Number(document.getElementById("nota").value);
	let letra;

	// Evaluamos cuál de los siguientes casos es verdadero (true)
	switch (true) {
		case (nota >= 19 && nota <= 20):
			letra = 'La letra de la nota ' + nota + ' es A';
			break; // Importante para detener la ejecución aquí
		case (nota >= 16 && nota < 19):
			letra = 'La letra de la nota ' + nota + ' es B';
			break;
		case (nota >= 12 && nota < 16):
			letra = 'La letra de la nota ' + nota + ' es C';
			break;
		case (nota >= 9 && nota < 12):
			letra = 'La letra de la nota ' + nota + ' es D';
			break;
		case (nota >= 0 && nota < 9):
			letra = 'La letra de la nota ' + nota + ' es E';
			break;
		default: // Se ejecuta si no se cumple ninguna de las anteriores
			if (isNaN(nota)) {
				letra = 'La nota introducida no es válida';
			} else {
				letra = 'La nota está fuera de rango';
			}
	}

	document.getElementById("resultado").innerHTML = letra;
}