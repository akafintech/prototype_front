import { useEffect } from 'react';

export const useInfiniteScroll = (isLoading, hasMore, page, setPage, loadReviews, activeStore) => {
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, hasMore, isLoading, activeStore]);
}; 