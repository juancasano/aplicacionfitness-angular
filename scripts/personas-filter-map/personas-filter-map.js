document.getElementById("btnAgregar").onclick = agregarPersona;
document.getElementById("btnMayoresEdad").onclick = filtrarMayoresEdad;
document.getElementById("btnMasculinos").onclick = filtrarMasculinos;
document.getElementById("btnFemeninos").onclick = filtrarFemeninos;
document.getElementById("btnNombresLargos").onclick = filtrarNombresLargos;
document.getElementById("btnBuscar").onclick = filtrarBusqueda;
document.getElementById("btnNombresCompletos").onclick = mapNombresCompletos;
document.getElementById("btnIniciales").onclick = mapIniciales;
document.getElementById("btnMayusculas").onclick = mapMayusculas;
document.getElementById("btnConCategoria").onclick = mapConCategoria;

function agregarPersona() {
	event.preventDefault();
	const nombre = document.getElementById("nombre").value;
	const apellido1 = document.getElementById("apellido1").value;
	const apellido2 = document.getElementById("apellido2").value;
	const sexo = document.getElementById("sexo").value;
	const edad = parseInt(document.getElementById("edad").value) || 0;
	const direccion = document.getElementById("direccion").value;

	if (indiceEditando === -1) {
		const persona = new Persona(nombre, apellido1, apellido2, sexo, edad, direccion);
		lista.agregar(persona);
	} else {
		lista.personas[indiceEditando].nombre = nombre;
		lista.personas[indiceEditando].apellido1 = apellido1;
		lista.personas[indiceEditando].apellido2 = apellido2;
		lista.personas[indiceEditando].sexo = sexo;
		lista.personas[indiceEditando].edad = edad;
		lista.personas[indiceEditando].direccion = direccion;
		indiceEditando = -1;
		document.getElementById("btnAgregar").textContent = "Agregar";
	}

	document.getElementById("nombre").value = "";
	document.getElementById("apellido1").value = "";
	document.getElementById("apellido2").value = "";
	document.getElementById("edad").value = "";
	document.getElementById("direccion").value = "";

	lista.guardar();
	lista.mostrarPersonas();
}

class Persona {
	constructor(nombre, apellido1, apellido2, sexo, edad, direccion) {
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		this.sexo = sexo;
		this.edad = edad;
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
							"Edad: " + persona.edad + "<br>" +
							(persona.sexo == "M" ? "Masculino" : "Femenino") + "<br>" +
							"Dirección: " + persona.direccion + "<br>" +
							"<button onclick='lista.editar(" + indice + ")'>Modificar</button> " +
							"<button onclick='lista.borrar(" + indice + ")'>Borrar</button>" +
						"</div><hr>";
			})
			contenedor.innerHTML = html;
		} else {
			contenedor.innerHTML = "No hay personas";
		}
	}
	editar(indice) {
		if (indice >= 0 && indice < this.personas.length) {
			const persona = this.personas[indice];
			document.getElementById("nombre").value = persona.nombre;
			document.getElementById("apellido1").value = persona.apellido1;
			document.getElementById("apellido2").value = persona.apellido2;
			document.getElementById("sexo").value = persona.sexo;
			document.getElementById("edad").value = persona.edad;
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
		localStorage.setItem("personas-filter-map", texto);
	}
	recuperar() {
		let datosGuardados = localStorage.getItem("personas-filter-map");
		if (!datosGuardados) {
			return;
		}
		let personasRecuperadas = JSON.parse(datosGuardados).personas;
		this.personas = [];
		personasRecuperadas.forEach((objeto) => {
			const persona = new Persona(objeto.nombre, objeto.apellido1, objeto.apellido2, objeto.sexo, objeto.edad, objeto.direccion);
			this.agregar(persona);
		});
	}
}

function filtrarMayoresEdad() {
	const mayoresDeEdad = lista.personas.filter(persona => persona.edad >= 18);
	console.log(mayoresDeEdad);
	mostrarResultadosFiltro(mayoresDeEdad);
}

function filtrarMasculinos() {
	const masculinos = lista.personas.filter(persona => persona.sexo === "M");
	console.log(masculinos);
	mostrarResultadosFiltro(masculinos);
}

function filtrarFemeninos() {
	const femeninos = lista.personas.filter(persona => persona.sexo === "F");
	console.log(femeninos);
	mostrarResultadosFiltro(femeninos);
}

function filtrarNombresLargos() {
	const nombresLargos = lista.personas.filter(persona => persona.nombre.length > 4);
	console.log(nombresLargos);
	mostrarResultadosFiltro(nombresLargos);
}

function filtrarBusqueda() {
	const busqueda = document.getElementById("filtroBusqueda").value.toLowerCase();
	const resultados = lista.personas.filter(persona =>
		persona.nombre.toLowerCase().includes(busqueda)
	);
	console.log(resultados);
	mostrarResultadosFiltro(resultados);
}

function mostrarResultadosFiltro(personas) {
	const contenedor = document.getElementById("resultados-filtro");
	if (personas.length === 0) {
		contenedor.innerHTML = "Sin resultados";
		return;
	}
	let html = "";
	personas.forEach(persona => {
		html += "<div>" +
					persona.nombreCompleto() + " — " +
					persona.edad + " años — " +
					(persona.sexo == "M" ? "Masculino" : "Femenino") +
				"</div>";
	});
	contenedor.innerHTML = html;
}

function mapNombresCompletos() {
	const nombres = lista.personas.map(persona => persona.nombreCompleto());
	console.log(nombres);
	mostrarResultadosMap(nombres);
}

function mapIniciales() {
	const iniciales = lista.personas.map(persona =>
		(persona.nombre[0] + persona.apellido1[0] + persona.apellido2[0]).toUpperCase()
	);
	console.log(iniciales);
	mostrarResultadosMap(iniciales);
}

function mapMayusculas() {
	const enMayusculas = lista.personas.map(persona => persona.nombreCompleto().toUpperCase());
	console.log(enMayusculas);
	mostrarResultadosMap(enMayusculas);
}

function mapConCategoria() {
	const conCategoria = lista.personas.map(persona => {
		return {
			...persona,
			categoria: persona.edad < 18 ? "Menor" : persona.edad < 65 ? "Adulto" : "Mayor"
		};
	});
	console.log(conCategoria);
	mostrarResultadosMap(conCategoria);
}

function mostrarResultadosMap(datos) {
	document.getElementById("resultados-map").textContent = JSON.stringify(datos, null, 2);
}

let indiceEditando = -1;

const lista = new ListaPersonas();

lista.recuperar();
lista.mostrarPersonas();
