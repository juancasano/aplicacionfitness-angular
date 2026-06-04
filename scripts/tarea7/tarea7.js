document.getElementById("botonAnadir").onclick = anadirTarea;

function anadirTarea() {
	event.preventDefault();
	const titulo = document.getElementById("titulo").value;
	const descripcion = document.getElementById("descripcion").value;
	const tarea = new Tarea(titulo, descripcion);
	lista.agregarTarea(tarea);
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
		document.getElementById("titulo").value = "";
		document.getElementById("descripcion").value = "";
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
				html += "<br><button onclick='lista.modificarTarea1(" + indice + ")'>Modificar</button>";
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
	modificarTarea1(indice) {
		event.preventDefault();
		const tarea = this.tareas[indice];
		document.getElementById("titulo").value = tarea.titulo;
		document.getElementById("descripcion").value = tarea.descripcion;
		document.getElementById("indice").value = indice;
		document.getElementById("botonAnadir").innerHTML = "Modificar";
		document.getElementById("botonAnadir").onclick = () => lista.modificarTarea2();
	}
	modificarTarea2() {
		event.preventDefault();
		let indice = document.getElementById("indice").value;
		let tarea = this.tareas[indice];
		tarea.titulo = document.getElementById("titulo").value;
		tarea.descripcion = document.getElementById("descripcion").value;
		lista.guardarTareas();
		lista.mostrarTareas();
		document.getElementById("botonAnadir").innerHTML = "Añadir";
		document.getElementById("botonAnadir").onclick = anadirTarea;
		document.getElementById("titulo").value = "";
		document.getElementById("descripcion").value = "";
		document.getElementById("indice").value = "";
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

const lista = new ListaTareas();

lista.recuperarTareas();

if (lista.tareas.length === 0) {
	lista.agregarTarea(new Tarea("Estudiar para el examen", "Repasar todos los apuntes"));
	lista.agregarTarea(new Tarea("Hacer la compra", "Fruta y verdura"));
	lista.agregarTarea(new Tarea("Llamar al medico", "Pedir cita para revision"));
	lista.guardarTareas();
}

lista.mostrarTareas();
