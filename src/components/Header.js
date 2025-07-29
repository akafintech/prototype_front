import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import tw from "tailwind-styled-components";

const HeaderContainer = tw.header`bg-white shadow-sm border-b`;
const HeaderContent = tw.div`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`;
const HeaderInner = tw.div`flex justify-between items-center py-4`;

export default function Header() {
  const router = useRouter();
  const { currentUser,setCurrentUser } = useAuth();


  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    router.push('/');
  };
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderInner>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#222]"></h1>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-gray-700">
                  안녕하세요, <span className="font-semibold">{currentUser.username}</span>님!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (<span className="text-gray-700">
                  로그인 페이지로 이동
                </span>)}
          </div>
        </HeaderInner>
      </HeaderContent>
    </HeaderContainer>
  );
}