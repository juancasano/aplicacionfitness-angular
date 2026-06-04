// ===== CONFIGURACIÓN =====
const SUPABASE_URL = "https://owifsktslpiefgboaeul.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93aWZza3RzbHBpZWZnYm9hZXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDQ3ODgsImV4cCI6MjA5NTk4MDc4OH0.t33q07MyHy1qSpRX9SBOOxyn_nEe-LpKwACt-jElJ14";

const API_ANIMALES = `${SUPABASE_URL}/rest/v1/Animales`;
const API_DUENOS = `${SUPABASE_URL}/rest/v1/Duenos`;

const HEADERS = {
	"apikey": SUPABASE_KEY,
	"Authorization": `Bearer ${SUPABASE_KEY}`,
	"Content-Type": "application/json"
};

// ===== ESTADO =====
let animales = [];
let duenos = [];

window.onload = async function() {
	await leerDuenos();
	await leerAnimales();
};

// =========================
//  CRUD ANIMALES
// =========================

async function leerAnimales() {
	try {
		const url = `${API_ANIMALES}?select=*,Duenos(nombre,apellidos)&order=id.asc`;
		const response = await fetch(url, { headers: HEADERS });
		animales = await response.json();
		console.log("Animales:", animales);
		rellenarSelectEspecies();
		rellenarSelectColores();
		imprimirAnimales();
		imprimirDuenos();
	} catch (error) {
		console.error("Error al leer animales:", error);
	}
}

const EMOJIS_ESPECIE = {
	"perro": "🐶",
	"gato": "🐱",
	"pájaro": "🦜",
	"pajaro": "🦜",
	"conejo": "🐰",
	"hámster": "🐹",
	"hamster": "🐹",
	"pez": "🐟",
	"caballo": "🐴",
	"tortuga": "🐢",
	"reptil": "🦎"
};

function emojiDe(especie) {
	if (!especie) return "🐾";
	return EMOJIS_ESPECIE[especie.toLowerCase()] || "🐾";
}

function claseEspecie(especie) {
	if (!especie) return "";
	return "tarjeta-" + especie.toLowerCase()
		.normalize("NFD").replace(/[̀-ͯ]/g, "")
		.replace(/\s+/g, "-");
}

function imprimirAnimales(lista = animales) {
	const listado = document.getElementById("listadoAnimales");
	listado.innerHTML = lista.map((a) => {
		const dueno = a.Duenos ? `${a.Duenos.nombre} ${a.Duenos.apellidos}` : "(sin dueño)";
		const badgeEster = a.esterilizado
			? '<span class="badge badge-si">Sí</span>'
			: '<span class="badge badge-no">No</span>';
		return `
			<div class="tarjeta ${claseEspecie(a.especie)}">
				<div class="tarjeta-titulo">
					<span class="emoji-especie">${emojiDe(a.especie)}</span>${a.nombre}
				</div>
				<div class="tarjeta-subtitulo">${a.especie} · ${a.raza}</div>
				<div class="tarjeta-dato"><strong>Edad:</strong> ${a.edad ?? "?"} años</div>
				<div class="tarjeta-dato"><strong>Peso:</strong> ${a.peso_kg ?? "?"} kg</div>
				<div class="tarjeta-dato"><strong>Color:</strong> ${a.color ?? "?"}</div>
				<div class="tarjeta-dato"><strong>Chip:</strong> ${a.identificador}</div>
				<div class="tarjeta-dato"><strong>Esterilizado:</strong> ${badgeEster}</div>
				<div class="tarjeta-dueno">👤 Dueño: <strong>${dueno}</strong></div>
				<div class="tarjeta-acciones">
					<button class="btn-modificar" onclick="modificarAnimal1(${a.id})">Modificar</button>
					<button class="btn-borrar" onclick="borrarAnimal(${a.id})">Borrar</button>
				</div>
			</div>
		`;
	}).join("");
}

async function crearAnimal() {
	const nuevo = leerFormulario();

	try {
		const response = await fetch(API_ANIMALES, {
			method: "POST",
			headers: { ...HEADERS, "Prefer": "return=representation" },
			body: JSON.stringify(nuevo)
		});
		const data = await response.json();
		console.log("Animal creado:", data);
		limpiarFormulario();
		await leerAnimales();
	} catch (error) {
		console.error("Error al crear:", error);
	}
}

async function borrarAnimal(id) {
	if (!confirm("¿Seguro que quieres borrar este animal?")) return;

	try {
		await fetch(`${API_ANIMALES}?id=eq.${id}`, {
			method: "DELETE",
			headers: HEADERS
		});
		await leerAnimales();
	} catch (error) {
		console.error("Error al borrar:", error);
	}
}

function modificarAnimal1(id) {
	const a = animales.find((animal) => animal.id == id);
	if (!a) return;

	document.getElementById("idAnimal").value = a.id;
	document.getElementById("nombre").value = a.nombre ?? "";
	document.getElementById("especie").value = a.especie ?? "";
	document.getElementById("raza").value = a.raza ?? "";
	document.getElementById("identificador").value = a.identificador ?? "";
	document.getElementById("edad").value = a.edad ?? "";
	document.getElementById("peso_kg").value = a.peso_kg ?? "";
	document.getElementById("color").value = a.color ?? "";
	document.getElementById("esterilizado").checked = !!a.esterilizado;
	document.getElementById("dueno_id").value = a.dueno_id ?? "";

	document.getElementById("botonCrear").style.display = "none";
	document.getElementById("botonModificar").style.display = "inline-block";
}

async function modificarAnimal2() {
	const id = document.getElementById("idAnimal").value;
	const cambios = leerFormulario();

	try {
		const res = await fetch(`${API_ANIMALES}?id=eq.${id}`, {
			method: "PATCH",
			headers: HEADERS,
			body: JSON.stringify(cambios)
		});
		if (!res.ok) throw new Error(await res.text());

		document.getElementById("botonCrear").style.display = "inline-block";
		document.getElementById("botonModificar").style.display = "none";
		limpiarFormulario();
		await leerAnimales();
	} catch (error) {
		console.error("Error al modificar:", error);
	}
}

// =========================
//  SELECTS DE ESPECIE Y COLOR (valores existentes)
// =========================

function rellenarSelect(idSelect, valores, textoVacio) {
	const select = document.getElementById(idSelect);
	const seleccionActual = select.value;
	select.innerHTML = `<option value="">${textoVacio}</option>`;
	for (const v of valores) {
		const option = document.createElement("option");
		option.value = v;
		option.textContent = v;
		select.appendChild(option);
	}
	select.value = seleccionActual; // conservar la selección si sigue existiendo
}

function rellenarSelectEspecies() {
	const especies = [...new Set(animales.map((a) => a.especie).filter(Boolean))].sort();
	rellenarSelect("especie", especies, "(elige especie)");
}

function rellenarSelectColores() {
	const colores = [...new Set(animales.map((a) => a.color).filter(Boolean))].sort();
	rellenarSelect("color", colores, "(elige color)");
}

// =========================
//  BUSCAR (filtro local sobre el array ya cargado)
// =========================

function buscar() {
	const q = document.getElementById("busqueda").value.toLowerCase().trim();
	if (!q) {
		imprimirAnimales(animales);
		return;
	}
	const filtrados = animales.filter((a) => {
		const dueno = a.Duenos ? `${a.Duenos.nombre} ${a.Duenos.apellidos}` : "";
		return [a.nombre, a.especie, a.raza, a.color, a.identificador, dueno]
			.some((campo) => (campo ?? "").toLowerCase().includes(q));
	});
	imprimirAnimales(filtrados);
}

// =========================
//  HELPERS DE FORMULARIO
// =========================

function leerFormulario() {
	const edadStr = document.getElementById("edad").value;
	const pesoStr = document.getElementById("peso_kg").value;
	const duenoStr = document.getElementById("dueno_id").value;

	return {
		nombre: document.getElementById("nombre").value,
		especie: document.getElementById("especie").value,
		raza: document.getElementById("raza").value,
		identificador: document.getElementById("identificador").value,
		edad: edadStr === "" ? null : parseInt(edadStr),
		peso_kg: pesoStr === "" ? null : parseFloat(pesoStr),
		color: document.getElementById("color").value || null,
		esterilizado: document.getElementById("esterilizado").checked,
		dueno_id: duenoStr === "" ? null : parseInt(duenoStr)
	};
}

function limpiarFormulario() {
	document.getElementById("idAnimal").value = "";
	document.getElementById("nombre").value = "";
	document.getElementById("especie").value = "";
	document.getElementById("raza").value = "";
	document.getElementById("identificador").value = "";
	document.getElementById("edad").value = "";
	document.getElementById("peso_kg").value = "";
	document.getElementById("color").value = "";
	document.getElementById("esterilizado").checked = false;
	document.getElementById("dueno_id").value = "";
}

// =========================
//  DUEÑOS
// =========================

async function leerDuenos() {
	try {
		const response = await fetch(`${API_DUENOS}?select=*&order=id.asc`, { headers: HEADERS });
		duenos = await response.json();
		console.log("Dueños:", duenos);
		rellenarSelectDuenos();
		imprimirDuenos();
	} catch (error) {
		console.error("Error al leer dueños:", error);
	}
}

function rellenarSelectDuenos() {
	const select = document.getElementById("dueno_id");
	// Quitar opciones excepto la primera (sin dueño)
	select.innerHTML = '<option value="">(sin dueño)</option>';
	for (const d of duenos) {
		const option = document.createElement("option");
		option.value = d.id;
		option.textContent = `${d.nombre} ${d.apellidos}`;
		select.appendChild(option);
	}
}

function imprimirDuenos() {
	const cont = document.getElementById("listadoDuenos");
	cont.innerHTML = duenos.map((d) => {
		const animalesDelDueno = animales.filter((a) => a.dueno_id === d.id);
		const lista = animalesDelDueno.length > 0
			? animalesDelDueno.map((a) => `
				<div class="animal-mini">
					<span>${emojiDe(a.especie)} ${a.nombre}</span>
					<button class="btn-mini-modificar" onclick="modificarAnimal1(${a.id})">Modificar</button>
					<button class="btn-mini-borrar" onclick="borrarAnimal(${a.id})">Borrar</button>
				</div>
			`).join("")
			: "<em>ningún animal</em>";
		const claseSexo = d.sexo === "F" ? "tarjeta-dueno-f" : d.sexo === "M" ? "tarjeta-dueno-m" : "";
		const iconoSexo = d.sexo === "F" ? "👩" : d.sexo === "M" ? "👨" : "👤";
		return `
			<div class="tarjeta ${claseSexo}">
				<div class="tarjeta-titulo">${iconoSexo} ${d.nombre} ${d.apellidos}</div>
				<div class="tarjeta-subtitulo">DNI: ${d.dni ?? "?"}</div>
				<div class="tarjeta-dato">📞 ${d.telefono ?? "?"}</div>
				<div class="tarjeta-dato">✉️ ${d.email ?? "?"}</div>
				<div class="tarjeta-dueno">
					<div class="lista-animales-dueno">${lista}</div>
				</div>
			</div>
		`;
	}).join("");
}
