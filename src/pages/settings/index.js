import React, { useState } from "react";
import Layout from "@/components/Layout";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState("ko");
  const [autoLogout, setAutoLogout] = useState(30); // 분 단위

  const handleSave = (e) => {
    e.preventDefault();
    alert("설정이 저장되었습니다.");
    // 실제 저장 로직은 API 연동 필요
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#F6F8FB] flex justify-center items-center">
        <form
          onSubmit={handleSave}
          className="bg-white rounded-xl shadow p-8 w-full max-w-lg space-y-8"
        >
          <h1 className="text-2xl font-bold mb-4">설정</h1>

          {/* 알림 설정 */}
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
          </div>

          {/* 테마 설정 */}
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

          {/* 언어 설정 */}
          <div>
            <label className="block mb-2 font-medium">언어</label>
            <select
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="ko">한국어</option>
              <option value="en">영어</option>
              <option value="ja">일본어</option>
            </select>
          </div>

          {/* 자동 로그아웃 시간 설정 */}
          <div>
            <label className="block mb-2 font-medium">자동 로그아웃 시간</label>
            <select
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2"
              value={autoLogout}
              onChange={e => setAutoLogout(Number(e.target.value))}
            >
              <option value={5}>5분</option>
              <option value={15}>15분</option>
              <option value={30}>30분</option>
              <option value={60}>60분</option>
            </select>
          </div>

          {/* 저장 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
          >
            저장
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Settings;
