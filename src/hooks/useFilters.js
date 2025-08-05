import { useState, useEffect } from 'react';

export const useFilters = (reviewsData, setFilteredReviews) => {
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [selectedRating, setSelectedRating] = useState("별점 전체");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const ratingOptions = [
    "별점 전체",
    "5점",
    "4점", 
    "3점",
    "2점",
    "1점"
  ];

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

  const resetFilters = () => {
    setSelectedRating("별점 전체");
    setStartDate("");
    setEndDate("");
    setSearchKeyword("");
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
    setShowRatingDropdown(false);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, startDate, endDate, searchKeyword, reviewsData]);

  return {
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
  };
}; 