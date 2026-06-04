class Persona {
  #dni;
  id;
  nombre;
  apellido1;
  apellido2;

  constructor(id, nombre, apellido1, apellido2, dni) {
    this.id = id;
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

let personas = [];
const API_URL = "https://borjamulleras.com/pimec/personas.php";

window.onload = function() {
  leerPersonas();
};

function leerPersonas() {
  console.log("Cargando personas desde la API...");

  fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const arr = Array.isArray(data) ? data : [];
      personas = arr.map((p) => new Persona(p.id, p.nombre, p.apellido1, p.apellido2, p.dni));
      console.log("Personas cargadas:", personas);
      imprimirPersonas();
    })
    .catch(function(error) {
      console.error("Error al obtener personas:", error);
    });
}

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
    function(total, p) {
      return total +
        p.nombre + " " + p.apellido1 + " " + p.apellido2 + "<br>" +
        p.dni + "<br>" +
        `<button onclick="modificarPersona1(${p.id})">Modificar</button><br>` +
        `<button onclick="borrarPersona(${p.id})">Borrar</button><hr>`;
    },
    ""
  );
}

function crearPersona() {
  const nombre = document.getElementById('nombre').value;
  const apellido1 = document.getElementById('apellido1').value;
  const apellido2 = document.getElementById('apellido2').value;
  const dni = document.getElementById('dni').value;

  const persona = new Persona(null, nombre, apellido1, apellido2, dni);

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
    })
    .catch(function(error) {
      console.error("Error al guardar la persona:", error);
    });
}

function borrarPersona(id) {
  const confirmar = confirm("¿Seguro que quieres borrar esta persona?");
  if (confirmar === false) {
    return;
  }

  fetch(`${API_URL}?id=${id}`, {
    method: "DELETE"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Persona eliminada:", data);
      leerPersonas();
    })
    .catch(function(error) {
      console.error("Error al borrar persona:", error);
    });
}

function modificarPersona1(id) {
  const per = personas.find(function(p) {
    return p.id == id;
  });
  if (!per) return;

  document.getElementById('nombre').value = per.nombre;
  document.getElementById('apellido1').value = per.apellido1;
  document.getElementById('apellido2').value = per.apellido2;
  document.getElementById('dni').value = per.dni;
  document.getElementById('idPersona').value = per.id;

  document.getElementById('botonCrear').style.display = "none";
  document.getElementById('botonModificar').style.display = "inline-block";
}

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
      document.getElementById('botonCrear').style.display = "block";
      document.getElementById('botonModificar').style.display = "none";
    })
    .catch(function(error) {
      console.error("Error al actualizar persona:", error);
    });
}

