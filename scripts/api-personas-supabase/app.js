// ===== CONFIGURACIÓN =====
const SUPABASE_URL = "https://owifsktslpiefgboaeul.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93aWZza3RzbHBpZWZnYm9hZXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDQ3ODgsImV4cCI6MjA5NTk4MDc4OH0.t33q07MyHy1qSpRX9SBOOxyn_nEe-LpKwACt-jElJ14";

const API = `${SUPABASE_URL}/rest/v1/Personas`;

const HEADERS = {
	"apikey": SUPABASE_KEY,
	"Authorization": `Bearer ${SUPABASE_KEY}`,
	"Content-Type": "application/json"
};

// ===== ESTADO =====
let personas = [];

window.onload = function() {
	leerPersonas();
};

// ===== CLASE PERSONA =====
class Persona {
	constructor(id, nombre, apellido1, apellido2, dni) {
		this.id = id;
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		this.dni = dni;
	}

	nombreCompleto() {
		return `${this.nombre} ${this.apellido1} ${this.apellido2 ?? ""}`.trim();
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

// ===== LEER (GET) =====
async function leerPersonas() {
	try {
		const res = await fetch(`${API}?select=*&order=apellido1.asc,apellido2.asc`, {
			headers: HEADERS
		});
		if (!res.ok) throw new Error(await res.text());
		const data = await res.json();
		personas = data.map((p) => new Persona(p.id, p.nombre, p.apellido1, p.apellido2, p.dni));
		console.log("Personas cargadas:", personas);
		imprimirPersonas(personas);
	} catch (error) {
		console.error("Error al leer:", error);
	}
}

function imprimirPersonas(lista) {
	const cont = document.getElementById("listadoPersonas");
	document.getElementById("contador").textContent = lista.length;

	if (lista.length === 0) {
		cont.innerHTML = "<p>No hay personas que mostrar.</p>";
		return;
	}

	cont.innerHTML = lista.map((p) => `
		<div class="tarjeta">
			<div class="tarjeta-cabecera">
				<div class="avatar" style="background:${colorAvatar(p.nombre + p.apellido1)}">${iniciales(p)}</div>
				<div>
					<div class="tarjeta-nombre">${p.nombre}</div>
					<div class="tarjeta-apellidos">${p.apellido1} ${p.apellido2 ?? ""}</div>
				</div>
			</div>
			<div class="tarjeta-dni">DNI: ${p.dni}</div>
			<div class="tarjeta-acciones">
				<button class="btn-modificar" onclick="modificarPersona1(${p.id})">Modificar</button>
				<button class="btn-borrar" onclick="borrarPersona(${p.id})">Borrar</button>
			</div>
		</div>
	`).join("");
}

// Iniciales (nombre + primer apellido) para el avatar
function iniciales(p) {
	const a = (p.nombre || "").trim()[0] ?? "";
	const b = (p.apellido1 || "").trim()[0] ?? "";
	return (a + b).toUpperCase();
}

// Color de avatar determinista a partir del texto (degradado)
function colorAvatar(texto) {
	let hash = 0;
	for (let i = 0; i < texto.length; i++) {
		hash = texto.charCodeAt(i) + ((hash << 5) - hash);
	}
	const h = Math.abs(hash) % 360;
	return `linear-gradient(135deg, hsl(${h}, 70%, 55%), hsl(${(h + 40) % 360}, 70%, 45%))`;
}

// ===== CREAR (POST) =====
async function crearPersona() {
	const nombre = document.getElementById("nombre").value.trim();
	const apellido1 = document.getElementById("apellido1").value.trim();
	const apellido2 = document.getElementById("apellido2").value.trim();
	const dni = document.getElementById("dni").value.trim();

	if (!nombre || !apellido1 || !dni) {
		alert("Nombre, primer apellido y DNI son obligatorios");
		return;
	}

	const persona = new Persona(null, nombre, apellido1, apellido2, dni);

	try {
		const res = await fetch(API, {
			method: "POST",
			headers: {
				...HEADERS,
				"Prefer": "return=representation"
			},
			body: JSON.stringify([persona.toJSON()])
		});
		if (!res.ok) throw new Error(await res.text());
		const creada = await res.json();
		console.log("Persona creada:", creada);
		limpiarFormulario();
		await leerPersonas();
	} catch (error) {
		console.error("Error al crear:", error);
		alert("No se pudo crear: " + error.message);
	}
}

// ===== BORRAR (DELETE) =====
async function borrarPersona(id) {
	if (!confirm("¿Seguro que quieres borrar esta persona?")) return;

	try {
		const res = await fetch(`${API}?id=eq.${id}`, {
			method: "DELETE",
			headers: HEADERS
		});
		if (!res.ok) throw new Error(await res.text());
		console.log("Persona borrada, id:", id);
		await leerPersonas();
	} catch (error) {
		console.error("Error al borrar:", error);
	}
}

// ===== MODIFICAR — paso 1 (rellenar formulario) =====
function modificarPersona1(id) {
	const p = personas.find((per) => per.id == id);
	if (!p) return;

	document.getElementById("idPersona").value = p.id;
	document.getElementById("nombre").value = p.nombre;
	document.getElementById("apellido1").value = p.apellido1;
	document.getElementById("apellido2").value = p.apellido2 ?? "";
	document.getElementById("dni").value = p.dni;

	document.getElementById("botonCrear").style.display = "none";
	document.getElementById("botonModificar").style.display = "inline-block";
}

// ===== MODIFICAR — paso 2 (PATCH) =====
async function modificarPersona2() {
	const id = document.getElementById("idPersona").value;
	const cambios = {
		nombre: document.getElementById("nombre").value.trim(),
		apellido1: document.getElementById("apellido1").value.trim(),
		apellido2: document.getElementById("apellido2").value.trim(),
		dni: document.getElementById("dni").value.trim()
	};

	try {
		const res = await fetch(`${API}?id=eq.${id}`, {
			method: "PATCH",
			headers: HEADERS,
			body: JSON.stringify(cambios)
		});
		if (!res.ok) throw new Error(await res.text());
		console.log("Persona actualizada, id:", id);

		limpiarFormulario();
		document.getElementById("botonCrear").style.display = "inline-block";
		document.getElementById("botonModificar").style.display = "none";

		await leerPersonas();
	} catch (error) {
		console.error("Error al modificar:", error);
		alert("No se pudo modificar: " + error.message);
	}
}

// ===== BUSCAR (filtro local sobre el array ya cargado) =====
function buscar() {
	const q = document.getElementById("busqueda").value.toLowerCase().trim();
	if (!q) {
		imprimirPersonas(personas);
		return;
	}
	const filtradas = personas.filter((p) =>
		p.nombre.toLowerCase().includes(q) ||
		p.apellido1.toLowerCase().includes(q) ||
		(p.apellido2 ?? "").toLowerCase().includes(q) ||
		p.dni.toLowerCase().includes(q)
	);
	imprimirPersonas(filtradas);
}

// ===== HELPERS =====
function limpiarFormulario() {
	document.getElementById("idPersona").value = "";
	document.getElementById("nombre").value = "";
	document.getElementById("apellido1").value = "";
	document.getElementById("apellido2").value = "";
	document.getElementById("dni").value = "";
}
