document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm');
  const rows = document.getElementById('userRows');
  const userId = document.getElementById('userId');

  async function load() {
    try {
      const items = await api.query('users', '?order=id.asc');
      rows.innerHTML = items.map(item => renderRow(item)).join('');
    } catch (err) {
      showError(err.message);
    }
  }

  function renderRow(item) {
    return `
      <tr data-id="${item.id}">
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>
          <button type="button" class="edit" data-id="${item.id}">Editar</button>
          <button type="button" class="delete" data-id="${item.id}">Borrar</button>
        </td>
      </tr>
    `;
  }

  function resetForm() {
    userId.value = '';
    form.reset();
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    clearError();

    const id = userId.value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
      return showError('Nombre y email son obligatorios.');
    }

    try {
      if (id) {
        await api.update('users', id, { name, email });
      } else {
        await api.create('users', { name, email });
      }
      resetForm();
      await load();
    } catch (err) {
      showError(err.message);
    }
  });

  document.getElementById('clearBtn').addEventListener('click', () => {
    resetForm();
    clearError();
  });

  rows.addEventListener('click', async (ev) => {
    const editButton = ev.target.closest('.edit');
    const deleteButton = ev.target.closest('.delete');
    if (editButton) {
      const id = editButton.dataset.id;
      try {
        const [user] = await api.getById('users', id);
        userId.value = user.id;
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        showError(err.message);
      }
      return;
    }
    if (deleteButton) {
      const id = deleteButton.dataset.id;
      if (!confirm('¿Borrar este usuario?')) return;
      try {
        await api.del('users', id);
        await load();
      } catch (err) {
        showError(err.message);
      }
    }
  });

  load();
});
