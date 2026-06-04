const API_URL = "https://borjamulleras.com/pimec/personas.php";

function crearPersona() {
	const nombre = document.getElementById("nombre").value;
	const apellido1 = document.getElementById("apellido1").value;
	const apellido2 = document.getElementById("apellido2").value;
	const dni = document.getElementById("dni").value;
	const persona = new Persona('', nombre, apellido1, apellido2, dni);
	lista.agregarPersona(persona);
}

function modificarPersona2() {
	lista.modificarPersona2();
}

class Persona {
	constructor(id, nombre, apellido1, apellido2, dni) {
		this.id = id;
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		this.dni = dni;
	}

	nombreCompleto() {
		return this.nombre + " " + this.apellido1 + " " + this.apellido2;
	}

	mostrarDatos() {
		return this.nombre + " " +
		       this.apellido1 + " " +
		       this.apellido2 + "<br>" +
		       this.dni;
	}

	toJSON() {
		return {
			id: this.id,
			nombre: this.nombre,
			apellido1: this.apellido1,
			apellido2: this.apellido2,
			dni: this.dni
		};
	}
}

class ListaPersonas {
	constructor() {
		this.personas = [];
		this.personasOrdenadasArray = [];
	}

	recuperarPersonas() {
		fetch(API_URL)
		.then((response) => response.json())
		.then((personasRecuperadas) => {
			this.personas = personasRecuperadas.map((p) => new Persona(
				p.id,
				p.nombre,
				p.apellido1,
				p.apellido2,
				p.dni
			));
			this.mostrarPersonasOrdenadas();
		})
		.catch((error) => console.log(error));
	}

	mostrarPersonasOrdenadas() {
		const contenedor = document.getElementById("listadoPersonas");

		this.personasOrdenadasArray = [...this.personas]
			.sort((a, b) => a.apellido1.localeCompare(b.apellido1, "es"));

		contenedor.innerHTML = this.personasOrdenadasArray.map((persona, index) => {
			return persona.mostrarDatos() +
				"<br><button onclick='lista.modificarPersona1(" + index + ")'>Modificar</button>" +
				"<br><button onclick='lista.borrarPersona(" + persona.id + ")'>Borrar</button><hr>";
		}).join("");
	}

	agregarPersona(persona) {
		fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(persona.toJSON())
		})
		.then((response) => response.json())
		.then(() => {
			this.recuperarPersonas();
		})
		.catch((error) => console.log(error));
	}

	borrarPersona(id) {
		const confirmar = confirm("¿Seguro que quieres borrar esta persona?");
		if (confirmar === false) {
			return;
		}
		fetch(API_URL + "?id=" + id, {
			method: "DELETE"
		})
		.then(() => {
			this.recuperarPersonas();
		})
		.catch((error) => console.log(error));
	}

	modificarPersona1(index) {
		const persona = this.personasOrdenadasArray[index];
		document.getElementById("nombre").value = persona.nombre;
		document.getElementById("apellido1").value = persona.apellido1;
		document.getElementById("apellido2").value = persona.apellido2;
		document.getElementById("dni").value = persona.dni;
		document.getElementById("idPersona").value = persona.id;

		document.getElementById("botonCrear").style.display = "none";
		document.getElementById("botonModificar").style.display = "inline-block";
	}

	modificarPersona2() {
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
		.then(() => {
			this.borrarFormulario();
			document.getElementById("botonCrear").style.display = "inline-block";
			document.getElementById("botonModificar").style.display = "none";
			this.recuperarPersonas();
		})
		.catch((error) => console.log(error));
	}

	borrarFormulario() {
		document.getElementById("nombre").value = "";
		document.getElementById("apellido1").value = "";
		document.getElementById("apellido2").value = "";
		document.getElementById("dni").value = "";
		document.getElementById("idPersona").value = "";
	}
}

const lista = new ListaPersonas();
lista.recuperarPersonas();
