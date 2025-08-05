import { API_BASE_URL } from '@/config/api';

export const translateText = async (token, text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/translate/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        text: text,
        target_language: 'ko'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      return { ok: true, data: data };
    } else {
      return { ok: false, data: data };
    }
  } catch (error) {
    console.error('번역 요청 중 오류:', error);
    return { ok: false, data: { detail: '번역 요청 중 오류가 발생했습니다.' } };
  }
}; 