document.getElementById("btnAgregar").onclick = agregarTarea;

function agregarTarea() {
	event.preventDefault();
	const titulo = document.getElementById("titulo").value;
	const descripcion = document.getElementById("descripcion").value;
	const tarea = new Tarea(titulo, descripcion);
	lista.agregarTarea(tarea);
	lista.mostrarTareas();
}

class Tarea {
	constructor(titulo,descripcion) {
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.completada = false;
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
				html += "</li>";
			})
			html += "</ul>"
			contenedor.innerHTML = html;
		} else {
			contenedor.innerHTML = "No hay tareas";
			return;
		}
	}
	completarTarea(indice) {
		if (indice >= 0 && indice < this.tareas.length) {
			this.tareas[indice].completar();
			this.mostrarTareas();
		} else {
			console.log("Indice inválido");
		}
	}
}

const lista = new ListaTareas();

lista.agregarTarea(new Tarea("Estudiar para el examen", "Repasar todos los apuntes"));
lista.agregarTarea(new Tarea("Hacer la compra", "Fruta y verdura"));
lista.agregarTarea(new Tarea("Llamar al medico", "Pedir cita para revision"));

lista.mostrarTareas();
