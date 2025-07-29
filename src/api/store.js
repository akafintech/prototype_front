const API_BASE_URL =  "http://localhost:8000";

export async function fetchStores(token) {
  const res = await fetch(`${API_BASE_URL}/store`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
export async function addStore(token, name, businessNumber) {
  const res = await fetch(`${API_BASE_URL}/api/stores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, businessNumber }),
  });
  return res.json();
}
export async function deleteStore(token, id) {
  const res = await fetch(`${API_BASE_URL}/api/stores/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

