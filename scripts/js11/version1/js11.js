function calcMayor()
{
    let tabla = [];
    
    for (let i = 0; i < 4; i++) {
        tabla[i] = Number(document.getElementById("num"+(i+1)).value);
    }
    
    let valor = tabla[0];
    console.log(tabla);
    console.log("tabla[i]","Valor","i");
    
    for (let i = 1; i < tabla.length; i++) {
        console.log("Inicio bucle: ",tabla[i], valor, i);
        if (tabla[i] > valor) {
            valor = tabla[i];
        }
        console.log("Fin bucle: ",tabla[i], valor, i);
    }
    
    document.getElementById("mayor").innerHTML = valor;
}