function calcular(){
	let precio = Number(document.getElementById("precio").value);
	let num = Number(document.getElementById("num").value);
	let resultado;

	if (isNaN(precio) || isNaN(num)) {
		resultado = 'Los valores introducidos no son válidos';
	} else if (precio <= 0 || num <= 0) {
		resultado = 'Los valores deben ser mayores que 0';
	} else if (num == 1) {
		let total = num * precio;
		resultado = 'El precio total es ' + total + ' €';
	} else if (num == 2) {
		let total = num * precio * 0.90;
		resultado = 'El precio total es ' + total + ' €';
	} else if (num == 3) {
		let total = num * precio * 0.85;
		resultado = 'El precio total es ' + total + ' €';
	} else if (num == 4) {
		let total = num * precio * 0.80;
		resultado = 'El precio total es ' + total + ' €';
	} else if (num >= 5) {
		let total = num * precio * 0.75;
		resultado = 'El precio total es ' + total + ' €';
	} else {
		resultado = 'Número de entradas no válido';
	}

	document.getElementById("resultado").innerHTML = resultado;
}
