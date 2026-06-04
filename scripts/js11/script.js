function crearInputs() {
    // Variable global (sin let) como hace el profe
    numInputs = Number(document.getElementById("numInputs").value);
    let codigoHTML = '';
    console.log("crearInputs", numInputs);
    
    for (let i = 1; i <= numInputs; i++) {
        codigoHTML += 'Número' + i + ': <input type="number" id="num' + i + '"><br>';
    }
    
    codigoHTML += '<br><button onclick="calcMayor()">Calcular</button>';
    document.getElementById("inputs").innerHTML = codigoHTML;
}

function calcMayor() {
    console.log("calcMayor", numInputs);
    let tabla = [];
    
    for (let i = 0; i < numInputs; i++) {
        tabla[i] = Number(document.getElementById("num" + (i + 1)).value);
    }
    
    let valor = tabla[0];
    console.log(tabla);
    console.log("tabla[i]", "Valor", "i");
    
    for (let i = 1; i < tabla.length; i++) {
        console.log("Inicio bucle: ", tabla[i], valor, i);
        if (valor < tabla[i]) {
            valor = tabla[i];
        }
        console.log("Fin bucle: ", tabla[i], valor, i);
    }
    
    document.getElementById("mayor").innerHTML = valor;
}