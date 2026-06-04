function calcularFactorial() {

    // 1. Recogemos el número introducido por el usuario desde el DOM
    let numfactorial = parseInt(document.getElementById("numfactorial").value);

    // 2. Validación: debe ser un número entero positivo
    if (isNaN(numfactorial) || numfactorial < 0) {
        document.getElementById("resultado").textContent = "Por favor, introduce un número entero positivo.";
        document.getElementById("resultado").style.color = "orange";
        return;
    }

    // 3. Calculamos el factorial con el bucle for indicado en el enunciado
    var factorial = 1;

    for (var i = 1; i <= numfactorial; i++) {
        factorial = factorial * i;
    }

    // 4. Mostramos el resultado en la página
    document.getElementById("resultado").textContent = "El factorial de " + numfactorial + " es: " + factorial;
    document.getElementById("resultado").style.color = "green";
}
