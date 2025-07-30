const API_BASE_URL =  "http://localhost:8000";

export async function fetchStores(token) {
  const res = await fetch(`${API_BASE_URL}/store/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
export async function addStore(token, name, businessNumber) {
  const res = await fetch(`${API_BASE_URL}/store/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      name, 
      business_number:businessNumber 
    }),
  });
  console.log("Add store res:",res);
  return res.json().then(data => ({ ok: res.ok, data }));
}
export async function deleteStore(token, id) {
  const res = await fetch(`${API_BASE_URL}/store/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(`Delete store response: ${res}`);
  return res.ok;
}

