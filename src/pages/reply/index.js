import React from "react";
import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";

function ReplyIndex({ currentUser }) {
  return (
    <Layout>
      <div className="min-h-screen bg-[#F6F8FB] flex">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-bold text-[#222] mb-2">답변 관리</h1>
        <p className="text-[#888] mb-8">고객 리뷰에 대한 답변을 관리하고 AI를 활용하여 효율적으로 응답할 수 있습니다.</p>
        
        {/* Platform Buttons */}
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2">
            <span>배달의민족</span>
            <span className="bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2">
            <span>쿠팡이츠</span>
            <span className="bg-white text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2">
            <span>요기요</span>
            <span className="bg-white text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2">
            <span>땡겨요</span>
            <span className="bg-white text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
          </button>
        </div>

        {/* Title and Category */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#222] mb-2">[배달의민족] 맛있닭 몽치킨</h1>
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">치킨</button>
        </div>

        {/* Review Stats and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-1">전체 리뷰 28개</button>
            <span className="text-gray-600">미답변 23개</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="날짜를 선택해주세요"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>별점 전체</option>
            </select>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              AI 일괄 댓글
            </button>
            <button className="p-2 bg-gray-300 rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Rating Display */}
        <div className="absolute top-8 right-8 text-right">
          <div className="text-3xl font-bold text-[#222]">4.95</div>
          <div className="flex text-yellow-400 text-xl mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>★</span>
            ))}
          </div>
          <div className="text-sm text-gray-600">총 리뷰수 213</div>
        </div>

        {/* Review Card */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[#222]">개근상</div>
                <div className="flex text-purple-500 text-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">2024.06.10</div>
          </div>

          <div className="mb-4">
            <p className="text-[#222] mb-3">
              숨은 치즈볼 맛집이에요!!!! 배달 받자마자 바로 먹었는데 치즈 늘어나는게 진짜 예술 그 자체!! 약간 짭조름해서 식은 다음에 먹어도 진짜 맛있어요 양념 치킨도 물론 맛있게 잘먹었어요!
            </p>
            <div className="text-sm text-gray-600">
              <span className="font-medium">주문메뉴:</span> 세트1(후라이드/양념)+콜라
            </div>
          </div>

          {/* Reply Input */}
          <div className="mb-4">
            <textarea
              placeholder="댓글을 직접 입력하시거나, 몽이의 추천 댓글 중 하나를 선택하여 '붙여넣기'해주세요."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-2">
              <button className="text-blue-600 text-sm">자주쓰는 댓글</button>
              <span className="text-sm text-gray-500">0/1000</span>
            </div>
          </div>
        </div>

        {/* Suggested Replies */}
        <div className="bg-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-medium text-[#222]">몽이의 추천 댓글</h3>
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">몽</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              "정말 맛있게 드셨다니 저희도 기뻐요! 치즈볼의 쫄깃함과 치즈의 풍미를 느끼셨다니 다행입니다. 다음에도 맛있는 메뉴로 찾아뵙겠습니다! 🧀",
              "배달 받자마자 드시셨다니 정말 좋은 선택이에요! 치즈가 늘어나는 순간이 가장 맛있죠. 양념치킨도 함께 드셨다니 완벽한 조합이네요! 😊",
              "짭조름한 맛이 식은 후에도 맛있다니 정말 기쁘네요! 저희 치즈볼은 특별한 레시피로 만들어져서 언제 먹어도 맛있답니다. 다음에도 기대해주세요! 🍗"
            ].map((reply, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <p className="text-[#222] mb-3">{reply}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">붙여넣기</button>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">바로 등록</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="fixed bottom-8 right-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 shadow-lg">
            <span className="text-xl">😊</span>
            등록
          </button>
        </div>
      </main>
    </div>
    </Layout>
  );
}

export default withAuth(ReplyIndex);
