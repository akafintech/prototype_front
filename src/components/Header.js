import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchMe, fetchLogin, fetchRegister } from "@/api/user"; 

export default function Header() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
    referralCode: ""
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { ok, data } = await fetchMe(token);
        if (ok) {
          setCurrentUser(data);
        } else {
          localStorage.removeItem('token');
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('사용자 정보 로드 오류:', error);
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    router.push('/');
  };

  const handleLogin = () => {
    setIsLoginMode(true);
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setIsLoginMode(false);
    setShowAuthModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      if (isLoginMode) {
        // 로그인 로직
        const { ok, data } = await fetchLogin(formData.email, formData.password);
        if (ok) {
          localStorage.setItem('token', data.access_token);
          setCurrentUser(data.user);
          setShowAuthModal(false);
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            phone: "",
            referralCode: ""
          });
          router.push('/');
        } else {
          setMessage(data.detail || "로그인에 실패했습니다.");
        }
      } else {
        // 회원가입 로직
        if (formData.password !== formData.confirmPassword) {
          setMessage("비밀번호가 일치하지 않습니다.");
          setIsSubmitting(false);
          return;
        }

        const { ok, data } = await fetchRegister(formData);
        if (ok) {
          setMessage("회원가입이 완료되었습니다! 로그인해주세요.");
          setIsLoginMode(true);
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            phone: "",
            referralCode: ""
          });
        } else {
          setMessage(data.detail || "회원가입에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("서버 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowAuthModal(false);
    setMessage("");
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      phone: "",
      referralCode: ""
    });
  };

  if (isLoading) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#222]"></h1>
            </div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
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
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="bg-[#e8edf2] text-black px-4 py-2 rounded-lg hover:bg-[#d1d8e0] transition-colors"
                  >
                    로그인
                  </button>
                  <button
                    onClick={handleSignup}
                    className="bg-[#222] text-white px-4 py-2 rounded-lg hover:bg-[#444] transition-colors"
                  >
                    회원가입
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}