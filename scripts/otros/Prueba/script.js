// Clase Tarea - array con forEach y función flecha

class Tarea {
  constructor(titulo, descripcion) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.completada = false;
  }

  completar() {
    this.completada = true;
    console.log("Tarea \"" + this.titulo + "\" marcada como completada.");
  }

  mostrarInfo() {
    console.log("Título: " + this.titulo);
    console.log("Descripción: " + this.descripcion);
    console.log("Completada: " + (this.completada ? "Sí" : "No"));
    console.log("---");
  }
}

const tareas = [];

tareas.push(new Tarea("Estudiar JavaScript", "Repasar clases y objetos"));
tareas.push(new Tarea("Hacer ejercicio", "Salir a correr 30 minutos"));
tareas.push(new Tarea("Leer un libro", "Leer al menos 20 páginas"));

tareas.forEach(tarea => tarea.mostrarInfo());
