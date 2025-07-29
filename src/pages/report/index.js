import React, { useState } from "react";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";

function ReportIndex({ currentUser }) {
  const [selectedReport, setSelectedReport] = useState("매출분석");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showReport, setShowReport] = useState(false);

  const reportTypes = ["예약률", "매출분석", "후기 관리", "객실 이용 패턴"];

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      setShowReport(true);
    }
  };

  return (
    <Layout>
      <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
        <main className="flex-1 px-8 py-10">
          <h1 className="text-3xl font-bold text-[#222] mb-2">통계/분석</h1>
          <p className="text-[#888] mb-8">호텔의 성과를 파악할 수 있는 통계와 분석자료입니다.</p>

          {/* 리포트 유형 선택 */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold text-[#222] mb-4">리포트 유형</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {reportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedReport(type)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedReport === type
                      ? "bg-[#e8edf2] text-black"
                      : "bg-white text-[#888] border-[#E5E7EB]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* 날짜 선택 */}
            <div className="mb-6">
              <label className="block text-[#222] font-medium mb-2">{selectedReport}</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222]"
                  />
                  <p className="text-xs text-[#888] mt-1">시작일</p>
                </div>
                <div className="flex-1">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222]"
                  />
                  <p className="text-xs text-[#888] mt-1">종료일</p>
                </div>
              </div>
            </div>

            {/* 리포트 생성 버튼 */}
            <button
              className="w-full bg-[#e8edf2] text-black py-3 rounded-lg font-medium"
              onClick={handleGenerateReport}
            >
              리포트 생성하기
            </button>
          </div>

          {/* 리포트 결과 (조건 만족 시 표시) */}
          {showReport && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#222] mb-2">
                    {selectedReport} 통계자료
                  </h2>
                  <div className="text-3xl font-bold text-[#222] mb-1">75%</div>
                  <div className="text-sm text-[#888]">
                    최근 12개월 <span className="text-[#03C75A]">+5%</span>
                  </div>
                </div>
              </div>

              {/* 임의 차트 (막대 차트 예시) */}
              <div className="w-full h-64 bg-[#e8edf2] rounded-lg p-4 flex items-end justify-between">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m, i) => (
                  <div key={m} className="flex flex-col items-center w-8">
                    <div
                      className="w-full bg-[#c5d0db] rounded-t"
                      style={{
                        height: `${60 + Math.sin(i) * 30}%`,
                        minHeight: "20px",
                        transition: "height 0.3s",
                      }}
                    ></div>
                    <span className="text-xs text-[#888] mt-2">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}

export default withAuth(ReportIndex);
