import React, { useState } from "react";
import Layout from "@/components/Layout";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [kakaoNotifications, setKakaoNotifications] = useState(false);
  const [language, setLanguage] = useState("ko");
  const [autoLogout, setAutoLogout] = useState(30);

  const handleSave = (e) => {
    e.preventDefault();
    alert("설정이 저장되었습니다.");
  };

  return (
    <Layout className="bg-white">
      {/* ✅ 배경은 흰색 & 화면 전체 덮기 */}
      <div className="bg-white min-h-screen flex justify-center py-16">
        {/* ✅ 설정창만 내용 높이에 맞게 */}
        <div className="w-full max-w-lg">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-xl shadow p-8 space-y-6"
          >
            <h1 className="text-2xl font-bold mb-4">설정</h1>

            <div>
              <label className="block mb-2 font-medium">알림 설정</label>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications((v) => !v)}
                  id="emailNotifications"
                  className="mr-2"
                />
                <label htmlFor="emailNotifications" className="text-gray-700">
                  이메일 알림 받기
                </label>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  checked={kakaoNotifications}
                  onChange={() => setKakaoNotifications((v) => !v)}
                  id="kakaoNotifications"
                  className="mr-2"
                />
                <label htmlFor="kakaoNotifications" className="text-gray-700">
                  카카오톡 알림 받기
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">테마</label>
              <select
                className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2"
                value={darkMode ? "dark" : "light"}
                onChange={(e) => setDarkMode(e.target.value === "dark")}
              >
                <option value="light">라이트 모드</option>
                <option value="dark">다크 모드</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">언어</label>
              <select
                className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="ko">한국어</option>
                <option value="en">영어</option>
                <option value="ja">일본어</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">자동 로그아웃 시간</label>
              <select
                className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2"
                value={autoLogout}
                onChange={(e) => setAutoLogout(Number(e.target.value))}
              >
                <option value={5}>5분</option>
                <option value={15}>15분</option>
                <option value={30}>30분</option>
                <option value={60}>60분</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f59e0b] text-white py-2 rounded-lg font-semibold hover:bg-[#cc5500]"
            >
              저장
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
