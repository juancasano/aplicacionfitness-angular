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
	completarTarea(indice) {
		if (indice >= 0 && indice < this.tareas.length) {
			this.tareas[indice].completar();
			this.guardarTareas();
			this.mostrarTareas();
		} else {
			console.log("Indice inválido");
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
					html += " <button onclick='lista.completarTarea(" + indice + ")'>Completar</button>";
				}
				html += "</li>";
			})
			html += "</ul>";
			contenedor.innerHTML = html;
		} else {
			contenedor.innerHTML = "No hay tareas";
			return;
		}
	}
	guardarTareas() {
		const texto = JSON.stringify(lista);
		localStorage.setItem("tareas", texto);
	}
	recuperarTareas() {
		const datosGuardados = localStorage.getItem("tareas");
		if (!datosGuardados) {
			return;
		}
		const tareasRecuperadas = JSON.parse(datosGuardados).tareas;
		console.log("Tareas recuperadas: ", tareasRecuperadas);
		this.tareas = [];
		tareasRecuperadas.forEach((objeto) => {
			const tarea = new Tarea(objeto.titulo, objeto.descripcion, objeto.completada);
			this.agregarTarea(tarea);
		});
	}
}

const lista = new ListaTareas();

lista.recuperarTareas();
lista.mostrarTareas();

document.getElementById("btnAgregar").onclick = agregarTarea;

function agregarTarea() {
	event.preventDefault();
	const titulo = document.getElementById("titulo").value;
	const descripcion = document.getElementById("descripcion").value;
	const nueva = new Tarea(titulo, descripcion);
	lista.agregarTarea(nueva);
	lista.guardarTareas();
	lista.mostrarTareas();
}
