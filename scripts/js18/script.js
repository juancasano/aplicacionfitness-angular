// Ejercicio JS18 - Objeto Cuenta Bancaria

let cuenta = {
  titular: "Juan Manuel Casanova",
  saldo: 1000,

  ingresar: function(cantidad) {
    this.saldo += cantidad;
  },

  retirar: function(cantidad) {
    this.saldo -= cantidad;
  },

  mostrarSaldo: function() {
    console.log("Titular: " + this.titular + " | Saldo: " + this.saldo + "€");
  }
};

// Probar los métodos
cuenta.mostrarSaldo();
cuenta.ingresar(500);
cuenta.mostrarSaldo();
cuenta.retirar(200);
cuenta.mostrarSaldo();
