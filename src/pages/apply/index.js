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
    <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
      {/* Main Content */}
      <main className="flex-1 px-8 py-10">
        <h1 className="text-3xl font-bold text-[#222] mb-2">회원가입</h1>
        <p className="text-[#888] mb-8">개인정보를 관리하고 수정할 수 있습니다.</p>

        {/* 회원가입 폼 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-[#222] mb-4">회원가입</h2>
          <form className="w-full flex flex-col" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-4 mb-6">
              {/* {renderInput({ label: "아이디", type: "text", placeholder: "아이디를 입력하세요", required: true })} */}
              {renderInput({ label: "이메일", type: "email", placeholder: "실제 사용하시는 이메일을 입력해주세요", required: true })}
              {renderInput({ label: "비밀번호", type: "password", placeholder: "비밀번호 입력", required: true })}
              {renderInput({ label: "비밀번호 확인", type: "password", placeholder: "비밀번호 재입력", required: true })}
              {renderInput({ label: "휴대폰 번호", type: "tel", placeholder: "숫자만 입력", required: true })}
              {renderInput({ label: "추천인 입력", type: "text", placeholder: "추천인 코드 입력" })}
            </div>
            {/* 가입하기 버튼 */}
            <button
              type="submit"
              className="w-full bg-[#e8edf2] text-black py-3 rounded-lg font-medium"
            >
              가입하기
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
