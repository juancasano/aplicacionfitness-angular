document.getElementById("botonAnadir").onclick = anadirTarea;

function anadirTarea() {
	event.preventDefault();
	const titulo = document.getElementById("titulo").value;
	const descripcion = document.getElementById("descripcion").value;

	if (indiceEditando === -1) {
		const tarea = new Tarea(titulo, descripcion);
		lista.agregarTarea(tarea);
	} else {
		lista.tareas[indiceEditando].titulo = titulo;
		lista.tareas[indiceEditando].descripcion = descripcion;
		indiceEditando = -1;
		document.getElementById("botonAnadir").textContent = "Anadir";
	}

	document.getElementById("titulo").value = "";
	document.getElementById("descripcion").value = "";

	lista.guardarTareas();
	lista.mostrarTareas();
}

class Tarea {
	constructor(titulo, descripcion, completada = false) {
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.completada = completada;
	}
	completar() {
		this.completada = true;
		console.log("Tarea completada");
	}
	mostrarInfo() {
		console.log("Tarea: " + this.titulo);
		console.log("Descripción: " + this.descripcion);
		console.log("Completada: " + (this.completada ? "Si" : "No"));
	}
}

class ListaTareas {
	constructor() {
		this.tareas = [];
	}
	agregarTarea(tarea) {
		this.tareas.push(tarea);
		console.log("Tarea agregada");
	}
	mostrarTareasConsola() {
		if (this.tareas.length > 0) {
			console.log("Tareas:");
			for (let i = 0; i < this.tareas.length; i++) {
				this.tareas[i].mostrarInfo();
			}
		} else {
			console.log("No hay tareas");
		}
	}
	mostrarTareas() {
		const contenedor = document.getElementById("lista-tareas");

		if (this.tareas.length > 0) {
			let html = "<ul>";
			this.tareas.forEach((tarea, indice) => {
				html += "<li>" +
							(indice + 1) + ". " +
							tarea.titulo + "<br>" +
							tarea.descripcion + "<br>" +
							(tarea.completada ? "Completada" : "Pendiente");
				if (!tarea.completada) {
					html += "<button onclick='lista.completarTarea(" + indice + ")'>Completar</button>";
				}
				html += "<br><button onclick='lista.editarTarea(" + indice + ")'>Modificar</button>";
				html += "</li>";
			})
			html += "</ul>";
			contenedor.innerHTML = html;
		} else {
			contenedor.innerHTML = "No hay tareas";
			return;
		}
	}
	completarTarea(indice) {
		if (indice >= 0 && indice < this.tareas.length) {
			this.tareas[indice].completar();
			lista.guardarTareas();
			this.mostrarTareas();
		} else {
			console.log("Indice inválido");
		}
	}
	editarTarea(indice) {
		if (indice >= 0 && indice < this.tareas.length) {
			const tarea = this.tareas[indice];
			document.getElementById("titulo").value = tarea.titulo;
			document.getElementById("descripcion").value = tarea.descripcion;
			indiceEditando = indice;
			document.getElementById("botonAnadir").textContent = "Guardar";
		} else {
			console.log("Indice inválido");
		}
	}
	guardarTareas() {
		let texto = JSON.stringify(lista);
		localStorage.setItem("tareas", texto);
	}
	recuperarTareas() {
		let datosGuardados = localStorage.getItem("tareas");
		if (!datosGuardados) {
			return;
		}
		let tareasRecuperadas = JSON.parse(datosGuardados).tareas;
		console.log("Tareas recuperadas: ", tareasRecuperadas);
		this.tareas = [];
		tareasRecuperadas.forEach((objeto) => {
			const tarea = new Tarea(objeto.titulo, objeto.descripcion, objeto.completada);
			this.agregarTarea(tarea);
		});
	}
}

let indiceEditando = -1;

const lista = new ListaTareas();

lista.recuperarTareas();
lista.mostrarTareas();
