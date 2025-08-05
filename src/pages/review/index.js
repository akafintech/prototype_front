// pages/reviews.js
import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Layout from "@/components/Layout";
import { fetchStores } from "@/api/store";
import { fetchRecommend } from "@/api/recommend";
import { fetchReviews,fetchUpdateReview,fetchDeleteReview } from "@/api/review";
import { createAutoReview } from "@/api/autoreview";

const StoreTab = tw.div`flex flex-wrap gap-2 mb-4`;
const StoreButton = tw.button`px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]`;

function checkFirstCharType(str) {
  if (!str) return '빈 문자열';

  const firstChar = str[0];

  if (/^[A-Za-z]$/.test(firstChar)) {
    return '영어';
  } else if (/^[가-힣]$/.test(firstChar)) {
    return '한글';
  } else {
    return '기타';
  }
}

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
    
    // 무한 스크롤 관련 상태
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadStores = async () => {
        const token = localStorage.getItem("token");
        const data = await fetchStores(token);
        setStores(data || []);
    };

    const loadReviews = async (store, pageNum = 1, append = false) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const { ok, data } = await fetchReviews(token, store, pageNum);
            if (!ok) {
                alert(data.detail);
                return;
            }
            
            if (append) {
                setReviewsData(prev => [...prev, ...(data || [])]);
                setFilteredReviews(prev => [...prev, ...(data || [])]);
            } else {
                setReviewsData(data || []);
                setFilteredReviews(data || []);
            }
            
            // 더 로드할 데이터가 있는지 확인 (예: 10개씩 로드한다고 가정)
            setHasMore((data || []).length === 10);
        } catch (error) {
            console.error("리뷰 로드 중 오류:", error);
            if (!append) {
                setReviewsData([]);
                setFilteredReviews([]);
            }
        } finally {
            setIsLoading(false);
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
            setPage(1);
            setHasMore(true);
            loadReviews(activeStore, 1, false);
        }
    }, [activeStore]);

    const handleGenerateReply = async (review) => {
        setShowOptionsFor(review.id);
        setSelectedVersionFor(prev => ({ ...prev, [review.id]: null }));
        
        try {
            const token = localStorage.getItem("token");
            console.log('토큰 확인:', token ? '토큰 있음' : '토큰 없음');
            
            // autoreview API 호출
            const reviewData = {
                username: review.reviewer,
                rating: review.rating,
                storename: review.store,
                content: review.content
            };
            
            console.log('전송할 데이터:', reviewData);
            
            const { ok, data } = await createAutoReview(token, reviewData);
            
            console.log('API 응답:', { ok, data });
            
            if (!ok) {
                console.error('API 응답 실패:', data);
                alert("답변을 생성할 수 없습니다.");
                return;
            }

            // 언어에 따라 결과 선택
            const results = checkFirstCharType(review.content) === '한글' ? data.results : data.results_en;
            console.log('선택된 결과:', results);

            if (!results || results.length === 0) {
                console.error('결과가 없음:', data);
                alert("답변을 생성할 수 없습니다.");
                return;
            }
            
            // 결과를 상태에 저장
            setRecommendResults(prev => ({ ...prev, [review.id]: results }));
            
            // 각 결과에 대해 타이핑 애니메이션 시작
            results.forEach((result) => {
                previewTypeText(review.id, result.id, result.text);
            });
        } catch (error) {
            console.error("답변 생성 중 오류:", error);
            alert("답변을 생성할 수 없습니다.");
        }
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


    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (isLoading || !hasMore) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 스크롤이 하단에서 100px 이내에 도달하면 더 많은 데이터 로드
        if (scrollTop + windowHeight >= documentHeight - 100) {
            const nextPage = page + 1;
            setPage(nextPage);
            loadReviews(activeStore, nextPage, true);
        }
    };

    // 스크롤 이벤트 리스너 등록
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, hasMore, isLoading, activeStore]);

    // 필터 초기화
    const resetFilters = () => {
        setSelectedRating("별점 전체");
        setStartDate("");
        setEndDate("");
        setSearchKeyword("");
    };

    // 별점 분포 계산
    const ratingCounts = [5, 4, 3, 2, 1].map(rating =>
      filteredReviews.filter(r => r.rating === rating).length
    );
    const total = filteredReviews.length;
    const ratingPercents = ratingCounts.map(count =>
      total > 0 ? Math.round((count / total) * 100) : 0
    );

    // 별점 평균 계산
    const avgRating = total > 0
      ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(2)
      : "0.00";

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
                            <span className="text-4xl font-bold text-[#222] mr-2">{avgRating}</span>
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
                        {[5, 4, 3, 2, 1].map((rating, idx) => (
                            <div key={rating} className="flex items-center">
                                <span className="w-8 text-sm text-[#888]">{rating}★</span>
                                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2 relative">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full relative"
                                        style={{ width: `${ratingPercents[idx]}%` }}
                                    >
                                        {rating === 3 && (
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-red-500"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="w-12 text-sm text-[#888] text-right">
                                    {ratingPercents[idx]}%
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
                        <>
                            {filteredReviews.map((review) => {
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