class Tarea {
	constructor(titulo,descripcion) {
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.completada = false;
	}
	completar() {
		this.completada = true;
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
	mostrarTareas() {
		const contenedor = document.getElementById("lista-tareas");

		if (this.tareas.length > 0) {
			let html = "<ul>";
			this.tareas.forEach((tarea) => {
				html += "<li>" + tarea.titulo + "<br>" + tarea.descripcion;
			})
			html += "</ul>"
			contenedor.innerHTML = html;
		} else {
			contenedor.innerHTML = "No hay tareas";
			return;
		}
	}
}

const lista = new ListaTareas();

const formulario = document.getElementById("formTarea");

formulario.addEventListener("submit", function(e) {
	e.preventDefault();
	const titulo = document.getElementById("titulo").value;
	const descripcion = document.getElementById("descripcion").value;

	const nueva = new Tarea(titulo, descripcion);
	lista.agregarTarea(nueva);
	lista.mostrarTareas();

	formulario.reset();
});
