import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUpdateUser } from "@/api/user";

const Input = tw.input`flex-1 ml-4 px-4 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-slate-500`;

function MyInfoIndex() {
  const { currentUser } = useAuth();
  const [registerData, setRegisterData] = useState({
    email: currentUser?.email || "",
    username: currentUser?.username || "",
    phoneNumber: currentUser?.phone_number || "",
    password: "",
    newPassword: ""
  });

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (registerData.password) {
      const { ok, data } = await fetchUpdateUser(token, {
        email: registerData.email,
        username: registerData.username,
        phone_number: registerData.phoneNumber,
        password: registerData.password,
        new_password: registerData.newPassword
      });

      if (ok) {
        alert("정보가 성공적으로 업데이트되었습니다.");
      } else {
        alert(`업데이트 실패: ${data.message || "알 수 없는 오류"}`);
      }
    } else {
      alert("비밀번호를 입력해주세요.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white flex">
        <main className="flex-1 w-full max-w-2xl mx-auto px-8 py-10">
          <h1 className="text-3xl font-bold text-[#222] mb-2">내 정보 관리</h1>
          <p className="text-[#888] mb-8">개인 정보를 관리하고 계정 설정을 변경할 수 있습니다.</p>

          <div className="bg-white rounded-xl shadow p-6 space-y-6">
            {/* ID Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium w-32">아이디</label>
              <Input
                type="email"
                placeholder="example@example.com"
                value={registerData.email}
                readOnly
              />
            </div>

            {/* Name Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#222] w-32">이름</label>
              <Input
                type="text"
                placeholder="김몽"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
            </div>

            {/* Current Password Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#222] w-32">현재 비밀번호</label>
              <Input
                type="password"
                placeholder="현재 비밀번호를 입력해주세요"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </div>

            {/* Change Password Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#222] w-32">변경 비밀번호</label>
              <div className="flex flex-1 ml-4 gap-3">
                <input
                  type="password"
                  placeholder="새 비밀번호를 입력해주세요"
                  value={registerData.newPassword}
                  onChange={(e) => setRegisterData({ ...registerData, newPassword: e.target.value })}
                  className="flex-1 px-4 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-slate-500"
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#222] w-32">휴대폰 번호</label>
              <Input
                type="text"
                placeholder="숫자만 입력해 주세요"
                value={registerData.phoneNumber}
                onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
              />
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex items-center pt-4">
            <input
              type="checkbox"
              id="newsletter"
              className="w-4 h-4 text-[#e8edf2] border-[#E5E7EB] rounded focus:ring-[#e8edf2]"
            />
            <label htmlFor="newsletter" className="ml-3 text-sm text-[#222]">
              다양한 소식과 알찬 정보를 받아볼게요
            </label>
          </div>

          {/* Save Changes Button */}
          <div className="pt-6">
            <button
              className="w-full py-3 bg-[#f59e0b] text-white rounded-lg hover:bg-[#cc5500] font-medium"
              onClick={handleSave}>
              변경사항 저장하기
            </button>
          </div>

          {/* Bottom Links */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#E5E7EB]">
            <button className="text-sm text-[#888] hover:text-[#222]">
              회원 탈퇴
            </button>
            <span className="text-[#888]">|</span>
            <button className="text-sm text-[#888] hover:text-[#222]">
              개인정보 처리방침
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default MyInfoIndex;