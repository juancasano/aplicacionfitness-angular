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

async function leerPersonas() {
  console.log("Cargando personas desde la API...");
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const arr = Array.isArray(data) ? data : [];
    personas = arr.map((p) => new Persona(p.id, p.nombre, p.apellido1, p.apellido2, p.dni));
    console.log("Personas cargadas:", personas);
    imprimirPersonas();
  } catch (error) {
    console.error("Error al obtener personas:", error);
  }
}

function imprimirPersonas() {
  const listado = document.getElementById('listadoPersonas');
  listado.innerHTML = "";

  const personasOrdenadas = [...personas].sort((a, b) => {
    if (a.apellido1 !== b.apellido1) {
      return a.apellido1.localeCompare(b.apellido1, "es");
    }
    return a.apellido2.localeCompare(b.apellido2, "es");
  });

  listado.innerHTML = personasOrdenadas.reduce((total, p) => {
    return total +
      p.nombre + " " + p.apellido1 + " " + p.apellido2 + "<br>" +
      p.dni + "<br>" +
      `<button onclick="modificarPersona1(${p.id})">Modificar</button><br>` +
      `<button onclick="borrarPersona(${p.id})">Borrar</button><hr>`;
  }, "");
}

async function crearPersona() {
  const nombre = document.getElementById('nombre').value;
  const apellido1 = document.getElementById('apellido1').value;
  const apellido2 = document.getElementById('apellido2').value;
  const dni = document.getElementById('dni').value;

  const persona = new Persona(null, nombre, apellido1, apellido2, dni);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(persona.toJSON())
    });
    const data = await response.json();
    console.log("Persona guardada:", data);
    await leerPersonas();
  } catch (error) {
    console.error("Error al guardar la persona:", error);
  }
}

async function borrarPersona(id) {
  const confirmar = confirm("¿Seguro que quieres borrar esta persona?");
  if (confirmar === false) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
    const data = await response.json();
    console.log("Persona eliminada:", data);
    await leerPersonas();
  } catch (error) {
    console.error("Error al borrar persona:", error);
  }
}

function modificarPersona1(id) {
  const per = personas.find((p) => p.id == id);
  if (!per) return;

  document.getElementById('nombre').value = per.nombre;
  document.getElementById('apellido1').value = per.apellido1;
  document.getElementById('apellido2').value = per.apellido2;
  document.getElementById('dni').value = per.dni;
  document.getElementById('idPersona').value = per.id;

  document.getElementById('botonCrear').style.display = "none";
  document.getElementById('botonModificar').style.display = "inline-block";
}

async function modificarPersona2() {
  const id = document.getElementById('idPersona').value;
  const nombre = document.getElementById('nombre').value;
  const apellido1 = document.getElementById('apellido1').value;
  const apellido2 = document.getElementById('apellido2').value;
  const dni = document.getElementById('dni').value;

  try {
    await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&nombre=${nombre}&apellido1=${apellido1}&apellido2=${apellido2}&dni=${dni}`
    });
    console.log("Persona actualizada");
    document.getElementById('botonCrear').style.display = "inline-block";
    document.getElementById('botonModificar').style.display = "none";
    await leerPersonas();
  } catch (error) {
    console.error("Error al actualizar persona:", error);
  }
}
