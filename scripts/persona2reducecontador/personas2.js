document.getElementById("botonAnadir").onclick = anadirPersona;
function anadirPersona() {
	//Interrumpir el evento por defecto
	event.preventDefault();
	const nombre = document.getElementById("nombre").value;
	const apellido1 = document.getElementById("apellido1").value;
	const apellido2 = document.getElementById("apellido2").value;
	const genero = document.getElementById("genero").value;
    const persona = new Persona(nombre,apellido1,apellido2,genero);
	lista.agregarPersona(persona);
	lista.guardarPersonas();
	lista.mostrarPersonasOrdenadas();
}


class Persona {
	constructor(nombre,apellido1,apellido2,genero) {
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		this.genero = genero;
	}
	mostrarDatos() {
		return this.nombre + " " + 
		       this.apellido1 + " " + 
		       this.apellido2 + "<br>" + 
		       this.genero;	
	}
}
class ListaPersonas {
	constructor() {
		this.personas = [];	
	}
	agregarPersona(persona) {
		this.personas.push(persona);
		console.log("Persona agregada");	
		this.borrarFormulario();
	}
	borrarFormulario() {
		document.getElementById("nombre").value = "";	
		document.getElementById("apellido1").value = "";	
		document.getElementById("apellido2").value = "";
		document.getElementById("genero").value = "";
	}
	/*mostrarPersonas() {
		const contenedor = document.getElementById("lista-personas");

		if (this.personas.length > 0) {
			let html = "";
			this.personas.forEach((persona,indice) => {
				html += persona.mostrarDatos();
				html += "<br><button onclick='lista.modificarPersona1(" + indice + ")'>Modificar</button>";
				html += "<br><button onclick='lista.borrarPersona(" + indice + ")'>Borrar</button>";
				html += "<hr>";
			})
			contenedor.innerHTML = html;
		} else {
			contenedor.innerHTML = "No hay personas";
			return;
		}
			
	}*/
	mostrarPersonasOrdenadas() {
		const contenedor = document.getElementById("lista-personas-ordenadas");
		const personasOrdenadas = [...this.personas]
									.sort((a,b) =>a.apellido1.localeCompare(b.apellido1,"es") ||
                                                  a.apellido2.localeCompare(b.apellido2,"es") ||
                                                  a.nombre.localeCompare(b.nombre,"es"))
									.map((persona) => {
										const indice = this.personas.indexOf(persona);
										return persona.mostrarDatos()+
											   "<br><button onclick='lista.modificarPersona1(" + indice + ")'>Modificar</button>" +
											   "<br><button onclick='lista.borrarPersona(" + indice + ")'>Borrar</button><hr>";
									}).join("");									
		//console.log("Personas",this.personas);								
		//console.log("Personas ordenadas",personasOrdenadas);
		contenedor.innerHTML = personasOrdenadas;
	}
	guardarPersonas() {
		let texto = JSON.stringify(lista);
		localStorage.setItem("personas",texto);
	}
	recuperarPersonas() {
	    let datosGuardados = localStorage.getItem("personas");
	    if (!datosGuardados) {
		    return;
	    }
	    let personasRecuperadas = JSON.parse(datosGuardados).personas;
	    console.log("Personas recuperadas: ",personasRecuperadas);
	    this.personas = [];	
	    personasRecuperadas.forEach((objeto) => {
		    const persona = new Persona(objeto.nombre,
		    	 						objeto.apellido1,
		    	 						objeto.apellido2,
		    	 						objeto.genero);

		    this.agregarPersona(persona);
	    });
	}
	modificarPersona1(indice) {
		event.preventDefault();
		const persona = this.personas[indice];
		document.getElementById("nombre").value = persona.nombre;
		document.getElementById("apellido1").value = persona.apellido1;
		document.getElementById("apellido2").value = persona.apellido2;
		document.getElementById("genero").value = persona.genero;
		document.getElementById("indice").value = indice;
		document.getElementById("botonAnadir").innerHTML = "Modificar";
		document.getElementById("botonAnadir").onclick = () => lista.modificarPersona2();
	}
	modificarPersona2() {
		event.preventDefault();
		let indice = document.getElementById("indice").value;
		let persona = this.personas[indice];
		persona.nombre = document.getElementById("nombre").value;
		persona.apellido1 = document.getElementById("apellido1").value;
		persona.apellido2 = document.getElementById("apellido2").value;
		persona.genero = document.getElementById("genero").value;
		lista.guardarPersonas();
		lista.mostrarPersonasOrdenadas();
		document.getElementById("botonAnadir").innerHTML = "Añadir";
		document.getElementById("botonAnadir").onclick = anadirPersona;
		document.getElementById("indice").value = "";
		this.borrarFormulario();
	}
	borrarPersona(indice) {
		//delete(this.tareas[indice]);
		this.personas.splice(indice,1);
		lista.guardarPersonas();
		lista.mostrarPersonasOrdenadas();
	}
	buscarPersonas() {
		const contenedor = document.getElementById("lista-personas-ordenadas");
		const busqueda = document.getElementById("buscador").value.toLowerCase();
		const personasFiltradas = this.personas.filter(p => 
							p.apellido1.toLowerCase().includes(busqueda) ||
							p.apellido2.toLowerCase().includes(busqueda) ||
							p.nombre.toLowerCase().includes(busqueda));	
		console.log(personasFiltradas);	
		const personasFiltradas2 =[...personasFiltradas]
									.sort((a,b) =>a.apellido1.localeCompare(b.apellido1,"es") ||
                                                  a.apellido2.localeCompare(b.apellido2,"es") ||
                                                  a.nombre.localeCompare(b.nombre,"es"))
									.map((persona) => {
										const indice = this.personas.indexOf(persona);
										return persona.mostrarDatos()+
											   "<br><button onclick='lista.modificarPersona1(" + indice + ")'>Modificar</button>" +
											   "<br><button onclick='lista.borrarPersona(" + indice + ")'>Borrar</button><hr>";
									})
									//.join("");	
									.reduce((acumulador,elemento) => {
										acumulador.contador++;
										acumulador.html += elemento;
										return acumulador;
									},{html:"",contador:0});
		contenedor.innerHTML = "Hay "+personasFiltradas2.contador+" personas encontradas<br>";							
		contenedor.innerHTML += personasFiltradas2.html;
	}
}

const lista = new ListaPersonas();
lista.recuperarPersonas();
lista.mostrarPersonasOrdenadas();








