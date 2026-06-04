function mostrarBebida() {
	let numBebida = document.getElementById("numBebida").value;
	let nodosLi = document.getElementsByTagName("li");
	if (numBebida > 0 && numBebida <= nodosLi.length) {
		let bebida = nodosLi[numBebida - 1].innerHTML;
		document.getElementById("resultado").innerHTML = "Bebida seleccionada: " + bebida;
		document.getElementById("resultado").className = "success";
	} else {
		document.getElementById("resultado").innerHTML = "Número no válido";
		document.getElementById("resultado").className = "error";
	}
}
