// Helpers UI básicos
function showError(msg) {
  const d = document.getElementById('errorDiv');
  if (d) d.textContent = msg;
  console.error(msg);
}

function clearError() {
  const d = document.getElementById('errorDiv');
  if (d) d.textContent = '';
}
