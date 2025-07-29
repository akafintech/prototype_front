import React from "react";
import tw from "tailwind-styled-components";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";

const Input = tw.input`flex-1 ml-4 px-4 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-slate-500`;

function MyInfoIndex({ currentUser }) {
  return (
    <Layout>
      <div className="min-h-screen bg-[#F6F8FB] flex">
        <main className="flex-1 w-full max-w-2xl mx-auto px-8 py-10">
          <h1 className="text-3xl font-bold text-[#222] mb-2">내 정보 관리</h1>
          <p className="text-[#888] mb-8">개인 정보를 관리하고 계정 설정을 변경할 수 있습니다.</p>

          <div className="bg-white rounded-xl shadow p-6 space-y-6">
            {/* ID Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium w-32">아이디</label>
              <Input type="email" placeholder="example@example.com" />
            </div>

            {/* Name Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#222] w-32">이름</label>
              <Input type="text" placeholder="김몽" />
            </div>

            {/* Current Password Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#222] w-32">현재 비밀번호</label>
              <Input type="password" placeholder="현재 비밀번호를 입력해주세요" />
            </div>

            {/* Change Password Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#222] w-32">변경 비밀번호</label>
              <div className="flex flex-1 ml-4 gap-3">
                <input
                  type="password"
                  placeholder="비밀번호를 재입력해주세요"
                  className="flex-1 px-4 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-slate-500"
                />
                <button className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg hover:bg-[#d1d8e0] whitespace-nowrap">
                  변경하기
                </button>
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#222] w-32">휴대폰 번호</label>
              <Input type="text" placeholder="숫자만 입력해 주세요" />
            </div>

            {/* Resident Registration Number Field */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#222] w-32">주민번호</label>
              <div className="flex flex-1 ml-4 gap-2 items-center">
                {/* 앞 6자리 */}
                <input
                  type="text"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="YYMMDD"
                  className="w-24 px-3 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-slate-500"
                />
                <span className="text-[#222]">-</span>
                {/* 성별 구분 1자리 */}
                <input
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[1-4]"
                  placeholder="1"
                  className="w-8 px-2 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-slate-500"
                />
                {/* 뒷자리 마스킹 */}
                <span className="text-[#222]">●●●●●●</span>
              </div>
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
            <button className="w-full py-3 bg-[#e8edf2] text-black rounded-lg hover:bg-[#d1d8e0] font-medium">
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

export default withAuth(MyInfoIndex);
