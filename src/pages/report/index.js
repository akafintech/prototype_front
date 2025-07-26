import React from "react";

export default function Reports() {
    return (
        <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">


            {/* Main Content */}
            <main className="flex-1 px-8 py-10">
                <h1 className="text-3xl font-bold text-[#222] mb-2">통계/분석</h1>
                <p className="text-[#888] mb-8">호텔의 성과를 파악할 수 있는 통계와 분석자료입니다.</p>

                {/* Report Type Section */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h2 className="text-lg font-bold text-[#222] mb-4">리포트 유형</h2>
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">
                            예약
                        </button>
                        <button className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg flex items-center">
                            Revenue by Period
                        </button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">
                            Guest Satisfaction
                        </button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]">
                            Booking Trends
                        </button>
                    </div>
                    {/* Date Inputs */}
                    <div className="mb-6">
                        <label className="block text-[#222] font-medium mb-2">Occupancy Rate</label>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222]"
                                />
                                <p className="text-xs text-[#888] mt-1">startdate</p>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222]"
                                />
                                <p className="text-xs text-[#888] mt-1">enddate</p>
                            </div>
                        </div>
                    </div>
                    {/* Generate Report Button */}
                    <button className="w-full bg-[#e8edf2] text-black py-3 rounded-lg font-medium">
                        Generate Report
                    </button>
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-[#222] mb-2">Occupancy Rate Over Time</h2>
                            <div className="text-3xl font-bold text-[#222] mb-1">75%</div>
                            <div className="text-sm text-[#888]">
                                Last 12 Months <span className="text-[#03C75A]">+5%</span>
                            </div>
                        </div>
                    </div>
                    {/* Chart (막대 그래프 형태로 예시) */}
                    <div className="w-full h-64 bg-[#e8edf2] rounded-lg p-4 flex items-end justify-between">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m, i) => (
                            <div key={m} className="flex flex-col items-center w-8">
                                <div
                                    className="w-full bg-[#e8edf2] rounded-t"
                                    style={{
                                        height: `${60 + Math.sin(i) * 30}%`,
                                        minHeight: "20px",
                                        transition: "height 0.3s"
                                    }}
                                ></div>
                                <span className="text-xs text-[#888] mt-2">{m}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}