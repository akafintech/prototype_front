import React from "react";

const rooms = [
    { number: "101", type: "Standard", status: "사용 가능", cleaning: "청소 완료", memo: "배개 2개 있음" },
    { number: "102", type: "Deluxe", status: "사용 중", cleaning: "청소 완료", memo: "침구류 상태 최상" },
    { number: "103", type: "Suite", status: "서비스 중지", cleaning: "청소 전", memo: "공사로 사용 불가" },
    { number: "104", type: "Deluxe", status: "사용 가능", cleaning: "청소 전", memo: "새벽 1시 예약" },
    { number: "105", type: "Suite", status: "사용 중", cleaning: "청소 완료", memo: "비품 준비" },
    { number: "201", type: "Standard", status: "사용 중", cleaning: "청소 완료", memo: "샤워 고장" },
    { number: "202", type: "Standard", status: "사용 중", cleaning: "청소 전", memo: "바닥 청소 필요" },
    { number: "203", type: "Deluxe", status: "사용 가능", cleaning: "청소 전", memo: "에어컨·냉장고 작동 양호" },
    { number: "204", type: "Suite", status: "사용 가능", cleaning: "청소 완료", memo: "커튼 열림 상태" },
    { number: "205", type: "Standard", status: "사용 중", cleaning: "청소 완료", memo: "조명 교체" },
];

export default function ReserveIndex() {
    return (
        <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">

            <div className="w-full min-h-screen bg-[#F6F8FB] flex">


                {/* Main Content */}
                <main className="flex-1 px-12 py-10">
                    <h1 className="text-3xl font-bold text-[#222] mb-2">객실 관리</h1>
                    <p className="text-[#888] mb-8">객실 재고, 상태, 세부정보를 관리합니다.</p>

                    {/* Search & Filters */}
                    <div className="flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="검색 (ex. 객실번호, 객실유형 등 입력)"
                            className="w-96 px-4 py-2 border border-[#E5E7EB] rounded-lg bg-[#F6F8FB] text-[#222] mr-4"
                        />
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#222] mr-2 flex items-center">
                            객실유형 <span className="ml-1">▼</span>
                        </button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#222] mr-2 flex items-center">
                            상태 <span className="ml-1">▼</span>
                        </button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#222] mr-2 flex items-center">
                            최근 청소일 <span className="ml-1">▼</span>
                        </button>
                        <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#222] flex items-center">
                            정렬 <span className="ml-1">▼</span>
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <table className="w-full text-center">
                            <thead>
                                <tr className="text-[#888] text-sm border-b">
                                    <th className="py-2">객실 번호</th>
                                    <th className="py-2">객실 유형</th>
                                    <th className="py-2">상태</th>
                                    <th className="py-2">청소 여부</th>
                                    <th className="py-2">객실 상태 메모</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room, idx) => (
                                    <tr key={room.number} className="border-b last:border-b-0">
                                        <td className="py-2">{room.number}</td>
                                        <td className="py-2">
                                            <span
                                                className={
                                                    room.type === "Standard"
                                                        ? "text-[#4D7899] font-medium"
                                                        : room.type === "Deluxe"
                                                            ? "text-[#03C75A] font-medium"
                                                            : "text-[#FF8A00] font-medium"
                                                }
                                            >
                                                {room.type}
                                            </span>
                                        </td>
                                        <td className="py-2">
                                            <span
                                                className={
                                                    room.status === "사용 가능"
                                                        ? "bg-[#E8F5EF] text-[#03C75A] px-3 py-1 rounded-full text-sm"
                                                        : room.status === "사용 중"
                                                            ? "bg-[#F6F8FB] text-[#888] px-3 py-1 rounded-full text-sm"
                                                            : "bg-[#FDEFEF] text-[#FF5A5A] px-3 py-1 rounded-full text-sm"
                                                }
                                            >
                                                {room.status}
                                            </span>
                                        </td>
                                        <td className="py-2 text-[#4D7899]">{room.cleaning}</td>
                                        <td className="py-2 text-[#888]">{room.memo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}