function aumentar() {
	nodoH1 = document.getElementsByTagName("h1")[0];
	tamanyH1 = window.getComputedStyle(nodoH1, null).getPropertyValue("font-size");
    nodoH1.style.fontSize = (parseInt(tamanyH1) + 2) + "px";

	nodoBody = document.getElementsByTagName("body")[0];
	tamanyBody = window.getComputedStyle(nodoBody, null).getPropertyValue("font-size");
	nodoBody.style.fontSize = (parseInt(tamanyBody) + 2) + "px";
}

function disminuir() {
	nodoH1 = document.getElementsByTagName("h1")[0];
	tamanyH1 = window.getComputedStyle(nodoH1, null).getPropertyValue("font-size");
    nodoH1.style.fontSize = (parseInt(tamanyH1) - 2) + "px";

	nodoBody = document.getElementsByTagName("body")[0];
	tamanyBody = window.getComputedStyle(nodoBody, null).getPropertyValue("font-size");
	nodoBody.style.fontSize = (parseInt(tamanyBody) - 2) + "px";
}