// Ejercicio JS19 - Clase Producto

class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  mostrarInfo() {
    console.log("Nombre: " + this.nombre + " | Precio: " + this.precio + "€ | Stock: " + this.stock);
  }

  vender(cantidad) {
    if (cantidad > this.stock) {
      console.log("Stock insuficiente. Stock disponible: " + this.stock);
    } else {
      this.stock -= cantidad;
      console.log("Vendidas " + cantidad + " unidades de " + this.nombre + ". Stock restante: " + this.stock);
    }
  }

  reponer(cantidad) {
    this.stock += cantidad;
    console.log("Reposición de " + cantidad + " unidades de " + this.nombre + ". Stock actual: " + this.stock);
  }
}

// Probar los métodos
const producto = new Producto("Camiseta", 19.99, 10);

producto.mostrarInfo();
producto.vender(3);
producto.mostrarInfo();
producto.vender(20);
producto.reponer(15);
producto.mostrarInfo();
