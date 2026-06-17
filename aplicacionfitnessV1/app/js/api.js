// Funciones genéricas para acceder a la REST API
async function apiFetch(path, options = {}) {
  const headers = Object.assign({
    'Content-Type': 'application/json',
    'apikey': API_KEY,
    'Authorization': `Bearer ${API_KEY}`
  }, options.headers || {});
  const res = await fetch(`${BASE_URL}/${path}`, Object.assign({}, options, { headers }));
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

const api = {
  getAll: (table) => apiFetch(`${table}`),
  getById: (table, id) => apiFetch(`${table}?id=eq.${id}`),
  query: (table, params) => apiFetch(`${table}${params}`),
  create: (table, data) => apiFetch(`${table}`, { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(data) }),
  createMany: async (table, items) => {
    if (!items.length) return [];
    return apiFetch(`${table}`, { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(items) });
  },
  update: (table, id, data) => apiFetch(`${table}?id=eq.${id}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify(data) }),
  del: (table, id) => apiFetch(`${table}?id=eq.${id}`, { method: 'DELETE' }),
  deleteWhere: (table, filter) => apiFetch(`${table}?${filter}`, { method: 'DELETE' })
};
