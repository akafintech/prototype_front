import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const BACKGROUND_IMAGE_URL = "C:/Users/Admin/Desktop/workplace/prototype_front/public/login_bg.png";

function renderInput({ label, type, placeholder, required = false, value, onChange, name, error }) {
  return (
    <div>
      <label className="block font-medium text-[#0c141c] mb-1 text-sm sm:text-base">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 sm:px-4 py-2 border rounded-lg bg-[#F6F8FB] text-[#222] text-sm sm:text-base ${
          error ? 'border-red-500' : 'border-[#E5E7EB]'
        }`}
        required={required}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function MyInfos() {
  const router = useRouter();
  // const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // confirmPassword: "",
    // username: "",
    // phone: "",
    // referralCode: ""
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const goToRegister = () => {
    router.push("/register");
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
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
          setIsLoggedIn(true);
          // 이미 로그인된 상태라면 대시보드로 이동
          router.push('/dashboard');
        } else {
          // 토큰이 유효하지 않으면 제거
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('로그인 상태 확인 오류:', error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    // 회원가입 시 추가 검증
    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = "사용자명을 입력해주세요.";
      } else if (formData.username.length < 2) {
        newErrors.username = "사용자명은 최소 2자 이상이어야 합니다.";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      }

      if (!formData.phone) {
        newErrors.phone = "휴대폰 번호를 입력해주세요.";
      } else if (!/^[0-9-]+$/.test(formData.phone)) {
        newErrors.phone = "숫자와 하이픈(-)만 입력 가능합니다.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 실시간 에러 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    if (isLogin) {
      // 로그인 처리
      try {
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
          
          // 바로 대시보드로 이동
          router.push('/dashboard');
          
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            phone: "",
            referralCode: ""
          });
        } else {
          setMessage(data.detail || "이메일 또는 비밀번호가 올바르지 않습니다.");
        }
      } catch (error) {
        setMessage("서버 연결 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } else {
      // 회원가입 처리
      try {
        const response = await fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username || formData.email.split('@')[0],
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("회원가입이 완료되었습니다! 로그인해주세요.");
          setIsLogin(true);
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            phone: "",
            referralCode: ""
          });
          setErrors({});
        } else {
          setMessage(data.detail || "회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        setMessage("서버 연결 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }

    setIsLoading(false);
  };

  const handleModeChange = (loginMode) => {
    setIsLogin(loginMode);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      phone: "",
      referralCode: ""
    });
    setErrors({});
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setMessage("로그아웃되었습니다.");
  };

  // 로그인된 상태일 때 사용자 정보 표시 (임시로 남겨둠)
  if (isLoggedIn && currentUser) {
    return (
      <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
        <main className="flex-1 px-8 py-10">
          <h1 className="text-3xl font-bold text-[#222] mb-2">내 정보</h1>
          <p className="text-[#888] mb-8">로그인된 사용자 정보입니다.</p>

          <div className="bg-white rounded-xl shadow p-6 max-w-md mx-auto">
            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes('성공') || message.includes('완료') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-[#0c141c] mb-1 text-sm">이메일</label>
                <p className="text-gray-700">{currentUser.email}</p>
              </div>
              
              <div>
                <label className="block font-medium text-[#0c141c] mb-1 text-sm">사용자명</label>
                <p className="text-gray-700">{currentUser.username}</p>
              </div>
              
              <div>
                <label className="block font-medium text-[#0c141c] mb-1 text-sm">가입일</label>
                <p className="text-gray-700">{new Date(currentUser.created_at).toLocaleDateString('ko-KR')}</p>
              </div>
              
              <div>
                <label className="block font-medium text-[#0c141c] mb-1 text-sm">계정 상태</label>
                <p className="text-gray-700">{currentUser.is_active ? '활성' : '비활성'}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentUser(null);
                  setIsLogin(true);
                  setMessage("");
                }}
                className="w-full bg-[#e8edf2] text-black py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                다른 계정으로 로그인
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full bg-orange-200 text-white py-3 rounded-lg font-medium hover:bg-red-300 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 로그인/회원가입 폼
  return (
      <div
        className="flex items-center justify-center min-h-screen relative"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`, 
          backgroundSize: 'cover',                             
          backgroundPosition: 'center',                         
          backgroundRepeat: 'no-repeat',                    
          height: '100vh',
        }}
      >
      <div className="absolute inset-0 bg-white bg-opacity-70" style={{zIndex: 0}}></div>
      {/* 메인 로그인 폼 */}
      <main className="relative z-10 flex-1 px-8 py-10 flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-[#222] mb-2 text-center">로그인</h1>
          <p className="text-[#888] mb-8 text-center">계정에 로그인하세요.</p>
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes('성공') || message.includes('완료') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-6">
              {renderInput({ 
                label: "이메일", 
                type: "email", 
                placeholder: "실제 사용하시는 이메일을 입력해주세요", 
                required: true,
                value: formData.email,
                onChange: handleInputChange,
                name: "email",
                error: errors.email
              })}
              
              {renderInput({ 
                label: "비밀번호", 
                type: "password", 
                placeholder: "비밀번호 입력 (최소 6자)",
                required: true,
                value: formData.password,
                onChange: handleInputChange,
                name: "password",
                error: errors.password
              })}
            </div>
            
            {/* 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#e8edf2] text-black hover:bg-[#d1d8e0]'
              }`}
            >
              {isLoading ? "처리중..." : "로그인"}
            </button>
          </form>

          {/* 추가 링크 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              계정이 없으신가요?{" "}
              <button
                onClick={goToRegister}
                className="text-[#e8edf2] hover:underline font-medium"
                type="button"
              >
                {/* {isLogin ? "회원가입" : "로그인"} */}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}