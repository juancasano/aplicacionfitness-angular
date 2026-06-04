// Ejercicio JS20 - Clase Tarea

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
    console.log("Completada: " + this.completada);
  }
}

// Probar los métodos
const tarea = new Tarea("Estudiar JavaScript", "Repasar clases y objetos");

tarea.mostrarInfo();
tarea.completar();
tarea.mostrarInfo();
