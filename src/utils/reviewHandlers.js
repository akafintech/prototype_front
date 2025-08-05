import { fetchUpdateReview } from "@/api/review";

// 언어 감지 함수
export const checkFirstCharType = (text) => {
    if (!text || text.length === 0) return '기타';
    
    const firstChar = text.charAt(0);
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const englishRegex = /[a-zA-Z]/;
    
    if (koreanRegex.test(firstChar)) return '한글';
    if (englishRegex.test(firstChar)) return '영어';
    return '기타';
};

// 답변 제출 핸들러
export const handleSubmitReply = (reviewId, reviewsData, setReviewsData, recommendResults, selectedVersionFor) => {
    const review = reviewsData.find(r => r.id === reviewId);
    if (review && review.reply) {
        return { success: true, reviewId };
    } else {
        alert("답변을 먼저 생성해주세요.");
        return { success: false };
    }
};

// 답변 확인 핸들러
export const handleConfirmReply = async (
    selectedReviewId, 
    reviewsData, 
    setReviewsData, 
    recommendResults, 
    selectedVersionFor,
    setShowOptionsFor,
    setSelectedVersionFor
) => {
    const review = reviewsData.find(r => r.id === selectedReviewId);
    if (review) {
        // 선택된 버전의 언어에 맞는 텍스트 결정
        const selectedVersion = recommendResults[selectedReviewId]?.find(v => v.id === selectedVersionFor[selectedReviewId]);
        let finalReply = review.reply;
        
        if (selectedVersion) {
            // 리뷰 언어에 따라 적절한 텍스트 선택
            const isKoreanReview = checkFirstCharType(review.content) === '한글';
            finalReply = isKoreanReview ? selectedVersion.koreanText : selectedVersion.englishText;
        }
        
        // 실제로 답변을 등록
        setReviewsData(prev => prev.map(r => 
            r.id === selectedReviewId 
                ? { ...r, reply: finalReply, isReplied: true }
                : r
        ));
        
        const token = localStorage.getItem("token");
        const updateReview = {...review, reply: finalReply, isReplied: true};
        const { ok, data } = await fetchUpdateReview(token, review.id, updateReview);

        if (!ok) {
            alert(data.detail);
            return { success: false };
        }

        // AI 답변 옵션 숨기기
        setShowOptionsFor(null);
        setSelectedVersionFor(prev => ({ ...prev, [selectedReviewId]: null }));
        
        return { success: true };
    }
    return { success: false };
};

// 답변 수정 핸들러
export const handleEditReply = (reviewId, reviewsData, setEditModeFor, setEditTextFor, setShowOptionsFor, setSelectedVersionFor) => {
    const review = reviewsData.find(r => r.id === reviewId);
    setEditModeFor(prev => ({ ...prev, [reviewId]: true }));
    setEditTextFor(prev => ({ ...prev, [reviewId]: review.reply }));
    // 수정 모드에서도 AI 답변 옵션을 표시
    setShowOptionsFor(reviewId);
    setSelectedVersionFor(prev => ({ ...prev, [reviewId]: null }));
};

// 답변 저장 핸들러
export const handleSaveEdit = (reviewId, editTextFor, setReviewsData, setEditModeFor, setEditTextFor, setShowOptionsFor, setSelectedVersionFor) => {
    const editedText = editTextFor[reviewId];
    if (editedText && editedText.trim()) {
        setReviewsData(prev => prev.map(r => 
            r.id === reviewId 
                ? { ...r, reply: editedText }
                : r
        ));
        setEditModeFor(prev => ({ ...prev, [reviewId]: false }));
        setEditTextFor(prev => ({ ...prev, [reviewId]: "" }));
        // 수정 완료 후 AI 옵션 숨기기
        setShowOptionsFor(null);
        setSelectedVersionFor(prev => ({ ...prev, [reviewId]: null }));
        return { success: true };
    }
    return { success: false };
};

// 답변 삭제 핸들러
export const handleConfirmDelete = async (
    deleteReviewId, 
    reviewsData, 
    setReviewsData, 
    setEditModeFor, 
    setEditTextFor, 
    setShowOptionsFor, 
    setSelectedVersionFor
) => {
    if (deleteReviewId) {
        const review = reviewsData.find(r => r.id === deleteReviewId);
        // 답변만 삭제하고 리뷰는 유지
        setReviewsData(prev => prev.map(r => 
            r.id === deleteReviewId 
                ? { ...r, reply: "", isReplied: false }
                : r
        ));
        
        const token = localStorage.getItem("token");
        const updateReview = {...review, isReplied: false, reply: ""};
        const { ok, data } = await fetchUpdateReview(token, deleteReviewId, updateReview);
        
        if (!ok) {
            alert(data.detail);
            return { success: false };
        }
        
        // 관련 상태 초기화
        setEditModeFor(prev => ({ ...prev, [deleteReviewId]: false }));
        setEditTextFor(prev => ({ ...prev, [deleteReviewId]: "" }));
        setShowOptionsFor(null);
        setSelectedVersionFor(prev => ({ ...prev, [deleteReviewId]: null }));
        
        return { success: true };
    }
    return { success: false };
};

// 텍스트 변경 핸들러
export const handleTextChange = (reviewId, newValue, isEditMode, setReviewsData, setEditTextFor) => {
    if (isEditMode) {
        setEditTextFor(prev => ({ ...prev, [reviewId]: newValue }));
    } else {
        setReviewsData(prev => prev.map(r => 
            r.id === reviewId 
                ? { ...r, reply: newValue }
                : r
        ));
    }
}; 