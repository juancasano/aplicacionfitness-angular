document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('exerciseForm');
  const rows = document.getElementById('exerciseRows');
  const exerciseId = document.getElementById('exerciseId');

  async function load() {
    try {
      const items = await api.query('exercises', '?order=id.asc');
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
        <td>${item.category}</td>
        <td>${item.level || ''}</td>
        <td>${item.description || ''}</td>
        <td>
          <button type="button" class="edit" data-id="${item.id}">Editar</button>
          <button type="button" class="delete" data-id="${item.id}">Borrar</button>
        </td>
      </tr>
    `;
  }

  function resetForm() {
    exerciseId.value = '';
    form.reset();
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    clearError();
    const id = exerciseId.value;
    const name = document.getElementById('name').value.trim();
    const category = document.getElementById('category').value.trim();
    const description = document.getElementById('description').value.trim();
    const level = document.getElementById('level').value.trim();

    if (!name || !category) {
      return showError('Nombre y categoría son obligatorios.');
    }

    try {
      if (id) {
        await api.update('exercises', id, { name, category, description, level });
      } else {
        await api.create('exercises', { name, category, description, level });
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
        const [exercise] = await api.getById('exercises', id);
        exerciseId.value = exercise.id;
        document.getElementById('name').value = exercise.name;
        document.getElementById('category').value = exercise.category;
        document.getElementById('description').value = exercise.description || '';
        document.getElementById('level').value = exercise.level || '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        showError(err.message);
      }
      return;
    }

    if (deleteButton) {
      const id = deleteButton.dataset.id;
      if (!confirm('¿Borrar este ejercicio?')) return;
      try {
        await api.del('exercises', id);
        await load();
      } catch (err) {
        showError(err.message);
      }
    }
  });

  load();
});
