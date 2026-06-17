document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('workoutForm');
  const rows = document.getElementById('workoutRows');
  const workoutId = document.getElementById('workoutId');
  const exercisesSelector = document.getElementById('exercisesSelector');
  const userSelect = document.getElementById('userId');

  let usersMap = {};
  let relationsMap = {};

  async function loadExercises() {
    try {
      const items = await api.query('exercises', '?order=id.asc');
      exercisesSelector.innerHTML = items.map(e => `
        <label><input type="checkbox" value="${e.id}"> ${e.name}</label>
      `).join('');
    } catch (err) {
      showError(err.message);
    }
  }

  async function loadUsers() {
    try {
      const items = await api.query('users', '?order=id.asc');
      usersMap = items.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});
      userSelect.innerHTML = `
        <option value="">Selecciona usuario</option>
        ${items.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
      `;
    } catch (err) {
      showError(err.message);
    }
  }

  async function loadRelations() {
    try {
      const items = await api.query('workout_exercises', '?select=workout_id');
      relationsMap = items.reduce((acc, rel) => {
        acc[rel.workout_id] = (acc[rel.workout_id] || 0) + 1;
        return acc;
      }, {});
    } catch (err) {
      showError(err.message);
    }
  }

  async function loadWorkouts() {
    try {
      const items = await api.query('workouts', '?order=id.asc');
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
        <td>${item.duration} min</td>
        <td>${usersMap[item.user_id] || item.user_id}</td>
        <td>${relationsMap[item.id] || 0}</td>
        <td>
          <button type="button" class="edit" data-id="${item.id}">Editar</button>
          <button type="button" class="delete" data-id="${item.id}">Borrar</button>
        </td>
      </tr>
    `;
  }

  function resetForm() {
    workoutId.value = '';
    form.reset();
    Array.from(exercisesSelector.querySelectorAll('input[type=checkbox]')).forEach(c => c.checked = false);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const id = workoutId.value;
    const name = document.getElementById('name').value.trim();
    const duration = parseInt(document.getElementById('duration').value, 10) || 0;
    const user_id = userSelect.value;
    const selectedExercises = Array.from(exercisesSelector.querySelectorAll('input[type=checkbox]:checked')).map(c => parseInt(c.value, 10));

    if (!name || !duration || !user_id || selectedExercises.length === 0) {
      return showError('Completa nombre, duración, usuario y selecciona al menos un ejercicio.');
    }

    try {
      let workout;
      if (id) {
        const updated = await api.update('workouts', id, { name, duration, user_id });
        workout = updated[0] || { id };
        await api.deleteWhere('workout_exercises', `workout_id=eq.${id}`);
      } else {
        const created = await api.create('workouts', { name, duration, user_id });
        workout = created[0];
      }

      const relations = selectedExercises.map(exercise_id => ({
        workout_id: workout.id,
        exercise_id,
        sets: 3,
        reps: 10
      }));

      if (relations.length) {
        await api.createMany('workout_exercises', relations);
      }
      resetForm();
      await Promise.all([loadRelations(), loadWorkouts()]);
    } catch (err) {
      showError(err.message);
    }
  });

  document.getElementById('clearBtn').addEventListener('click', () => {
    resetForm();
    clearError();
  });

  rows.addEventListener('click', async (e) => {
    const editButton = e.target.closest('.edit');
    const deleteButton = e.target.closest('.delete');
    if (editButton) {
      const id = editButton.dataset.id;
      try {
        const [workout] = await api.getById('workouts', id);
        workoutId.value = workout.id;
        document.getElementById('name').value = workout.name;
        document.getElementById('duration').value = workout.duration;
        userSelect.value = workout.user_id;
        Array.from(exercisesSelector.querySelectorAll('input[type=checkbox]')).forEach(c => c.checked = false);
        const relations = await api.query('workout_exercises', `?workout_id=eq.${id}&select=exercise_id`);
        relations.forEach(rel => {
          const checkbox = exercisesSelector.querySelector(`input[value="${rel.exercise_id}"]`);
          if (checkbox) checkbox.checked = true;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        showError(err.message);
      }
      return;
    }
    if (deleteButton) {
      const id = deleteButton.dataset.id;
      if (!confirm('¿Borrar este entrenamiento?')) return;
      try {
        await api.del('workouts', id);
        await api.deleteWhere('workout_exercises', `workout_id=eq.${id}`);
        await Promise.all([loadRelations(), loadWorkouts()]);
      } catch (err) {
        showError(err.message);
      }
    }
  });

  Promise.all([loadExercises(), loadUsers(), loadRelations()]).then(loadWorkouts);
});
