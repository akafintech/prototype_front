import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LeftNavigationBar from "@/components/sidebar";
import "@/styles/globals.css";
import { fetchMe } from "@/api/user"; // 추가

export default function App({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 라우터 변경 시 인증 상태 재확인
  useEffect(() => {
    const handleRouteChange = () => {
      checkAuthStatus();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { ok } = await fetchMe(token); // fetchMe 함수 사용
        if (ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('사용자 정보 로드 오류:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8edf2] mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인하지 않은 상태에서는 사이드바 없이 렌더링
  if (!isAuthenticated) {
    return <Component {...pageProps} />;
  }

  // 로그인된 상태에서는 사이드바와 함께 렌더링
  return (
    <div className="flex min-h-screen">
      <div className="w-80 fixed left-0 top-0 h-full z-10">
        <LeftNavigationBar />
      </div>
      <div className="flex-1 ml-80">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
