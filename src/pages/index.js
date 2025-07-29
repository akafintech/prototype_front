import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { fetchLogin, fetchRegister, fetchMe } from "@/api/user";

export default function Home() {
  const router = useRouter();
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { ok, data } = await fetchMe(token);
        if (ok) {
          setCurrentUser(data);
          setIsLoggedIn(true);
          router.push('/dashboard');
        } else {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('사용자 정보 로드 오류:', error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
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
        const { ok, data } = await fetchLogin(formData.email, formData.password);
        if (ok) {
          console.log('로그인 성공:', data);
          localStorage.setItem('token', data.access_token);
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 500);
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            phone: "",
            referralCode: ""
          });
        } else {
          setMessage(data.detail || "로그인에 실패했습니다.");
        }
      } else {
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

  return (
    <Layout>
      <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full grid grid-rows-[auto_auto_1fr_auto] gap-6">
          {/* Fixed Branding Section */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-12 bg-[url('/icons/lemong_logo.png')] bg-contain bg-no-repeat bg-center"></div>
            </div>
            <h2 className="text-3xl font-bold text-[#222] mb-2">
              The Dream Solution
            </h2>
            <div className="h-8 flex items-center justify-center">
              <p className="text-[#888] text-sm">
                {isLoginMode ? "계정에 로그인하세요" : "새 계정을 만드세요"}
              </p>
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                isLoginMode
                  ? "bg-white text-[#222] shadow-sm"
                  : "text-gray-600 hover:text-[#222]"
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLoginMode
                  ? "bg-white text-[#222] shadow-sm"
                  : "text-gray-600 hover:text-[#222]"
              }`}
            >
              회원가입
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#222] mb-2">
                이메일
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                placeholder="이메일을 입력하세요"
              />
            </div>

            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-[#222] mb-2">
                  사용자명
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                  placeholder="사용자명을 입력하세요"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#222] mb-2">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {!isLoginMode && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#222] mb-2">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                    placeholder="비밀번호를 다시 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#222] mb-2">
                    휴대폰 번호
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                    placeholder="휴대폰 번호를 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#222] mb-2">
                    추천인 코드 (선택)
                  </label>
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent"
                    placeholder="추천인 코드를 입력하세요"
                  />
                </div>
              </>
            )}

            {message && (
              <div className={`p-4 rounded-lg text-sm ${
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

          {/* Footer */}
          <div className="text-center text-sm text-[#888]">
            <p>© 2024 The Dream Solution. All rights reserved.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}



