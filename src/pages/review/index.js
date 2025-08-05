import React, { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import RatingSummary from "@/components/review/RatingSummary";
import ReviewCard from "@/components/review/ReviewCard";
import ReviewFilters from "@/components/review/ReviewFilters";
import ConfirmationModal from "@/components/review/ConfirmationModal";
import { useReviews } from "@/hooks/useReviews";
import { useFilters } from "@/hooks/useFilters";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useAutoReply } from "@/hooks/useAutoReply";
import { useTranslate } from "@/hooks/useTranslate";
import {
    handleSubmitReply,
    handleConfirmReply,
    handleEditReply,
    handleSaveEdit,
    handleConfirmDelete,
    handleTextChange
} from "@/utils/reviewHandlers";

/**
 * ReviewIndex 컴포넌트
 * 고객 리뷰를 관리하고 AI 답변을 생성하는 메인 페이지
 */
function ReviewIndex() {
    // 커스텀 훅 사용
    const {
        reviewsData,
        setReviewsData,
        filteredReviews,
        setFilteredReviews,
        stores,
        activeStore,
        setActiveStore,
        page,
        setPage,
        hasMore,
        isLoading,
        loadReviews,
        updateReview
    } = useReviews();

    const {
        showRatingDropdown,
        setShowRatingDropdown,
        selectedRating,
        setSelectedRating,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchKeyword,
        setSearchKeyword,
        ratingOptions,
        resetFilters,
        handleRatingSelect
    } = useFilters(reviewsData, setFilteredReviews);

    const {
        showOptionsFor,
        setShowOptionsFor,
        selectedVersionFor,
        setSelectedVersionFor,
        recommendResults,
        previewText,
        isPreviewing,
        isCreatingAutoReview,
        handleGenerateReply,
        handleSelectVersion: originalHandleSelectVersion,
        getFinalReply,
        stopAllPreviews
    } = useAutoReply();

    const {
        handleTranslate,
        getDisplayText,
        isTranslatedForReview,
        isTranslatingForReview
    } = useTranslate();

    // 무한 스크롤 훅 사용
    useInfiniteScroll(isLoading, hasMore, page, setPage, loadReviews, activeStore);

    // 모달 상태
    const [showModal, setShowModal] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [editModeFor, setEditModeFor] = useState({});
    const [editTextFor, setEditTextFor] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteReviewId, setDeleteReviewId] = useState(null);

    // 콜백 함수들 - useCallback을 사용하여 불필요한 리렌더링 방지
    const handleSubmitReplyCallback = useCallback((reviewId) => {
        const result = handleSubmitReply(reviewId, reviewsData, setReviewsData, recommendResults, selectedVersionFor);
        if (result.success) {
            setSelectedReviewId(result.reviewId);
            setShowModal(true);
        }
    }, [reviewsData, recommendResults, selectedVersionFor]);

    const handleConfirmReplyCallback = useCallback(async () => {
        const result = await handleConfirmReply(
            selectedReviewId,
            reviewsData,
            setReviewsData,
            recommendResults,
            selectedVersionFor,
            setShowOptionsFor,
            setSelectedVersionFor
        );
        
        if (result.success) {
            setShowModal(false);
            setSelectedReviewId(null);
        }
    }, [selectedReviewId, reviewsData, recommendResults, selectedVersionFor, setShowOptionsFor, setSelectedVersionFor]);

    const handleCancelReplyCallback = useCallback(() => {
        setShowModal(false);
        setSelectedReviewId(null);
    }, []);

    const handleEditReplyCallback = useCallback((reviewId) => {
        handleEditReply(reviewId, reviewsData, setEditModeFor, setEditTextFor, setShowOptionsFor, setSelectedVersionFor);
    }, [reviewsData, setEditModeFor, setEditTextFor, setShowOptionsFor, setSelectedVersionFor]);

    const handleSaveEditCallback = useCallback((reviewId) => {
        const result = handleSaveEdit(reviewId, editTextFor, setReviewsData, setEditModeFor, setEditTextFor, setShowOptionsFor, setSelectedVersionFor);
        if (!result.success) {
            alert("수정할 내용을 입력해주세요.");
        }
    }, [editTextFor, setReviewsData, setEditModeFor, setEditTextFor, setShowOptionsFor, setSelectedVersionFor]);

    const handleCancelEditCallback = useCallback((reviewId) => {
        setEditModeFor(prev => ({ ...prev, [reviewId]: false }));
        setEditTextFor(prev => ({ ...prev, [reviewId]: "" }));
    }, [setEditModeFor, setEditTextFor]);

    const handleDeleteReplyCallback = useCallback((reviewId) => {
        setDeleteReviewId(reviewId);
        setShowDeleteModal(true);
    }, []);

    const handleConfirmDeleteCallback = useCallback(async () => {
        const result = await handleConfirmDelete(
            deleteReviewId,
            reviewsData,
            setReviewsData,
            setEditModeFor,
            setEditTextFor,
            setShowOptionsFor,
            setSelectedVersionFor
        );
        
        if (result.success) {
            setShowDeleteModal(false);
            setDeleteReviewId(null);
        }
    }, [deleteReviewId, reviewsData, setReviewsData, setEditModeFor, setEditTextFor, setShowOptionsFor, setSelectedVersionFor]);

    const handleCancelDeleteCallback = useCallback(() => {
        setShowDeleteModal(false);
        setDeleteReviewId(null);
    }, []);

    const handleTextChangeCallback = useCallback((reviewId, newValue, isEditMode) => {
        handleTextChange(reviewId, newValue, isEditMode, setReviewsData, setEditTextFor);
    }, [setReviewsData, setEditTextFor]);

    const handleStoreChange = useCallback((storeName) => {
        setActiveStore(storeName);
    }, [setActiveStore]);

    // 버전 선택 핸들러 - 선택된 버전의 텍스트를 리뷰 데이터에 업데이트
    const handleSelectVersionCallback = useCallback((reviewId, version) => {
        // 원래 핸들러 호출
        originalHandleSelectVersion(reviewId, version);
        
        // 선택된 버전의 텍스트를 리뷰 데이터에 업데이트
        const review = reviewsData.find(r => r.id === reviewId);
        if (review) {
            // 리뷰 언어에 따라 적절한 텍스트 선택
            const isKoreanReview = /^[가-힣]/.test(review.content);
            const selectedText = isKoreanReview ? version.koreanText : version.englishText;
            
            setReviewsData(prev => prev.map(r => 
                r.id === reviewId 
                    ? { ...r, reply: selectedText }
                    : r
            ));
        }
    }, [originalHandleSelectVersion, reviewsData, setReviewsData]);

    // 번역 핸들러
    const handleTranslateCallback = useCallback((reviewId, originalText) => {
        handleTranslate(reviewId, originalText);
    }, [handleTranslate]);

    return (
        <Layout>
            <div className="min-h-screen bg-[#F6F8FB] flex">
                {/* Main Content */}
                <main className="flex-1 px-8 py-10">
                    <h1 className="text-3xl font-bold text-[#222] mb-2">고객 리뷰</h1>
                    <p className="text-[#888] mb-8">고객 피드백을 관리하고 응답하여 서비스 품질을 향상시켜보세요.</p>

                    {/* Review Summary Section */}
                    <RatingSummary reviews={filteredReviews} />

                    {/* Review Filters and Search */}
                    <ReviewFilters
                        stores={stores}
                        activeStore={activeStore}
                        onStoreChange={handleStoreChange}
                        showRatingDropdown={showRatingDropdown}
                        setShowRatingDropdown={setShowRatingDropdown}
                        selectedRating={selectedRating}
                        ratingOptions={ratingOptions}
                        onRatingSelect={handleRatingSelect}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        searchKeyword={searchKeyword}
                        onResetFilters={resetFilters}
                        filteredReviews={filteredReviews}
                    />

                    {/* Individual Reviews List */}
                    <div className="space-y-4">
                        {filteredReviews.length === 0 ? (
                            <div className="bg-white rounded-xl shadow p-8 text-center">
                                <div className="text-gray-400 text-lg mb-2">🔍</div>
                                <p className="text-gray-600">조건에 맞는 리뷰가 없습니다.</p>
                                <button 
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    onClick={resetFilters}
                                >
                                    필터 초기화
                                </button>
                            </div>
                        ) : (
                            <>
                                {filteredReviews.map((review) => {
                                    const replyVersions = recommendResults[review.id] || [];
                                    const displayText = getDisplayText(review.id, review.content);
                                    const isTranslated = isTranslatedForReview(review.id);
                                    const isTranslating = isTranslatingForReview(review.id);
                                    
                                    return (
                                        <ReviewCard
                                            key={review.id}
                                            review={review}
                                            replyVersions={replyVersions}
                                            showOptionsFor={showOptionsFor}
                                            editModeFor={editModeFor}
                                            editTextFor={editTextFor}
                                            selectedVersionFor={selectedVersionFor}
                                            isPreviewing={isPreviewing}
                                            previewText={previewText}
                                            isCreatingAutoReview={isCreatingAutoReview}
                                            onGenerateReply={handleGenerateReply}
                                            onSelectVersion={handleSelectVersionCallback}
                                            onSubmitReply={handleSubmitReplyCallback}
                                            onEditReply={handleEditReplyCallback}
                                            onSaveEdit={handleSaveEditCallback}
                                            onCancelEdit={handleCancelEditCallback}
                                            onDeleteReply={handleDeleteReplyCallback}
                                            onTextChange={handleTextChangeCallback}
                                            onTranslate={handleTranslateCallback}
                                            isTranslating={isTranslating}
                                            isTranslated={isTranslated}
                                            displayText={displayText}
                                        />
                                    );
                                })}
                                
                                {/* 로딩 인디케이터 */}
                                {isLoading && (
                                    <div className="bg-white rounded-xl shadow p-8 text-center">
                                        <div className="text-blue-500 text-lg mb-2">⏳</div>
                                        <p className="text-gray-600">리뷰를 불러오는 중...</p>
                                    </div>
                                )}
                                
                                {/* 더 이상 로드할 데이터가 없을 때 */}
                                {!hasMore && filteredReviews.length > 0 && (
                                    <div className="bg-white rounded-xl shadow p-8 text-center">
                                        <div className="text-gray-400 text-lg mb-2">📄</div>
                                        <p className="text-gray-600">모든 리뷰를 불러왔습니다.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </main>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showModal}
                title="댓글을 등록 하시겠습니까?"
                onConfirm={handleConfirmReplyCallback}
                onCancel={handleCancelReplyCallback}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                title="답변을 삭제하시겠습니까?"
                onConfirm={handleConfirmDeleteCallback}
                onCancel={handleCancelDeleteCallback}
                confirmText="확인"
                cancelText="취소"
                confirmButtonClass="bg-red-500 text-white rounded-lg hover:bg-red-600"
            />
        </Layout>
    );
}

export default ReviewIndex;