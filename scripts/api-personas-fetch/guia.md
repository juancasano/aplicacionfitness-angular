# Guía didáctica: uso de una API CRUD con JavaScript y `fetch`

## 1. Objetivo de la guía

En esta guía vamos a aprender a conectar una página web hecha con **HTML y JavaScript** con un **webservice** usando la función `fetch`.

El webservice que utilizaremos es:

```text
https://borjamulleras.com/pimec/personas.php
```

Este webservice permite realizar un CRUD de personas.

CRUD significa:

| Letra | Significado | Acción |
|---|---|---|
| C | Create | Crear una persona |
| R | Read | Leer personas |
| U | Update | Actualizar una persona |
| D | Delete | Borrar una persona |

En esta documentación trabajaremos con `fetch`, `.then()` y `.catch()`.

No utilizaremos todavía `async` ni `await`.

---

## 2. ¿Qué es una API o webservice?

Una **API** o **webservice** es una dirección web que permite a una aplicación comunicarse con un servidor.

Normalmente, cuando entramos en una página web desde el navegador, recibimos HTML.

En cambio, cuando usamos una API, normalmente recibimos datos en formato JSON.

Por ejemplo, una API puede devolver algo parecido a esto:

```json
[
  {
    "id": 1,
    "nombre": "Ana",
    "apellido1": "García",
    "apellido2": "López",
    "dni": "12345678A"
  },
  {
    "id": 2,
    "nombre": "Carlos",
    "apellido1": "Pérez",
    "apellido2": "Martínez",
    "dni": "87654321B"
  }
]
```

JSON significa **JavaScript Object Notation**.

Es un formato muy utilizado para enviar y recibir datos entre el navegador y el servidor.

---

## 3. URL de la API

La URL que usaremos durante la práctica es:

```js
const API_URL = "https://borjamulleras.com/pimec/personas.php";
```

Guardar la URL en una constante es útil porque así no tenemos que repetirla muchas veces.

Si en algún momento cambia la dirección del webservice, solo tendremos que modificarla en un sitio.

---

## 4. Campos de una persona

En esta práctica, una persona tendrá los siguientes campos:

| Campo | Descripción |
|---|---|
| `id` | Identificador único de la persona en la base de datos |
| `nombre` | Nombre de la persona |
| `apellido1` | Primer apellido |
| `apellido2` | Segundo apellido |
| `dni` | DNI de la persona |

Ejemplo de una persona en JavaScript:

```js
const persona = {
  id: 1,
  nombre: "Ana",
  apellido1: "García",
  apellido2: "López",
  dni: "12345678A"
};
```

---

## 5. Métodos HTTP que usaremos

Para hacer un CRUD necesitamos varios métodos HTTP.

| Acción | Método HTTP | Para qué sirve |
|---|---|---|
| Leer personas | `GET` | Obtener datos del servidor |
| Crear persona | `POST` | Enviar una nueva persona al servidor |
| Actualizar persona | `PUT` | Modificar una persona existente |
| Borrar persona | `DELETE` | Eliminar una persona existente |

---

## 6. ¿Qué es `fetch`?

`fetch` es una función de JavaScript que permite hacer peticiones HTTP desde el navegador.

Ejemplo básico:

```js
fetch("https://borjamulleras.com/pimec/personas.php");
```

Esta línea hace una petición al servidor.

Pero normalmente necesitamos trabajar con la respuesta que devuelve el servidor. Para ello usamos `.then()`.

```js
fetch("https://borjamulleras.com/pimec/personas.php")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });
```

---

## 7. ¿Qué significa `.then()`?

`.then()` significa:

> Cuando termine correctamente la operación anterior, ejecuta esta función.

Ejemplo:

```js
fetch(API_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });
```

Este código hace lo siguiente:

1. Llama al servidor con `fetch(API_URL)`.
2. Cuando recibe la respuesta, ejecuta el primer `.then()`.
3. Convierte la respuesta a JSON con `response.json()`.
4. Cuando ya tiene los datos convertidos, ejecuta el segundo `.then()`.
5. Muestra los datos por consola.

---

## 8. ¿Qué significa `.catch()`?

`.catch()` sirve para controlar errores.

Por ejemplo:

```js
fetch(API_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.error("Ha ocurrido un error:", error);
  });
```

Si se produce un error en la petición, se ejecutará el `.catch()`.

---

## 9. Estructura HTML de ejemplo

Para probar la API podemos crear un archivo `index.html` con este contenido:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>CRUD de Personas con fetch</title>
</head>
<body>

  <h1>CRUD de Personas</h1>

  <h2>Formulario</h2>

  <input type="hidden" id="idPersona">

  <label>Nombre:</label>
  <input type="text" id="nombre">
  <br><br>

  <label>Primer apellido:</label>
  <input type="text" id="apellido1">
  <br><br>

  <label>Segundo apellido:</label>
  <input type="text" id="apellido2">
  <br><br>

  <label>DNI:</label>
  <input type="text" id="dni">
  <br><br>

  <input type="button" id="botonCrear" value="Crear persona" onclick="crearPersona()">
  <input type="button" id="botonModificar" value="Modificar persona" onclick="modificarPersona2()" style="display:none">

  <h2>Listado de personas</h2>
  <div id="listadoPersonas"></div>

  <script src="app.js"></script>
</body>
</html>
```

Elementos importantes:

| Elemento | Uso |
|---|---|
| `idPersona` | Guarda el ID de la persona que se está modificando |
| `nombre` | Campo para el nombre |
| `apellido1` | Campo para el primer apellido |
| `apellido2` | Campo para el segundo apellido |
| `dni` | Campo para el DNI |
| `botonCrear` | Botón para crear una persona |
| `botonModificar` | Botón para guardar cambios de una persona existente |
| `listadoPersonas` | Zona donde se mostrará la lista de personas |

---

## 10. Crear una clase `Persona`

Podemos representar una persona con una clase JavaScript.

```js
class Persona {
  #dni;
  nombre;
  apellido1;
  apellido2;

  constructor(nombre, apellido1, apellido2, dni) {
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.#dni = dni;
  }

  nombreCompleto() {
    return this.nombre + " " + this.apellido1 + " " + this.apellido2;
  }

  nombreCompletoAAN() {
    return this.apellido1 + " " + this.apellido2 + ", " + this.nombre;
  }

  get dni() {
    return this.#dni;
  }

  set dni(dni) {
    this.#dni = dni;
  }

  toJSON() {
    return {
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      dni: this.#dni
    };
  }
}
```

### Explicación de la clase

```js
class Persona {
```

Define una clase llamada `Persona`.

```js
#dni;
```

Define una propiedad privada llamada `dni`.

Las propiedades privadas empiezan por `#` y no se pueden modificar directamente desde fuera de la clase.

```js
constructor(nombre, apellido1, apellido2, dni) {
```

El constructor se ejecuta cuando creamos una nueva persona.

Ejemplo:

```js
const persona = new Persona("Ana", "García", "López", "12345678A");
```

```js
toJSON() {
  return {
    nombre: this.nombre,
    apellido1: this.apellido1,
    apellido2: this.apellido2,
    dni: this.#dni
  };
}
```

El método `toJSON()` sirve para preparar los datos que enviaremos a la API.

---

## 11. Variable para guardar las personas en memoria

Podemos crear un array vacío para guardar las personas que recibimos de la API.

```js
let personas = [];
```

Este array nos permitirá trabajar con las personas sin tener que pedir los datos al servidor continuamente.

---

## 12. Cargar personas al abrir la página

Podemos usar `window.onload` para ejecutar una función cuando la página haya terminado de cargar.

```js
window.onload = function() {
  leerPersonas();
};
```

Cuando se abra la página, se ejecutará `leerPersonas()`.

---

## 13. Leer personas con `GET`

Para leer personas usamos `fetch(API_URL)`.

Cuando no indicamos método, `fetch` usa `GET` por defecto.

```js
function leerPersonas() {
  console.log("Cargando personas desde la API...");

  fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      personas = Array.isArray(data) ? data : [];
      console.log("Personas cargadas:", personas);
      imprimirPersonas();
    })
    .catch(function(error) {
      console.error("Error al obtener personas:", error);
    });
}
```

### Explicación paso a paso

```js
fetch(API_URL)
```

Hace una petición `GET` a la API.

```js
.then(function(response) {
  return response.json();
})
```

Convierte la respuesta del servidor a JSON.

```js
.then(function(data) {
  personas = Array.isArray(data) ? data : [];
})
```

Guarda los datos recibidos en el array `personas`.

```js
Array.isArray(data) ? data : []
```

Comprueba si `data` es un array.

Si lo es, lo guarda.

Si no lo es, guarda un array vacío.

```js
imprimirPersonas();
```

Actualiza el listado visible en pantalla.

---

## 14. Mostrar personas en pantalla

La función `imprimirPersonas()` muestra las personas dentro del elemento `listadoPersonas`.

```js
function imprimirPersonas() {
  let listado = document.getElementById('listadoPersonas');
  listado.innerHTML = "";

  let personasOrdenadas = personas.sort(function(a, b) {
    if (a.apellido1 !== b.apellido1) {
      return a.apellido1.localeCompare(b.apellido1);
    }
    return a.apellido2.localeCompare(b.apellido2);
  });

  listado.innerHTML = personasOrdenadas.reduce(
    function(total, p, index) {
      return total +
        p.apellido1 + " " + p.apellido2 + ", " + p.nombre +
        `<input type="button" value="Modificar" onclick="modificarPersona1(${index})">` +
        `<input type="button" value="Borrar" onclick="borrarPersona(${p.id})">` +
        "<br />";
    },
    ""
  );
}
```

### Explicación

```js
let listado = document.getElementById('listadoPersonas');
```

Selecciona el elemento HTML donde se mostrará la lista.

```js
listado.innerHTML = "";
```

Vacía el listado antes de volver a escribirlo.

```js
personas.sort(function(a, b) {
```

Ordena las personas.

```js
a.apellido1.localeCompare(b.apellido1)
```

Compara textos alfabéticamente.

```js
reduce(...)
```

Construye un texto HTML a partir del array de personas.

Cada persona tendrá dos botones:

- `Modificar`
- `Borrar`

---

## 15. Crear persona con `POST`

Para crear una persona nueva usamos el método `POST`.

```js
function crearPersona() {
  const nombre = document.getElementById('nombre').value;
  const apellido1 = document.getElementById('apellido1').value;
  const apellido2 = document.getElementById('apellido2').value;
  const dni = document.getElementById('dni').value;

  const persona = new Persona(nombre, apellido1, apellido2, dni);

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(persona.toJSON())
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Persona guardada:", data);
      persona.id = data.id;
      personas.push(persona);
      imprimirPersonas();
      borrarFormulario();
    })
    .catch(function(error) {
      console.error("Error al guardar la persona:", error);
    });
}
```

### Explicación paso a paso

Primero leemos los valores del formulario:

```js
const nombre = document.getElementById('nombre').value;
const apellido1 = document.getElementById('apellido1').value;
const apellido2 = document.getElementById('apellido2').value;
const dni = document.getElementById('dni').value;
```

Después creamos una persona:

```js
const persona = new Persona(nombre, apellido1, apellido2, dni);
```

Después enviamos la persona a la API:

```js
fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(persona.toJSON())
})
```

### Partes importantes del `POST`

```js
method: "POST"
```

Indica que queremos crear un registro nuevo.

```js
headers: {
  "Content-Type": "application/json"
}
```

Indica que estamos enviando datos en formato JSON.

```js
body: JSON.stringify(persona.toJSON())
```

Convierte el objeto JavaScript en texto JSON antes de enviarlo.

---

## 16. ¿Qué es `JSON.stringify()`?

`JSON.stringify()` convierte un objeto JavaScript en texto JSON.

Ejemplo:

```js
const persona = {
  nombre: "Ana",
  apellido1: "García",
  apellido2: "López",
  dni: "12345678A"
};

console.log(JSON.stringify(persona));
```

Resultado:

```json
{"nombre":"Ana","apellido1":"García","apellido2":"López","dni":"12345678A"}
```

Esto es necesario porque los datos que viajan al servidor se envían como texto.

---

## 17. Borrar persona con `DELETE`

Para borrar una persona usamos el método `DELETE`.

```js
function borrarPersona(id) {
  fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `id=${id}`
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Persona eliminada:", data);
      personas = personas.filter(function(p) {
        return p.id !== id;
      });
      imprimirPersonas();
    })
    .catch(function(error) {
      console.error("Error al borrar persona:", error);
    });
}
```

### Explicación

```js
method: "DELETE"
```

Indica que queremos borrar un registro.

```js
headers: {
  "Content-Type": "application/x-www-form-urlencoded"
}
```

Indica que enviamos datos en formato formulario.

```js
body: `id=${id}`
```

Enviamos el ID de la persona que queremos borrar.

Ejemplo:

```text
id=3
```

Después, si el servidor confirma el borrado, eliminamos esa persona del array local:

```js
personas = personas.filter(function(p) {
  return p.id !== id;
});
```

---

## 18. Preparar una persona para modificar

Cuando pulsamos el botón `Modificar`, primero rellenamos el formulario con los datos de esa persona.

```js
function modificarPersona1(index) {
  const per = personas[index];

  document.getElementById('nombre').value = per.nombre;
  document.getElementById('apellido1').value = per.apellido1;
  document.getElementById('apellido2').value = per.apellido2;
  document.getElementById('dni').value = per.dni;
  document.getElementById('idPersona').value = per.id;

  document.getElementById('botonCrear').style.display = "none";
  document.getElementById('botonModificar').style.display = "block";
}
```

Esta función no modifica todavía los datos en la base de datos.

Solo prepara el formulario para editar.

### Explicación

```js
const per = personas[index];
```

Selecciona la persona del array según su posición.

```js
document.getElementById('idPersona').value = per.id;
```

Guarda el ID de la persona que se va a modificar.

```js
document.getElementById('botonCrear').style.display = "none";
document.getElementById('botonModificar').style.display = "block";
```

Oculta el botón de crear y muestra el botón de modificar.

---

## 19. Modificar persona con `PUT`

Para modificar una persona existente usamos el método `PUT`.

```js
function modificarPersona2() {
  const id = document.getElementById('idPersona').value;
  const nombre = document.getElementById('nombre').value;
  const apellido1 = document.getElementById('apellido1').value;
  const apellido2 = document.getElementById('apellido2').value;
  const dni = document.getElementById('dni').value;

  fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `id=${id}&nombre=${nombre}&apellido1=${apellido1}&apellido2=${apellido2}&dni=${dni}`
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Persona actualizada:", data);

      let persona = personas.find(function(p) {
        return p.id == id;
      });

      if (persona) {
        persona.nombre = nombre;
        persona.apellido1 = apellido1;
        persona.apellido2 = apellido2;
        persona.dni = dni;
      }

      imprimirPersonas();
      borrarFormulario();
      document.getElementById('botonCrear').style.display = "block";
      document.getElementById('botonModificar').style.display = "none";
    })
    .catch(function(error) {
      console.error("Error al actualizar persona:", error);
    });
}
```

### Explicación del `PUT`

```js
method: "PUT"
```

Indica que queremos actualizar un registro existente.

```js
body: `id=${id}&nombre=${nombre}&apellido1=${apellido1}&apellido2=${apellido2}&dni=${dni}`
```

Envía los datos al servidor en formato formulario.

Ejemplo:

```text
id=3&nombre=Ana&apellido1=García&apellido2=López&dni=12345678A
```

Después actualizamos también el array local:

```js
let persona = personas.find(function(p) {
  return p.id == id;
});
```

Busca la persona dentro del array.

```js
if (persona) {
  persona.nombre = nombre;
  persona.apellido1 = apellido1;
  persona.apellido2 = apellido2;
  persona.dni = dni;
}
```

Si la encuentra, actualiza sus datos.

---

## 20. Limpiar el formulario

Después de crear o modificar una persona, conviene limpiar el formulario.

```js
function borrarFormulario() {
  document.getElementById('nombre').value = "";
  document.getElementById('apellido1').value = "";
  document.getElementById('apellido2').value = "";
  document.getElementById('dni').value = "";
  document.getElementById('idPersona').value = "";
}
```

---

## 21. Código completo de `app.js`

Está disponible en el archivo `app.js` de esta misma carpeta.

---

## 22. Resumen de llamadas a la API

### Leer personas

```js
fetch(API_URL)
```

Método usado: `GET`

Sirve para obtener todas las personas.

---

### Crear persona

```js
fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(persona.toJSON())
})
```

Método usado: `POST`

Sirve para crear una nueva persona.

---

### Borrar persona

```js
fetch(API_URL, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `id=${id}`
})
```

Método usado: `DELETE`

Sirve para borrar una persona existente.

---

### Modificar persona

```js
fetch(API_URL, {
  method: "PUT",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `id=${id}&nombre=${nombre}&apellido1=${apellido1}&apellido2=${apellido2}&dni=${dni}`
})
```

Método usado: `PUT`

Sirve para modificar una persona existente.

---

## 23. Diferencia entre JSON y formulario

En esta práctica usamos dos formas de enviar datos.

### Enviar JSON

Lo usamos al crear una persona con `POST`.

```js
headers: {
  "Content-Type": "application/json"
},
body: JSON.stringify(persona.toJSON())
```

Los datos se envían con formato JSON.

Ejemplo:

```json
{
  "nombre": "Ana",
  "apellido1": "García",
  "apellido2": "López",
  "dni": "12345678A"
}
```

### Enviar datos como formulario

Lo usamos en `PUT` y `DELETE`.

```js
headers: {
  "Content-Type": "application/x-www-form-urlencoded"
},
body: `id=${id}&nombre=${nombre}`
```

Los datos se envían como pares clave-valor.

Ejemplo:

```text
id=1&nombre=Ana&apellido1=García&apellido2=López&dni=12345678A
```

---

## 24. Errores habituales

### Error 1: olvidar convertir la respuesta a JSON

Incorrecto:

```js
fetch(API_URL)
  .then(function(response) {
    console.log(response);
  });
```

Correcto:

```js
fetch(API_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });
```

---

### Error 2: enviar un objeto directamente en el `body`

Incorrecto:

```js
body: persona
```

Correcto:

```js
body: JSON.stringify(persona)
```

---

### Error 3: olvidar el `Content-Type`

Incorrecto:

```js
fetch(API_URL, {
  method: "POST",
  body: JSON.stringify(persona)
});
```

Correcto:

```js
fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(persona)
});
```

---

### Error 4: confundir `POST` y `PUT`

Para crear usamos:

```js
method: "POST"
```

Para actualizar usamos:

```js
method: "PUT"
```

---

### Error 5: no actualizar la pantalla después de modificar datos

Después de crear, modificar o borrar una persona, hay que volver a pintar la lista.

En esta práctica lo hacemos con:

```js
imprimirPersonas();
```

---

## 25. Ejercicio propuesto

Crear una página web que permita:

1. Cargar la lista de personas desde la API.
2. Mostrar las personas ordenadas por apellido.
3. Crear una persona nueva.
4. Borrar una persona.
5. Cargar una persona en el formulario para modificarla.
6. Guardar los cambios de una persona modificada.
7. Limpiar el formulario después de crear o modificar.

---

## 26. Mejoras recomendadas

Una vez terminado el ejercicio básico, se pueden añadir mejoras:

- Validar que el nombre no esté vacío.
- Validar que el DNI no esté vacío.
- Mostrar mensajes al usuario cuando se crea, modifica o borra una persona.
- Pedir confirmación antes de borrar.
- Usar `encodeURIComponent()` para evitar problemas con espacios, acentos o caracteres especiales.
- Recargar los datos desde la API después de cada operación si se quiere asegurar que la pantalla muestra exactamente lo que hay en la base de datos.

Ejemplo de confirmación antes de borrar:

```js
function borrarPersona(id) {
  const confirmar = confirm("¿Seguro que quieres borrar esta persona?");

  if (confirmar === false) {
    return;
  }

  fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `id=${id}`
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Persona eliminada:", data);
      personas = personas.filter(function(p) {
        return p.id !== id;
      });
      imprimirPersonas();
    })
    .catch(function(error) {
      console.error("Error al borrar persona:", error);
    });
}
```

---

## 27. Conclusión

Con esta práctica hemos aprendido a usar una API desde JavaScript usando `fetch`, `.then()` y `.catch()`.

Hemos usado los principales métodos HTTP:

| Acción | Método |
|---|---|
| Leer personas | `GET` |
| Crear persona | `POST` |
| Modificar persona | `PUT` |
| Borrar persona | `DELETE` |

También hemos visto conceptos importantes como:

- JSON.
- `JSON.stringify()`.
- `response.json()`.
- Métodos HTTP.
- Formularios HTML.
- Manipulación del DOM.
- Actualización de un array local de datos.

Esta práctica es una buena introducción al consumo de APIs con JavaScript.
