var numero1 = parseInt(prompt("Introduce el primer número:"));
var numero2 = parseInt(prompt("Introduce el segundo número:"));

if(numero2 >= numero1) {
    alert("numero1 no es mayor que numero2");
}

if(numero2 > 0) {
    alert("numero2 es positivo");
}

if(numero1 < 0 || numero1 === 0) {
    alert("numero1 es negativo o distinto de cero");
}

if(numero1 + 1 < numero2) {
    alert("Incrementar en 1 unidad el valor de numero1 no lo hace mayor o igual que numero2");
}
