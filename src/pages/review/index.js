// pages/reviews.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const reviews = [
    {
        id: 1,
        name: "dk**",
        date: "June 15, 2024",
        rating: 5,
        comment: "Exceptional service and a truly memorable stay. The staff went above and beyond to ensure our comfort. Highly recommend!",
        thumbsUp: 12,
        thumbsDown: 2,
        reply: ""
    },
    {
        id: 2,
        name: "li**",
        date: "May 20, 2024",
        rating: 4,
        comment: "가성비 좋아요. 다음에도 오고싶어요.",
        thumbsUp: 8,
        thumbsDown: 1,
        reply: ""
    },
    {
        id: 3,
        name: "yw**",
        date: "April 10, 2024",
        rating: 3,
        comment: "The stay was decent, but there were a few issues with the room service. The staff was friendly, but the response time could be improved.",
        thumbsUp: 5,
        thumbsDown: 3,
        reply: ""
    }
];

export default function Reviews() {
    const router = useRouter();
    const [reviewsData, setReviewsData] = useState(reviews);
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

    return (
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
                        <div className="text-[#888]">150개 리뷰</div>
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
                        <button className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg">리뷰 전체</button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">Booking.com</button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">TripAdvisor</button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">Direct</button>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888]">🔍</span>
                            <input
                                type="text"
                                placeholder="Search reviews by guest name or keywords"
                                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222]"
                            />
                        </div>
                        <button className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg">별점 전체</button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">정렬</button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">오래된순</button>
                    </div>
                </div>

                {/* Individual Reviews List */}
                <div className="space-y-4">
                    {reviewsData.map((review) => {
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
                                        <span className="text-[#888]">👍</span>
                                        <span className="text-sm text-[#888]">{review.thumbsUp}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[#888]">👎</span>
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
                    })}
                </div>
            </main>

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
        </div>
    );
}