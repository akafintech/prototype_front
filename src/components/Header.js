import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
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

        const response = await fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            username: formData.username,
            phone: formData.phone,
            referral_code: formData.referralCode
          })
        });

        const data = await response.json();

        if (response.ok) {
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

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#222]">
                {isLoginMode ? "로그인" : "회원가입"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Toggle Buttons */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsLoginMode(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isLoginMode
                    ? "bg-white text-[#222] shadow-sm"
                    : "text-gray-600 hover:text-[#222]"
                }`}
              >
                로그인
              </button>
              <button
                onClick={() => setIsLoginMode(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isLoginMode
                    ? "bg-white text-[#222] shadow-sm"
                    : "text-gray-600 hover:text-[#222]"
                }`}
              >
                회원가입
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#222] mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                  placeholder="이메일을 입력하세요"
                />
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block text-sm font-medium text-[#222] mb-1">
                    사용자명
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                    placeholder="사용자명을 입력하세요"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#222] mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>

              {!isLoginMode && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#222] mb-1">
                      비밀번호 확인
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                      placeholder="비밀번호를 다시 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#222] mb-1">
                      휴대폰 번호
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                      placeholder="휴대폰 번호를 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#222] mb-1">
                      추천인 코드 (선택)
                    </label>
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                      placeholder="추천인 코드를 입력하세요"
                    />
                  </div>
                </>
              )}

              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.includes("완료") || message.includes("성공")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#e8edf2] text-black py-3 rounded-lg font-medium hover:bg-[#d1d8e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "처리 중..." : (isLoginMode ? "로그인" : "회원가입")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 