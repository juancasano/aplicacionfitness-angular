function initMap() {
// Coordenadas de Gran Vía 800, 08013
const lat = 41.3902;
const lon = 2.1540;
const pre = 50; // Precisión simulada en metros

document.getElementById("latitud").innerHTML = lat.toFixed(4);
document.getElementById("longitud").innerHTML = lon.toFixed(4);
document.getElementById("precision").innerHTML = pre + " metros";

const mapa = L.map("mapa").setView([lat, lon], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
attribution: "&copy; OpenStreetMap contributors"
}).addTo(mapa);

L.marker([lat, lon])
.addTo(mapa)
.bindPopup("Gran Vía 800, 08013")
.openPopup();

L.circle([lat, lon], {
radius: pre
}).addTo(mapa);
}