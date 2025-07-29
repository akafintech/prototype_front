import React, { useState } from "react";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";

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

function ReserveIndex({ currentUser }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const [filterType, setFilterType] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");
  const [filterCleaning, setFilterCleaning] = useState("전체");

  const filteredRooms = rooms.filter((room) => {
    const matchType = filterType === "전체" || room.type === filterType;
    const matchStatus = filterStatus === "전체" || room.status === filterStatus;
    const matchCleaning = filterCleaning === "전체" || room.cleaning === filterCleaning;
    const matchSearch =
      searchTerm === "" ||
      Object.values(room).some((value) => value.includes(searchTerm));

    return matchType && matchStatus && matchCleaning && matchSearch;
  });

  return (
    <Layout>
      <div className="px-6 py-5 w-full bg-[#F6F8FB] min-h-screen">
        <h1 className="text-3xl font-bold text-[#222] mb-2">객실 관리</h1>
        <p className="text-[#888] mb-6">객실 재고, 상태, 세부정보를 관리합니다.</p>

        {/* 검색창 */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-bold text-[#222] mb-4">객실 검색</h2>
          <div className="flex items-center gap-2 w-full mb-4">
            <input
              type="text"
              placeholder="검색하기"
              className="flex-grow px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg font-medium whitespace-nowrap"
              onClick={handleSearch}
            >
              검색
            </button>
          </div>
        </div>

        {/* 객실 테이블 */}
        <div className="bg-white rounded-xl shadow p-6">
          <table className="w-full text-center">
            <thead>
              <tr className="text-[#888] text-sm border-b">
                <th className="py-2">객실 번호</th>
                <th className="py-2">
                  객실 유형
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="ml-2 text-sm bg-transparent appearance-none pr-6"
                    style={{
                      backgroundImage: "url('/icons/arrow-down.svg')",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.25rem center",
                      backgroundSize: "1rem",
                      border: "none",
                      paddingRight: "1.5rem",
                    }}
                  >
                    <option>전체</option>
                    <option>Standard</option>
                    <option>Deluxe</option>
                    <option>Suite</option>
                  </select>
                </th>
                <th className="py-2">
                  상태
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="ml-2 text-sm bg-transparent appearance-none pr-6"
                    style={{
                      backgroundImage: "url('/icons/arrow-down.svg')",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.25rem center",
                      backgroundSize: "1rem",
                      border: "none",
                      paddingRight: "1.5rem",
                    }}
                  >
                    <option>전체</option>
                    <option>사용 가능</option>
                    <option>사용 중</option>
                    <option>서비스 중지</option>
                  </select>
                </th>
                <th className="py-2">
                  청소 여부
                  <select
                    value={filterCleaning}
                    onChange={(e) => setFilterCleaning(e.target.value)}
                    className="ml-2 text-sm bg-transparent appearance-none pr-6"
                    style={{
                      backgroundImage: "url('/icons/arrow-down.svg')",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.25rem center",
                      backgroundSize: "1rem",
                      border: "none",
                      paddingRight: "1.5rem",
                    }}
                  >
                    <option>전체</option>
                    <option>청소 완료</option>
                    <option>청소 전</option>
                  </select>
                </th>
                <th className="py-2">객실 상태 메모</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.number} className="border-b last:border-b-0">
                  <td className="py-2">{room.number}</td>
                  <td className="py-2 text-[#000] font-medium">{room.type}</td>
                  <td className="py-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        room.status === "사용 가능"
                          ? "bg-[#E8F5EF] text-[#03C75A]"
                          : room.status === "사용 중"
                          ? "bg-[#F1F3F5] text-[#888]"
                          : "bg-[#FDEFEF] text-[#FF5A5A]"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="py-2 text-[#000]">{room.cleaning}</td>
                  <td className="py-2 text-[#000]">{room.memo}</td>
                </tr>
              ))}
              {filteredRooms.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-[#999]">
                    해당 조건에 맞는 객실이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(ReserveIndex);
