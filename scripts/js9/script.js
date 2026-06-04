function comprobarLetra() {

    // 1. Declaración del array de letras según el enunciado
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B',
                  'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

    // 2. Almacenar en variables los datos indicados por el usuario desde el DOM
    let dni   = document.getElementById("dni").value;
    let letra = document.getElementById("letra").value;

    // 3. Comprobación en una sola instrucción (si el número es menor que 0 o mayor que 99999999)
    if (dni > 0 && dni <= 99999999) {

        // 4. Si el número es válido, se calcula la letra que le corresponde
        var resto          = dni % 23;
        var letraCalculada = letras[resto];

        // 5. Comparación de la letra calculada con la indicada por el usuario
        //    Usamos .toUpperCase() para que no importe si el usuario escribe en minúscula
        if (letraCalculada !== letra.toUpperCase()) {
            document.getElementById("resultado").textContent = "La letra que ha indicado no es correcta.";
            document.getElementById("resultado").style.color = "red";
        } else {
            document.getElementById("resultado").textContent = "El número y la letra de DNI son correctos.";
            document.getElementById("resultado").style.color = "green";
        }

    } else {
        document.getElementById("resultado").textContent = "El DNI debe ser un valor entre 0 y 99999999.";
        document.getElementById("resultado").style.color = "orange";
    }
}
