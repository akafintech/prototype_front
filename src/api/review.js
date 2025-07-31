const API_BASE_URL =  "http://localhost:8000";

export async function fetchReviews(token, store) {
    const encodedStore = encodeURIComponent(store);
    const res = await fetch(`${API_BASE_URL}/review/list/${encodedStore}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json().then(data => ({ ok: res.ok, data }));
  }

export async function fetchDeleteReview(token, reviewId) {
    const res = await fetch(`${API_BASE_URL}/review/delete/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json().then(data => ({ ok: res.ok, data }));
  }

export async function fetchUpdateReview(token, reviewId, content) {
    const res = await fetch(`${API_BASE_URL}/review/update/${reviewId}`, {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
       },
      body: JSON.stringify({ 
        content: content.content,
        rating: content.rating,
        reviewer: content.reviewer,
        reply: content.reply,
        is_replied: content.isReplied
       }),
    });
    console.log("Update Review Response:", res);
    return res.json().then(data => ({ ok: res.ok, data }));
  }