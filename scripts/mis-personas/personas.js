document.getElementById("btnAgregar").onclick = agregarPersona;

function agregarPersona() {
	event.preventDefault();
	const nombre = document.getElementById("nombre").value;
	const apellido1 = document.getElementById("apellido1").value;
	const apellido2 = document.getElementById("apellido2").value;
	const sexo = document.getElementById("sexo").value;
	const direccion = document.getElementById("direccion").value;

	if (indiceEditando === -1) {
		const persona = new Persona(nombre, apellido1, apellido2, sexo, direccion);
		lista.agregar(persona);
	} else {
		lista.personas[indiceEditando].nombre = nombre;
		lista.personas[indiceEditando].apellido1 = apellido1;
		lista.personas[indiceEditando].apellido2 = apellido2;
		lista.personas[indiceEditando].sexo = sexo;
		lista.personas[indiceEditando].direccion = direccion;
		indiceEditando = -1;
		document.getElementById("btnAgregar").textContent = "Agregar";
	}

	document.getElementById("nombre").value = "";
	document.getElementById("apellido1").value = "";
	document.getElementById("apellido2").value = "";
	document.getElementById("direccion").value = "";

	lista.guardar();
	lista.mostrarPersonas();
}

class Persona {
	constructor(nombre, apellido1, apellido2, sexo, direccion) {
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		this.sexo = sexo;
		this.direccion = direccion;
	}
	nombreCompleto() {
		return this.nombre + " " + this.apellido1 + " " + this.apellido2;
	}
}

class ListaPersonas {
	constructor() {
		this.personas = [];
	}
	agregar(persona) {
		this.personas.push(persona);
		console.log("Persona agregada");
	}
	mostrarPersonas() {
		const contenedor = document.getElementById("lista-personas");

		if (this.personas.length > 0) {
			let html = "";
			this.personas.forEach((persona, indice) => {
				html += "<div>" +
							persona.nombreCompleto() + "<br>" +
							(persona.sexo == "M" ? "Masculino" : "Femenino") + "<br>" +
							"<button onclick='lista.editar(" + indice + ")'>Modificar</button><br>" +
							"<button onclick='lista.borrar(" + indice + ")'>Borrar</button>" +
						"</div><hr>";
			})
			contenedor.innerHTML = html;
		} else {
			contenedor.innerHTML = "No hay personas";
			return;
		}
	}
	editar(indice) {
		if (indice >= 0 && indice < this.personas.length) {
			const persona = this.personas[indice];
			document.getElementById("nombre").value = persona.nombre;
			document.getElementById("apellido1").value = persona.apellido1;
			document.getElementById("apellido2").value = persona.apellido2;
			document.getElementById("sexo").value = persona.sexo;
			document.getElementById("direccion").value = persona.direccion;
			indiceEditando = indice;
			document.getElementById("btnAgregar").textContent = "Guardar";
		} else {
			console.log("Indice inválido");
		}
	}
	borrar(indice) {
		if (indice >= 0 && indice < this.personas.length) {
			this.personas.splice(indice, 1);
			this.guardar();
			this.mostrarPersonas();
		} else {
			console.log("Indice inválido");
		}
	}
	guardar() {
		let texto = JSON.stringify(lista);
		localStorage.setItem("personas", texto);
	}
	recuperar() {
		let datosGuardados = localStorage.getItem("personas");
		if (!datosGuardados) {
			return;
		}
		let personasRecuperadas = JSON.parse(datosGuardados).personas;
		this.personas = [];
		personasRecuperadas.forEach((objeto) => {
			const persona = new Persona(objeto.nombre, objeto.apellido1, objeto.apellido2, objeto.sexo, objeto.direccion);
			this.agregar(persona);
		});
	}
}

let indiceEditando = -1;

const lista = new ListaPersonas();

lista.recuperar();
lista.mostrarPersonas();
