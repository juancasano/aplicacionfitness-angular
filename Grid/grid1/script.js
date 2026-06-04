const modals = [
  { color: '#5cb85c', title: 'Modal 01 — Verde', desc: 'Contenido del modal número uno. Grid mobile-first: 2 columnas en móvil, 4 en escritorio.' },
  { color: '#d9534f', title: 'Modal 02 — Rojo',  desc: 'Contenido del modal número dos. El breakpoint de cambio está en 480px.' },
  { color: '#0275d8', title: 'Modal 03 — Azul',  desc: 'Contenido del modal número tres. Cada círculo mantiene proporción 1:1 con aspect-ratio.' },
  { color: '#111',    title: 'Modal 04 — Negro', desc: 'Contenido del modal número cuatro. Ciérralo con Esc o haciendo clic fuera.' },
];

const overlay = document.getElementById('overlay');

function openModal(i) {
  const m = modals[i];
  document.getElementById('modal-dot').style.background = m.color;
  document.getElementById('modal-title').textContent   = m.title;
  document.getElementById('modal-desc').textContent    = m.desc;
  overlay.classList.add('active');
}

function closeModal() {
  overlay.classList.remove('active');
}

function handleOverlayClick(e) {
  if (e.target === overlay) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
