import React from "react";

const columns = [
  "고객 이름",
  "객실 번호",
  "체크인 날짜",
  "체크아웃 날짜",
  "상태",
  "총 금액",
];

const data = [
  ["김산백", "101", "2025-07-15", "2025-07-17", "완료", "100,000"],
  ["이희용", "102", "2025-07-16", "2025-07-18", "완료", "150,000"],
  ["Noah Carter", "103", "2025-07-17", "2025-07-19", "취소", "110,000"],
  ["김초롱초롱", "104", "2025-07-18", "2025-07-20", "확인", "110,000"],
  ["Ethan Foster", "105", "2025-07-19", "2025-07-21", "확인", "150,000"],
  ["Isabella Green", "201", "2025-07-20", "2025-07-22", "확인", "130,000"],
  ["Mason Hayes", "202", "2025-07-21", "2025-07-23", "취소", "100,000"],
  ["서혜린", "203", "2024-07-22", "2024-07-27", "확인", "130,000"],
  ["이은소", "204", "2025-07-23", "2025-07-25", "확인", "130,000"],
  ["안애경", "205", "2025-07-24", "2025-07-26", "확인", "150,000"],
];

function renderRow(row, idx) {
  return (
    <tr key={idx} className="border-t border-[#e5e8ea]">
      {row.map((cell, i) =>
        i === 4 ? (
          <td key={i} className="px-4 py-2 text-center align-middle">
            <span className="inline-block w-full bg-[#e8edf2] rounded-lg px-4 py-1 font-medium text-[#0c141c] text-sm whitespace-nowrap truncate text-center">
              {cell}
            </span>
          </td>
        ) : (
          <td key={i} className="px-4 py-2 text-center align-middle font-normal text-[#4c7299] text-sm truncate">
            {cell}
          </td>
        )
      )}
    </tr>
  );
}

export default function DepthFrameWrapper() {
  return (
    <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
      <div className="w-full flex-1 grow flex flex-col items-start relative">
        {/* 헤더 */}
        <div className="flex flex-wrap items-start justify-around gap-3 p-4 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex-col w-72 flex items-start relative">
            <div className="self-stretch font-bold text-[#0c141c] text-2xl sm:text-3xl md:text-4xl leading-8 sm:leading-10 [font-family:'Inter',Helvetica] tracking-[0]">
              예약 현황
            </div>
          </div>
        </div>

        {/* 검색 */}
        <div className="flex flex-col items-start px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex-col min-w-40 h-12 self-stretch w-full flex items-start relative">
            <div className="items-start self-stretch w-full rounded-lg flex relative flex-1 grow">
              <div className="inline-flex items-start justify-center pl-4 pr-0 py-0 self-stretch bg-[#e8edf2] rounded-l-lg relative flex-[0_0_auto]">
                <div className="relative flex-1 grow h-6">
                  <img
                    className="absolute w-5 h-5 top-0.5 left-0.5"
                    alt="Vector"
                    src="https://c.animaapp.com/WM4NmW8c/img/vector---0-7.svg"
                  />
                </div>
              </div>
              <div className="flex items-start pl-2 pr-4 py-2 relative flex-1 self-stretch grow bg-[#e8edf2] rounded-r-lg overflow-hidden">
                <div className="w-fit font-normal text-[#4c7299] text-base leading-6 whitespace-nowrap relative [font-family:'Inter',Helvetica] tracking-[0]">
                  검색하기
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 테이블 */}
        <div className="flex flex-col items-start px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
          <div className="self-stretch w-full flex-[0_0_auto] bg-[#f7f9fc] rounded-lg overflow-hidden border border-solid border-[#cedbe8]">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-[#f7f9fc]">
                  {columns.map((col, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 font-medium text-[#0c141c] text-sm text-center whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map(renderRow)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
