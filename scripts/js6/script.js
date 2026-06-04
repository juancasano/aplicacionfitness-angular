function convertirCalificacion(numero) {
    if (numero >= 19 && numero <= 20) {
        return 'A';
    } else if (numero >= 16 && numero <= 18) {
        return 'B';
    } else if (numero >= 12 && numero <= 15) {
        return 'C';
    } else if (numero >= 9 && numero <= 11) {
        return 'D';
    } else if (numero >= 0 && numero <= 8) {
        return 'E';
    } else {
        return 'Calificación no válida';
    }
}

function ejecutarConversor() {
    const input = document.getElementById('nota').value;
    const numero = parseFloat(input);
    const resultado = convertirCalificacion(numero);
    document.getElementById('resultado').innerText = "Resultado: " + resultado;
}
