// Ejercicio JS21 - Clase Tarea (versión web)

class Tarea {
  constructor(titulo, descripcion) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.completada = false;
  }

  completar() {
    this.completada = true;
  }

  mostrarInfo() {
    document.getElementById("titulo").innerHTML = "Título: " + this.titulo;
    document.getElementById("descripcion").innerHTML = "Descripción: " + this.descripcion;
    document.getElementById("completada").innerHTML = "Completada: " + this.completada;
  }
}

const tarea = new Tarea("Estudiar JavaScript", "Repasar clases y objetos");

function mostrar() {
  tarea.mostrarInfo();
}

function completar() {
  tarea.completar();
  tarea.mostrarInfo();
}
