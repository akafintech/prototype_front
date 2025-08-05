// 별점 분포 계산
export const calculateRatingDistribution = (reviews) => {
  const ratingCounts = [5, 4, 3, 2, 1].map(rating =>
    reviews.filter(r => r.rating === rating).length
  );
  const total = reviews.length;
  const ratingPercents = ratingCounts.map(count =>
    total > 0 ? Math.round((count / total) * 100) : 0
  );
  
  return { ratingCounts, ratingPercents, total };
};

// 별점 평균 계산
export const calculateAverageRating = (reviews) => {
  const total = reviews.length;
  return total > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(2)
    : "0.00";
};

// 언어 감지
export const detectLanguage = (str) => {
  if (!str) return '빈 문자열';
  const firstChar = str[0];
  if (/^[A-Za-z]$/.test(firstChar)) {
    return '영어';
  } else if (/^[가-힣]$/.test(firstChar)) {
    return '한글';
  } else {
    return '기타';
  }
};

// 날짜 포맷팅
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR');
};

// 별점 렌더링
export const renderStars = (rating, size = 'lg') => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg', 
    lg: 'text-2xl'
  };
  
  return [1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={`${sizeClasses[size]} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
    >
      ★
    </span>
  ));
}; 