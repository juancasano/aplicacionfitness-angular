class Pendiente {
	constructor(nombre, detalle) {
		this.nombre = nombre;
		this.detalle = detalle;
		this.hecha = false;
	}
	finalizar() {
		this.hecha = true;
		console.log("Pendiente finalizado");
	}
	imprimir() {
		console.log("Pendiente: " + this.nombre);
		console.log("Detalle: " + this.detalle);
		console.log("Hecha: " + (this.hecha ? "Si" : "No"));
	}
}
class Agenda {
	constructor() {
		this.pendientes = [];
	}
	agregar(pendiente) {
		this.pendientes.push(pendiente);
		console.log("Pendiente agregado");
	}
	verTodo() {
		if (this.pendientes.length > 0) {
			console.log("Mis pendientes:");
			for (let i = 0; i < this.pendientes.length; i++) {
				this.pendientes[i].imprimir();
			}
		} else {
			console.log("No hay pendientes");
		}
	}
}

const miAgenda = new Agenda();

miAgenda.agregar(new Pendiente("Estudiar JS", "Repasar clases y objetos"));
miAgenda.agregar(new Pendiente("Hacer ejercicio", "Salir a correr 30 minutos"));
miAgenda.agregar(new Pendiente("Leer", "Capitulo 5 del libro"));

miAgenda.verTodo();
