import React from "react";

function renderInput({ label, type, placeholder, required = false }) {
  return (
    <div>
      <label className="block font-medium text-[#0c141c] mb-1 text-sm sm:text-base">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 sm:px-4 py-2 border border-[#E5E7EB] rounded-lg bg-[#F6F8FB] text-[#222] text-sm sm:text-base"
        required={required}
      />
    </div>
  );
}

export default function MyInfos() {
  return (
    <div className="flex flex-col items-center relative w-full h-full bg-white">
      {/* 헤더 */}
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex-col w-60 sm:w-72 flex items-start relative">
          <div className="relative self-stretch font-bold text-[#0c141c] text-2xl sm:text-3xl md:text-4xl leading-8 sm:leading-10 [font-family:'Inter',Helvetica] tracking-[0]">
            내 정보
          </div>
        </div>
        <div className="inline-flex h-9 sm:h-10 items-center justify-end relative flex-[0_0_auto] bg-[#e8edf2] rounded-lg">
          <div className="relative w-[40px] sm:w-[45px] font-medium text-[#0c141c] text-sm sm:text-base leading-9 sm:leading-10 [font-family:'Inter',Helvetica] tracking-[0]">
            로그인
          </div>
        </div>
      </div>

      {/* 회원가입 제목 */}
      <div className="flex-col pt-4 pb-2 sm:pt-5 sm:pb-3 px-4 flex-[0_0_auto] relative self-stretch w-full">
        <div className="relative self-stretch font-bold text-[#0c141c] text-lg sm:text-xl md:text-2xl text-center leading-6 sm:leading-7 [font-family:'Inter',Helvetica] tracking-[0]">
          회원가입
        </div>
      </div>

      {/* 회원가입 폼 */}
      <form className="w-full flex flex-col items-center" onSubmit={e => e.preventDefault()}>
        <div className="flex flex-col gap-3 sm:gap-4 max-w-full sm:max-w-[480px] w-full px-2 sm:px-4">
          {renderInput({ label: "아이디", type: "text", placeholder: "아이디를 입력하세요", required: true })}
          {renderInput({ label: "이메일", type: "email", placeholder: "*실제 사용하시는 이메일을 입력해주세요", required: true })}
          {renderInput({ label: "비밀번호", type: "password", placeholder: "비밀번호 입력", required: true })}
          {renderInput({ label: "비밀번호 확인", type: "password", placeholder: "비밀번호 재입력", required: true })}
          {renderInput({ label: "휴대폰 번호", type: "tel", placeholder: "숫자만 입력", required: true })}
          {renderInput({ label: "추천인 입력", type: "text", placeholder: "추천인 코드 입력" })}
        </div>
        {/* 가입하기 버튼 */}
        <div className="flex justify-center w-full mt-4 sm:mt-6">
          <button
            type="submit"
            className="max-w-full sm:max-w-[480px] w-full sm:w-[449px] h-10 flex items-center justify-center px-4 py-0 bg-[#e8edf2] rounded-[20px] font-bold text-black text-sm sm:text-base text-center leading-[21px] whitespace-nowrap [font-family:'Inter',Helvetica] tracking-[0]"
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}
