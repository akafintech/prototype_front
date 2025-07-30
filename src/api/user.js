const API_BASE_URL =  "http://localhost:8000";

export async function fetchLogin(email, password) {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json().then(data => ({ ok: response.ok, data }));
}

export async function fetchRegister({ email, password, username, phoneNumber, referralCode }) {
  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      username,
      phone_number: phoneNumber,
      referral_code: referralCode,
    }),
  });
  return response.json().then(data => ({ ok: response.ok, data }));
}

export async function fetchMe(token) {
  const response = await fetch(`${API_BASE_URL}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json().then(data => ({ ok: response.ok, data }));
}

export async function fetchUpdateUser(token, userData) {
  const response = await fetch(`${API_BASE_URL}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return response.json().then(data => ({ ok: response.ok, data }));
}