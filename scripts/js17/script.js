// Ejercicio JS17 - Acceso a enlaces mediante DOM

function mostrarInfoEnlaces() {
  // Almacenamos todos los enlaces de la página al inicio para reutilizar la variable
  const todosLosEnlaces = document.getElementsByTagName("a");

  // 1. Número de enlaces de la página
  const numeroEnlaces = todosLosEnlaces.length;
  const res1 = "<p><strong>1. Número de enlaces de la página:</strong> " + numeroEnlaces + "</p>";

  // 2. Dirección a la que enlaza el penúltimo enlace
  let res2 = "<p><strong>2. Dirección del penúltimo enlace:</strong> No hay suficientes enlaces</p>";
  if (numeroEnlaces >= 2) {
    const penultimoEnlace = todosLosEnlaces[numeroEnlaces - 2];
    res2 = "<p><strong>2. Dirección del penúltimo enlace:</strong> " + penultimoEnlace.href + "</p>";
  }

  // 3. Número de enlaces que enlazan a http://prueba
  let enlacesPrueba = 0;
  for (let i = 0; i < todosLosEnlaces.length; i++) {
    if (todosLosEnlaces[i].getAttribute("href") === "http://prueba" || todosLosEnlaces[i].getAttribute("href") === "http://prueba/") {
      enlacesPrueba++;
    }
  }
  const res3 = "<p><strong>3. Número de enlaces que enlazan a http://prueba:</strong> " + enlacesPrueba + "</p>";

  // 4. Número de enlaces del tercer párrafo
  let res4 = "<p><strong>4. Número de enlaces del tercer párrafo:</strong> No hay suficientes párrafos</p>";
  const parrafos = document.getElementsByTagName("p");
  if (parrafos.length >= 3) {
    const tercerParrafo = parrafos[2];
    const enlacesTercerParrafo = tercerParrafo.getElementsByTagName("a").length;
    res4 = "<p><strong>4. Número de enlaces del tercer párrafo:</strong> " + enlacesTercerParrafo + "</p>";
  }

  // Mostrar los resultados en el div habilitado en el HTML
  document.getElementById("resultados").innerHTML = res1 + res2 + res3 + res4;
}