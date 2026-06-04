const API_URL = "https://borjamulleras.com/pimec/personas.php";

document.getElementById("botonAnadir").onclick = anadirPersona;
function anadirPersona() {
	//Interrumpir el evento por defecto
	event.preventDefault();
	const nombre = document.getElementById("nombre").value;
	const apellido1 = document.getElementById("apellido1").value;
	const apellido2 = document.getElementById("apellido2").value;
	const dni = document.getElementById("dni").value;
    const persona = new Persona(nombre,apellido1,apellido2,dni);
	lista.agregarPersona(persona);
}




class Persona{
	constructor(nombre, apellido1, apellido2, dni) {
    	this.nombre = nombre;
    	this.apellido1 = apellido1;
    	this.apellido2 = apellido2;
    	this.dni = dni;
    }

  	nombreCompleto() {
    	return this.nombre + " " + this.apellido1 + " " + this.apellido2;
  	}
	mostrarDatos() {
		return this.nombre + " " +
		       this.apellido1 + " " +
		       this.apellido2 + "<br>" +
		       this.dni;
	}
  	toJSON() {
    	return {
      		nombre: this.nombre,
      		apellido1: this.apellido1,
      		apellido2: this.apellido2,
      		dni: this.dni
    	};
  	}
}
class ListaPersonas {
	constructor() {
		this.personas = [];
	}
	recuperarPersonas() {
		fetch(API_URL)
		.then((response) => response.json())
		.then((personasRecuperadas) => {
			console.log(personasRecuperadas);
			this.personas =
			         personasRecuperadas.map((p) => new Persona(
			         		p.nombre,
			         		p.apellido1,
			         		p.apellido2,
			         		p.dni)
			         );
			this.mostrarPersonasOrdenadas();
			console.log(this.personas);

		})
		.catch((error) => console.log(error)
		);
	}
	mostrarPersonasOrdenadas() {
		console.log(this.personas);
		const contenedor = document.getElementById("listadoPersonas");

		const personasOrdenadas = [...this.personas]
									.sort((a,b) =>a.apellido1.localeCompare(b.apellido1,"es"))
									.map((persona) => {
										console.log(persona);
										return persona.mostrarDatos()+
											   "<br><button onclick='lista.modificarPersona1(" + persona.id + ")'>Modificar</button>" +
											   "<br><button onclick='lista.borrarPersona(" + persona.id + ")'>Borrar</button><hr>";
									}).join("");
		//console.log("Personas",this.personas);
		//console.log("Personas ordenadas",personasOrdenadas);
		contenedor.innerHTML = personasOrdenadas;
	}
	agregarPersona(persona) {
		fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(persona.toJSON())
		})
		.then((response) => response.json())
		.then(() => {
			this.recuperarPersonas();
		})
		.catch((error) => console.log(error));
	}
}
const lista = new ListaPersonas();
lista.recuperarPersonas();
//lista.mostrarPersonasOrdenadas();
