import { useState } from 'react';
import { translateText } from '@/api/translate';

export const useTranslate = () => {
  const [translatedTexts, setTranslatedTexts] = useState({});
  const [isTranslating, setIsTranslating] = useState({});
  const [isTranslated, setIsTranslated] = useState({});

  const handleTranslate = async (reviewId, originalText) => {
    // 이미 번역된 상태라면 원래 텍스트로 돌아가기
    if (isTranslated[reviewId]) {
      setIsTranslated(prev => ({ ...prev, [reviewId]: false }));
      setTranslatedTexts(prev => ({ ...prev, [reviewId]: null }));
      return;
    }

    // 번역 중 상태 설정
    setIsTranslating(prev => ({ ...prev, [reviewId]: true }));

    try {
      const token = localStorage.getItem("token");
      const { ok, data } = await translateText(token, originalText);

      if (ok) {
        setTranslatedTexts(prev => ({ ...prev, [reviewId]: data.translated_text }));
        setIsTranslated(prev => ({ ...prev, [reviewId]: true }));
      } else {
        alert(data.detail || "번역에 실패했습니다.");
      }
    } catch (error) {
      console.error("번역 중 오류:", error);
      alert("번역 중 오류가 발생했습니다.");
    } finally {
      setIsTranslating(prev => ({ ...prev, [reviewId]: false }));
    }
  };

  const getDisplayText = (reviewId, originalText) => {
    if (isTranslated[reviewId] && translatedTexts[reviewId]) {
      return translatedTexts[reviewId];
    }
    return originalText;
  };

  const isTranslatedForReview = (reviewId) => {
    return isTranslated[reviewId] || false;
  };

  const isTranslatingForReview = (reviewId) => {
    return isTranslating[reviewId] || false;
  };

  return {
    handleTranslate,
    getDisplayText,
    isTranslatedForReview,
    isTranslatingForReview
  };
}; 