import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardStats from "../dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoadUser();
  }, []);

  const checkAuthAndLoadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/apply');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setCurrentUser(userData);
      } else {
        localStorage.removeItem('token');
        router.push('/apply');
      }
    } catch (error) {
      console.error('사용자 정보 로드 오류:', error);
      localStorage.removeItem('token');
      router.push('/apply');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/apply');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#e8edf2] mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-[#222]">Lemong Dashboard</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
             
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Component */}
      <div className="flex items-start justify-center gap-1 px-4 sm:px-6 py-5 relative flex-1 self-stretch w-full grow">
        <DashboardStats />
      </div>
    </div>
  );
} 