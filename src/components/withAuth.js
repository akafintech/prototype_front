import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8000/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setCurrentUser(null);
            router.push('/');
          }
        } catch (error) {
          console.error('사용자 정보 로드 오류:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setCurrentUser(null);
          router.push('/');
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
        router.push('/');
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

    if (!isAuthenticated) {
      return null; // 로그인 페이지로 리다이렉트되므로 아무것도 렌더링하지 않음
    }

    return <WrappedComponent {...props} currentUser={currentUser} />;
  };
} 