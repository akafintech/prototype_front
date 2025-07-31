// pages/reviews.js
import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { fetchStores } from "@/api/store";
import { fetchRecommend } from "@/api/recommend";
import { fetchReviews,fetchUpdateReview,fetchDeleteReview } from "@/api/review";

const StoreTab = tw.div`flex flex-wrap gap-2 mb-4`;
const StoreButton = tw.button`px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]`;


function ReviewIndex() {
    const [reviewsData, setReviewsData] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [showOptionsFor, setShowOptionsFor] = useState(null);
    const [selectedVersionFor, setSelectedVersionFor] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [editModeFor, setEditModeFor] = useState({});
    const [editTextFor, setEditTextFor] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteReviewId, setDeleteReviewId] = useState(null);
    const [previewText, setPreviewText] = useState({});
    const [isPreviewing, setIsPreviewing] = useState({});
    const [recommendResults, setRecommendResults] = useState({});
    
    // 새로운 상태 추가
    const [showRatingDropdown, setShowRatingDropdown] = useState(false);
    const [selectedRating, setSelectedRating] = useState("별점 전체");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    // jinnam
    const [stores, setStores] = useState([]);
    const [activeStore, setActiveStore] = useState("전체");

    const loadStores = async () => {
        const token = localStorage.getItem("token");
        const data = await fetchStores(token);
        setStores(data || []);
    };

    const loadReviews = async (store) => {
        try {
            const token = localStorage.getItem("token");
            const { ok, data } = await fetchReviews(token, store);
            if (!ok) {
                alert(data.detail);
                return;
            }
            setReviewsData(data || []);
            setFilteredReviews(data || []);
        } catch (error) {
            console.error("리뷰 로드 중 오류:", error);
            setReviewsData([]);
            setFilteredReviews([]);
        }
    };

    useEffect(() => {
        loadStores();
        loadReviews("전체");
    }, []);
    // 별점 옵션
    const ratingOptions = [
        "별점 전체",
        "5점",
        "4점", 
        "3점",
        "2점",
        "1점"
    ];

    // 필터링 함수
    const applyFilters = () => {
        let filtered = [...reviewsData];

        // 별점 필터링
        if (selectedRating !== "별점 전체") {
            const ratingValue = parseInt(selectedRating.replace("점", ""));
            filtered = filtered.filter(review => review.rating === ratingValue);
        }

        // 날짜 범위 필터링
        if (startDate && endDate) {
            filtered = filtered.filter(review => {
                const reviewDate = new Date(review.date);
                const start = new Date(startDate);
                const end = new Date(endDate);
                return reviewDate >= start && reviewDate <= end;
            });
        }

        // 검색어 필터링
        if (searchKeyword.trim()) {
            filtered = filtered.filter(review => 
                review.reviewer.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                review.content.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }

        setFilteredReviews(filtered);
    };

    // 필터 변경 시 자동 적용
    useEffect(() => {
        applyFilters();
    }, [selectedRating, startDate, endDate, searchKeyword, reviewsData]);

    // activeStore 변경 시 리뷰 다시 로드
    useEffect(() => {
        if (activeStore) {
            loadReviews(activeStore);
        }
    }, [activeStore]);

    const handleGenerateReply = async (review) => {
        setShowOptionsFor(review.id);
        setSelectedVersionFor(prev => ({ ...prev, [review.id]: null }));
        const token = localStorage.getItem("token");
        const data = await fetchRecommend(token, review.store, review.reviewer, review.rating);
        const results = data.results;
        console.log("results",results);

        if (results.length === 0) {
            alert("답변을 생성할 수 없습니다.");
            return;
        }
        
        // 결과를 상태에 저장
        setRecommendResults(prev => ({ ...prev, [review.id]: results }));
        
        // 각 결과에 대해 타이핑 애니메이션 시작
        results.forEach((result) => {
            previewTypeText(review.id, result.id, result.text);
        });
    };

    // 미리보기 타이핑 애니메이션 함수
    const previewTypeText = (reviewId, versionId, fullText) => {
        setIsPreviewing(prev => ({ ...prev, [`${reviewId}-${versionId}`]: true }));
        setPreviewText(prev => ({ ...prev, [`${reviewId}-${versionId}`]: "" }));
        
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setPreviewText(prev => ({ 
                    ...prev, 
                    [`${reviewId}-${versionId}`]: fullText.slice(0, currentIndex) 
                }));
                currentIndex++;
            } else {
                clearInterval(interval);
                // 미리보기는 자동으로 멈추지 않고 계속 유지
            }
        }, 30); // 미리보기는 더 빠른 속도
    };

    // 미리보기 중지 함수
    const stopPreview = (reviewId, versionId) => {
        setIsPreviewing(prev => ({ ...prev, [`${reviewId}-${versionId}`]: false }));
        setPreviewText(prev => ({ ...prev, [`${reviewId}-${versionId}`]: "" }));
    };

    // 모든 미리보기 중지 함수
    const stopAllPreviews = (reviewId) => {
        const results = recommendResults[reviewId] || [];
        results.forEach(result => {
            stopPreview(reviewId, result.id);
        });
    };

    const handleSelectVersion = (reviewId, version) => {
        const review = reviewsData.find(r => r.id === reviewId);
        
        setSelectedVersionFor(prev => ({ ...prev, [reviewId]: version.id }));
        
        // 모든 미리보기 중지
        stopAllPreviews(reviewId);
        
        // 즉시 텍스트 표시
        if (editModeFor[reviewId]) {
            setEditTextFor(prev => ({ ...prev, [reviewId]: version.text }));
        } else {
            setReviewsData(prev => prev.map(review => 
                review.id === reviewId 
                    ? { ...review, reply: version.text }
                    : review
            ));
        }
    };

    const handleSubmitReply = (reviewId) => {
        const review = reviewsData.find(r => r.id === reviewId);
        if (review && review.reply) {
            setSelectedReviewId(reviewId);
            setShowModal(true);
        } else {
            alert("답변을 먼저 생성해주세요.");
        }
    };

    const handleConfirmReply = async () => {
        const review = reviewsData.find(r => r.id === selectedReviewId);
        if (review) {
            // 실제로 답변을 등록
            setReviewsData(prev => prev.map(r => 
                r.id === selectedReviewId 
                    ? { ...r, reply: review.reply, isReplied: true }
                    : r
            ));
            const token = localStorage.getItem("token");
            const updateReview = {...review, isReplied: true};
            const { ok, data } = await fetchUpdateReview(token,review.id, updateReview)

            if (!ok) {
                alert(data.detail);
                return;
            }

            // AI 답변 옵션 숨기기
            setShowOptionsFor(null);
            setSelectedVersionFor(prev => ({ ...prev, [selectedReviewId]: null }));
        }
        setShowModal(false);
        setSelectedReviewId(null);
    };

    const handleCancelReply = () => {
        setShowModal(false);
        setSelectedReviewId(null);
    };

    const handleEditReply = (reviewId) => {
        const review = reviewsData.find(r => r.id === reviewId);
        setEditModeFor(prev => ({ ...prev, [reviewId]: true }));
        setEditTextFor(prev => ({ ...prev, [reviewId]: review.reply }));
        // 수정 모드에서도 AI 답변 옵션을 표시
        setShowOptionsFor(reviewId);
        setSelectedVersionFor(prev => ({ ...prev, [reviewId]: null }));
    };

    const handleSaveEdit = (reviewId) => {
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
        }
    };

    const handleCancelEdit = (reviewId) => {
        setEditModeFor(prev => ({ ...prev, [reviewId]: false }));
        setEditTextFor(prev => ({ ...prev, [reviewId]: "" }));
    };

    const handleDeleteReply = (reviewId) => {
        setDeleteReviewId(reviewId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async() => {
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
            const { ok, data } = await fetchUpdateReview(token, deleteReviewId,updateReview);
            if (!ok) {
                alert(data.detail);
                return;
            }
            
            // 관련 상태 초기화
            setEditModeFor(prev => ({ ...prev, [deleteReviewId]: false }));
            setEditTextFor(prev => ({ ...prev, [deleteReviewId]: "" }));
            setShowOptionsFor(null);
            setSelectedVersionFor(prev => ({ ...prev, [deleteReviewId]: null }));
            
            setShowDeleteModal(false);
            setDeleteReviewId(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteReviewId(null);
    };

    // 별점 선택 핸들러
    const handleRatingSelect = (rating) => {
        setSelectedRating(rating);
        setShowRatingDropdown(false);
    };


    // 필터 초기화
    const resetFilters = () => {
        setSelectedRating("별점 전체");
        setStartDate("");
        setEndDate("");
        setSearchKeyword("");
    };

    return (
        <Layout>
            <div className="min-h-screen bg-[#F6F8FB] flex">
                {/* Main Content */}
                <main className="flex-1 px-8 py-10">
                <h1 className="text-3xl font-bold text-[#222] mb-2">고객 리뷰</h1>
                <p className="text-[#888] mb-8">고객 피드백을 관리하고 응답하여 서비스 품질을 향상시켜보세요.</p>

                {/* Review Summary Section */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <div className="flex items-center mb-6">
                        <div className="flex items-center mr-6">
                            <span className="text-4xl font-bold text-[#222] mr-2">4</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-yellow-400 text-2xl">★</span>
                                ))}
                            </div>
                        </div>
                        <div className="text-[#888]">{filteredReviews.length}개 리뷰</div>
                    </div>

                    {/* Rating Distribution Chart */}
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center">
                                <span className="w-8 text-sm text-[#888]">{rating}★</span>
                                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2 relative">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full relative"
                                        style={{ width: `${rating === 5 ? 40 : rating === 4 ? 30 : rating === 3 ? 15 : rating === 2 ? 10 : 5}%` }}
                                    >
                                        {rating === 3 && (
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-red-500"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="w-12 text-sm text-[#888] text-right">
                                    {rating === 5 ? 40 : rating === 4 ? 30 : rating === 3 ? 15 : rating === 2 ? 10 : 5}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review Filters and Search */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                {/* Source Tabs */}
                <StoreTab>
                    <StoreButton 
                        className={activeStore === "전체" ? "bg-[#e8edf2] text-black" : "bg-white border border-[#E5E7EB] text-[#888]"}
                        onClick={() => setActiveStore("전체")}
                    >
                        전체
                    </StoreButton>
                    {stores.map((store, index) => (
                        <StoreButton 
                            key={store.id || index}
                            className={activeStore === store.name ? "bg-[#e8edf2] text-black" : "bg-white border border-[#E5E7EB] text-[#888]"}
                            onClick={() => setActiveStore(store.name)}
                        >
                            {store.name}
                        </StoreButton>
                    ))}
                </StoreTab>

                    {/* Search and Filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* 별점 드롭다운 */}
                        <div className="relative">
                            <button 
                                className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg flex items-center gap-2"
                                onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                            >
                                {selectedRating}
                                <span className="text-sm">▼</span>
                            </button>
                            {showRatingDropdown && (
                                <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10 min-w-[120px]">
                                    {ratingOptions.map((option) => (
                                        <button
                                            key={option}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                            onClick={() => handleRatingSelect(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* 기간 선택 */}
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222] cursor-pointer"
                                placeholder="시작일"
                            />
                            <span className="text-[#888]">~</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222] cursor-pointer"
                                placeholder="종료일"
                            />
                        </div>
                        
                        <button 
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={resetFilters}
                        >
                            초기화
                        </button>
                    </div>

                    {/* 필터 결과 표시 */}
                    {(selectedRating !== "별점 전체" || startDate || endDate || searchKeyword) && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <div className="text-sm text-blue-700">
                                <strong>적용된 필터:</strong>
                                {selectedRating !== "별점 전체" && <span className="ml-2 bg-blue-200 px-2 py-1 rounded">{selectedRating}</span>}
                                {(startDate || endDate) && (
                                    <span className="ml-2 bg-blue-200 px-2 py-1 rounded">
                                        {startDate} ~ {endDate || "현재"}
                                    </span>
                                )}
                                {searchKeyword && <span className="ml-2 bg-blue-200 px-2 py-1 rounded">검색: {searchKeyword}</span>}
                                <span className="ml-2 text-blue-600">총 {filteredReviews.length}개 리뷰</span>
                            </div>
                        </div>
                    )}
                </div>

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
                        filteredReviews.map((review) => {
                            const replyVersions = recommendResults[review.id] || [];
                            
                            return (
                                <div key={review.id} className="bg-white rounded-xl shadow p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-[#222]">{review.reviewer}</h3>
                                            <p className="text-sm text-[#888]">{review.created_at}</p>
                                        </div>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className={`text-lg ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[#222] mb-4">{review.content}</p>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-[#888]">{review.thumbsUp}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-[#888]">{review.thumbsDown}</span>
                                        </div>
                                    </div>

                                    {/* AI Reply Section for each review */}
                                    <div className="border-t pt-4">
                                        {/* AI Reply Options */}
                                        {(showOptionsFor === review.id || editModeFor[review.id]) && (
                                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                                <h5 className="font-medium text-[#222] mb-3">
                                                    AI 답변 버전을 선택해주세요:
                                                </h5>
                                                <div className="space-y-2">
                                                    {replyVersions.map((version) => (
                                                        <button
                                                            key={version.id}
                                                            onClick={() => handleSelectVersion(review.id, version)}
                                                            className={`w-full text-left p-3 border rounded-lg transition-colors ${
                                                                selectedVersionFor[review.id] === version.id
                                                                    ? 'border-blue-500 bg-blue-50'
                                                                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                                                            }`}
                                                        >
                                                            <div className="font-medium text-[#222] mb-1">{version.title || `버전 ${version.id}`}</div>
                                                            <div className="text-sm text-gray-600 min-h-[3rem] whitespace-pre-wrap">
                                                                {isPreviewing[`${review.id}-${version.id}`]
                                                                    ? previewText[`${review.id}-${version.id}`] || ""
                                                                    : version.text
                                                                }
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <textarea
                                            className="w-full h-24 p-3 border border-[#E5E7EB] rounded-lg bg-white text-[#222] resize-none mb-3"
                                            placeholder="AI가 생성한 답변을 여기에 표시합니다."
                                            value={editModeFor[review.id] ? editTextFor[review.id] || "" : review.reply}
                                            readOnly={false}
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                
                                                if (editModeFor[review.id]) {
                                                    setEditTextFor(prev => ({ ...prev, [review.id]: newValue }));
                                                } else {
                                                    setReviewsData(prev => prev.map(r => 
                                                        r.id === review.id 
                                                            ? { ...r, reply: newValue }
                                                            : r
                                                    ));
                                                }
                                            }}
                                        />
                                        
                                        {selectedVersionFor[review.id] && !editModeFor[review.id] && (
                                            <div className="mb-3 text-sm text-blue-600">
                                                선택된 버전: {replyVersions.find(v => v.id === selectedVersionFor[review.id])?.title || `버전 ${selectedVersionFor[review.id]}`}
                                            </div>
                                        )}

                                        <div className="flex justify-end gap-3">
                                            {!editModeFor[review.id] && (
                                                <>
                                                    <button 
                                                        className="px-4 py-2 border border-[#E5E7EB] text-black rounded-lg cursor-pointer"
                                                        onClick={() => handleGenerateReply(review)}
                                                    >
                                                        생성하기
                                                    </button>
                                                    <button 
                                                        className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg cursor-pointer"
                                                        onClick={() => handleSubmitReply(review.id)}
                                                    >
                                                        답변달기
                                                    </button>
                                                    {review.isReplied && (
                                                        <>
                                                            <button 
                                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                                                                onClick={() => handleEditReply(review.id)}
                                                            >
                                                                수정하기
                                                            </button>
                                                            <button 
                                                                className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
                                                                onClick={() => handleDeleteReply(review.id)}
                                                            >
                                                                삭제하기
                                                            </button>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            
                                            {editModeFor[review.id] && (
                                                <>
                                                    <button 
                                                        className="px-4 py-2 border border-[#E5E7EB] text-black rounded-lg cursor-pointer"
                                                        onClick={() => handleCancelEdit(review.id)}
                                                    >
                                                        취소
                                                    </button>
                                                    <button 
                                                        className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600"
                                                        onClick={() => handleSaveEdit(review.id)}
                                                    >
                                                        저장
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                </main>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-2xl">
                        <h3 className="text-lg font-medium text-center text-[#222] mb-6">
                            댓글을 등록 하시겠습니까?
                        </h3>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelReply}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleConfirmReply}
                                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-2xl">
                        <h3 className="text-lg font-medium text-center text-[#222] mb-6">
                            답변을 삭제하시겠습니까?
                        </h3>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default ReviewIndex;