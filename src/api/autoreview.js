import { API_BASE_URL } from "@/config/api";

export async function createAutoReview(token, reviewData) {
  try {
    console.log('Autoreview API 호출:', {
      url: `${API_BASE_URL}/autoreview/create`,
      data: reviewData
    });

    const res = await fetch(`${API_BASE_URL}/autoreview/create`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: reviewData.username,
        rating: reviewData.rating,
        storename: reviewData.storename,
        content: reviewData.content
      }),
    });

    console.log('API 응답 상태:', res.status, res.statusText);
    
    const data = await res.json();
    console.log('API 응답 데이터:', data);
    
    return { ok: res.ok, data };
  } catch (error) {
    console.error('Autoreview API 오류:', error);
    throw error;
  }
} 