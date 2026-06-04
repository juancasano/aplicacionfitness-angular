// Función que recibe un número y devuelve si es par o impar
function verificarParidad(numero) {
    if (numero % 2 === 0) {
        return numero + " es un número par";
    } else {
        return numero + " es un número impar";
    }
}

// Ejemplos de uso
console.log(verificarParidad(15));  // "15 es un número impar"
console.log(verificarParidad(7));   // "7 es un número impar"
console.log(verificarParidad(20));  // "20 es un número par"
console.log(verificarParidad(4));   // "4 es un número par"

