const API_BASE_URL =  "http://localhost:8000";

export async function fetchRecommend(token,storename,username,rating) {
  const res = await fetch(`${API_BASE_URL}/recommend/create`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({
      storename,
      rating,
      username
    }),
  });
  return res.json();
}

