// pages/reviews.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";

const reviews = [
    {
        id: 1,
        name: "dk**",
        date: "2025-06-15",
        rating: 5,
        comment: "Exceptional service and a truly memorable stay. The staff went above and beyond to ensure our comfort. Highly recommend!",
        reply: ""
    },
    {
        id: 2,
        name: "li**",
        date: "2025-05-20",
        rating: 4,
        comment: "가성비 좋아요. 다음에도 오고싶어요.",
        reply: ""
    },
    {
        id: 3,
        name: "yw**",
        date: "2025-05-10",
        rating: 3,
        comment: "The stay was decent, but there were a few issues with the room service. The staff was friendly, but the response time could be improved.",
        reply: ""
    },
    {
        id: 4,
        name: "park**",
        date: "2025-04-20",
        rating: 5,
        comment: "정말 만족스러운 숙박이었습니다. 깨끗하고 편안했어요.",
        reply: ""
    },
    {
        id: 5,
        name: "kim**",
        date: "2025-04-15",
        rating: 2,
        comment: "기대했던 것보다는 별로였습니다. 개선이 필요해요.",
        reply: ""
    },
    {
        id: 6,
        name: "lee**",
        date: "2025-03-25",
        rating: 1,
        comment: "최악입니다. 다시는 오지 않겠습니다.",
        reply: ""
    }
];

function ReviewIndex({ currentUser }) {
    const router = useRouter();
    const [reviewsData, setReviewsData] = useState(reviews);
    const [filteredReviews, setFilteredReviews] = useState(reviews);
    const [showOptionsFor, setShowOptionsFor] = useState(null);
    const [selectedVersionFor, setSelectedVersionFor] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [editModeFor, setEditModeFor] = useState({});
    const [editTextFor, setEditTextFor] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteReviewId, setDeleteReviewId] = useState(null);
    const [typingText, setTypingText] = useState({});
    const [isTyping, setIsTyping] = useState({});
    const [previewText, setPreviewText] = useState({});
    const [isPreviewing, setIsPreviewing] = useState({});
    
    // 새로운 상태 추가
    const [showRatingDropdown, setShowRatingDropdown] = useState(false);
    const [selectedRating, setSelectedRating] = useState("별점 전체");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    // 영어 감지 함수
    const isEnglishReview = (comment) => {
        const englishWords = comment.toLowerCase().match(/\b[a-z]+\b/g) || [];
        const totalWords = comment.toLowerCase().match(/\b\w+\b/g) || [];
        return englishWords.length / totalWords.length > 0.7;
    };

    // 한국어 답변을 영어로 번역하는 함수
    const translateToEnglish = (koreanText) => {
        const translations = {
            "고객님의 소중한 리뷰를 남겨주셔서 진심으로 감사드립니다. 저희 서비스가 만족스러우셨다니 정말 기쁩니다. 앞으로도 더욱 나은 서비스를 제공하기 위해 끊임없이 노력하겠습니다. 다시 한 번 방문해 주시기를 기대하고 있습니다. 감사합니다!": 
            "Thank you very much for leaving such a valuable review. We are truly delighted that our service was satisfactory. We will continue to strive to provide even better service in the future. We look forward to your next visit. Thank you! ",
            
            "와! 정말 맛있게 드셨다니 저희도 기뻐요! 🎉 고객님의 소중한 리뷰가 저희에게 큰 힘이 됩니다. 앞으로도 더 맛있고 좋은 서비스로 찾아뵙겠습니다. 다음에도 꼭 방문해주세요! 감사합니다~": 
            "Wow! We're so happy that you enjoyed it! 🎉 Your valuable review gives us great strength. We'll continue to provide delicious and great service. Please visit us again next time! Thank you~ ",
            
            "소중한 리뷰 감사합니다! 만족스러우셨다니 기쁩니다. 더 나은 서비스로 보답하겠습니다. 다시 방문해주세요!": 
            "Thank you for your valuable review! We're glad you were satisfied. We'll repay you with better service. Please visit us again! "
        };
        
        return translations[koreanText] || koreanText;
    };

    const koreanReplyVersions = [
        {
            id: 1,
            title: "공손한 버전",
            content: "고객님의 소중한 리뷰를 남겨주셔서 진심으로 감사드립니다. 저희 서비스가 만족스러우셨다니 정말 기쁩니다. 앞으로도 더욱 나은 서비스를 제공하기 위해 끊임없이 노력하겠습니다. 다시 한 번 방문해 주시기를 기대하고 있습니다. 감사합니다!"
        },
        {
            id: 2,
            title: "친근한 버전",
            content: "와! 정말 맛있게 드셨다니 저희도 기뻐요! 🎉 고객님의 소중한 리뷰가 저희에게 큰 힘이 됩니다. 앞으로도 더 맛있고 좋은 서비스로 찾아뵙겠습니다. 다음에도 꼭 방문해주세요! 감사합니다~"
        },
        {
            id: 3,
            title: "간결한 버전",
            content: "소중한 리뷰 감사합니다! 만족스러우셨다니 기쁩니다. 더 나은 서비스로 보답하겠습니다. 다시 방문해주세요!"
        }
    ];

    const englishReplyVersions = [
        {
            id: 1,
            title: "Formal Version",
            content: "Thank you very much for leaving such a valuable review. We are truly delighted that our service was satisfactory. We will continue to strive to provide even better service in the future. We look forward to your next visit. Thank you!"
        },
        {
            id: 2,
            title: "Friendly Version",
            content: "Wow! We're so happy that you enjoyed it! 🎉 Your valuable review gives us great strength. We'll continue to provide delicious and great service. Please visit us again next time! Thank you~"
        },
        {
            id: 3,
            title: "Concise Version",
            content: "Thank you for your valuable review! We're glad you were satisfied. We'll repay you with better service. Please visit us again!"
        }
    ];

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
                review.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                review.comment.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }

        setFilteredReviews(filtered);
    };

    // 필터 변경 시 자동 적용
    useEffect(() => {
        applyFilters();
    }, [selectedRating, startDate, endDate, searchKeyword, reviewsData]);

    const handleGenerateReply = (reviewId) => {
        setShowOptionsFor(reviewId);
        setSelectedVersionFor(prev => ({ ...prev, [reviewId]: null }));
        
        // 모든 버전의 내용을 동시에 타이핑 애니메이션으로 표시
        const versions = koreanReplyVersions;
        versions.forEach((version) => {
            previewTypeText(reviewId, version.id, version.content);
        });
    };

    // 타이핑 애니메이션 함수
    const typeText = (reviewId, fullText, onComplete) => {
        setIsTyping(prev => ({ ...prev, [reviewId]: true }));
        setTypingText(prev => ({ ...prev, [reviewId]: "" }));
        
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypingText(prev => ({ 
                    ...prev, 
                    [reviewId]: fullText.slice(0, currentIndex) 
                }));
                currentIndex++;
            } else {
                clearInterval(interval);
                setIsTyping(prev => ({ ...prev, [reviewId]: false }));
                if (onComplete) onComplete();
            }
        }, 50); // 타이핑 속도 (밀리초)
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
        const versions = koreanReplyVersions;
        versions.forEach(version => {
            stopPreview(reviewId, version.id);
        });
    };

    const handleSelectVersion = (reviewId, version) => {
        const review = reviewsData.find(r => r.id === reviewId);
        
        setSelectedVersionFor(prev => ({ ...prev, [reviewId]: version.id }));
        
        // 모든 미리보기 중지
        stopAllPreviews(reviewId);
        
        // 즉시 텍스트 표시 (번역하지 않고 원본 한국어로 표시)
        if (editModeFor[reviewId]) {
            setEditTextFor(prev => ({ ...prev, [reviewId]: version.content }));
        } else {
            setReviewsData(prev => prev.map(review => 
                review.id === reviewId 
                    ? { ...review, reply: version.content }
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

    const handleConfirmReply = () => {
        const review = reviewsData.find(r => r.id === selectedReviewId);
        if (review) {
            const isEnglish = isEnglishReview(review.comment);
            let finalReply = review.reply;
            
            // 영어 리뷰인 경우 한국어 답변을 영어로 번역 (AI 답변이든 사용자 직접 입력이든)
            if (isEnglish && review.reply) {
                finalReply = translateToEnglish(review.reply);
                console.log("Original Korean reply:", review.reply);
                console.log("Translated English reply:", finalReply);
            }
            
            // 실제로 답변을 등록
            setReviewsData(prev => prev.map(r => 
                r.id === selectedReviewId 
                    ? { ...r, reply: finalReply, isReplied: true }
                    : r
            ));
            
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
            const review = reviewsData.find(r => r.id === reviewId);
            const isEnglish = isEnglishReview(review.comment);
            let finalReply = editedText;
            
            // 영어 리뷰인 경우 한국어 답변을 영어로 번역 (AI 답변이든 사용자 직접 입력이든)
            if (isEnglish && editedText) {
                finalReply = translateToEnglish(editedText);
                console.log("Original Korean reply (edit):", editedText);
                console.log("Translated English reply (edit):", finalReply);
            }
            
            setReviewsData(prev => prev.map(r => 
                r.id === reviewId 
                    ? { ...r, reply: finalReply }
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

    const handleConfirmDelete = () => {
        if (deleteReviewId) {
            // 답변만 삭제하고 리뷰는 유지
            setReviewsData(prev => prev.map(r => 
                r.id === deleteReviewId 
                    ? { ...r, reply: "", isReplied: false }
                    : r
            ));
            
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

    // 검색어 변경 핸들러
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
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
                    <div className="flex flex-wrap gap-2 mb-4">
                        <button className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg">전체</button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">호텔1</button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">호텔2</button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">호텔3</button>
                    </div>

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
                            const isEnglish = isEnglishReview(review.comment);
                            // 영어 리뷰인 경우에도 한국어 답변 옵션을 보여줌
                            const replyVersions = koreanReplyVersions;
                            
                            return (
                                <div key={review.id} className="bg-white rounded-xl shadow p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-[#222]">{review.name}</h3>
                                            <p className="text-sm text-[#888]">{review.date}</p>
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
                                    <p className="text-[#222] mb-4">{review.comment}</p>
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
                                                    {isEnglish ? "한국어 답변 버전을 선택해주세요 (자동으로 영어로 번역됩니다):" : "AI 답변 버전을 선택해주세요:"}
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
                                                            <div className="font-medium text-[#222] mb-1">{version.title}</div>
                                                            <div className="text-sm text-gray-600 min-h-[3rem] whitespace-pre-wrap">
                                                                {isPreviewing[`${review.id}-${version.id}`]
                                                                    ? previewText[`${review.id}-${version.id}`] || ""
                                                                    : version.content
                                                                }
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <textarea
                                            className="w-full h-24 p-3 border border-[#E5E7EB] rounded-lg bg-white text-[#222] resize-none mb-3"
                                            placeholder={isEnglish ? "한국어 답변이 여기에 표시됩니다 (등록 시 영어로 자동 번역)" : "AI가 생성한 답변을 여기에 표시합니다."}
                                            value={editModeFor[review.id] ? editTextFor[review.id] || "" : review.reply}
                                            readOnly={false}
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                
                                                if (editModeFor[review.id]) {
                                                    // 수정 모드에서는 원본 한국어 텍스트를 저장
                                                    setEditTextFor(prev => ({ ...prev, [review.id]: newValue }));
                                                } else {
                                                    // 일반 모드에서는 원본 텍스트를 저장 (번역하지 않음)
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
                                                {isEnglish ? "선택된 버전 (답변달기 시 영어로 번역됨): " : "선택된 버전: "}
                                                {replyVersions.find(v => v.id === selectedVersionFor[review.id])?.title}
                                            </div>
                                        )}

                                        <div className="flex justify-end gap-3">
                                            {!editModeFor[review.id] && (
                                                <>
                                                    <button 
                                                        className="px-4 py-2 border border-[#E5E7EB] text-black rounded-lg cursor-pointer"
                                                        onClick={() => handleGenerateReply(review.id)}
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

export default withAuth(ReviewIndex);