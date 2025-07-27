import React from "react";
import tw from "tailwind-styled-components"

const Input = tw.input`flex-1 ml-4 px-4 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-slate-500`;

export default function MyInfo() {
  return (
    <div className="min-h-screen bg-[#F6F8FB] flex">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-bold text-[#222] mb-8">내 정보 관리</h1>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          {/* ID Field */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium w-32">아이디</label>
            <Input type="email" placeholder="example@example.com"/>
          </div>

          {/* Name Field */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#222] w-32">이름</label>
            <Input type="text" placeholder="김몽"/>
          </div>

          {/* Current Password Field */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#222] w-32">현재 비밀번호</label>
            <div className="flex-1 ml-4 flex gap-3">
              <Input type="password" placeholder="현재 비밀번호를 입력해주세요"/>
              <button className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg hover:bg-[#d1d8e0] whitespace-nowrap">
                변경하기
              </button>
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#222] w-32">휴대폰 번호</label>
            <div className="flex-1 ml-4 flex gap-3">
            <input type="tel" placeholder="휴대폰 번호를 숫자만 입력해 주세요"  />
          </div>
          </div>

          {/* Resident Registration Number Field */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#222] w-32">주민등록 앞 7자리</label>
            <div className="flex-1 ml-4 flex items-center gap-2">
              <input
                type="text"
                value="880101"
                readOnly
                className="w-20 px-4 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-[#222] text-center"
              />
              <span className="text-[#222]">-</span>
              <input
                type="text"
                value="1"
                readOnly
                className="w-8 px-2 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-[#222] text-center"
              />
              <span className="text-[#222]">●●●●●●</span>
            </div>
          </div>

          {/* Referral Code Field */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#222] w-32">추천인 코드</label>
            <div className="flex-1 ml-4 flex gap-3">
              <input
                type="text"
                placeholder="추천인 코드"
                className="flex-1 px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222]"
              />
              <button className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg hover:bg-[#d1d8e0] whitespace-nowrap">
                생성하기
              </button>
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
            <div className="w-px h-4 bg-[#E5E7EB]"></div>
            <button className="text-sm text-[#888] hover:text-[#222]">
              로그아웃
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
