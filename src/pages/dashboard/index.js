import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { FaStar } from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();

  const handleReviewClick = () => {
    router.push('/review');
  };

  const dashboardStats = [
    { label: "예약률", value: "75%" },
    { label: "평점", value: "4.5/5" },
    { label: "총 수익", value: "3,200,000원" },
  ];

  const bookingData = [
    { customerName: "김몽몽", roomType: "Deluxe Suite", checkIn: "2025-03-25", checkOut: "2025-03-27", status: "확정" },
    { customerName: "박올리브", roomType: "Standard Room", checkIn: "2025-03-22", checkOut: "2025-03-25", status: "체크인 완료" },
    { customerName: "Eonusele", roomType: "Executive Suite", checkIn: "2025-03-23", checkOut: "2025-03-25", status: "확정" },
    { customerName: "Geneoya", roomType: "Standard Room", checkIn: "2025-03-18", checkOut: "2025-03-20", status: "대기 중" },
    { customerName: "정하나", roomType: "Deluxe Suite", checkIn: "2025-03-17", checkOut: "2025-03-21", status: "확정" },
  ];

  const reviewData = [
    {
      username: "dk**",
      date: "2025-06-15",
      comment: "Exceptional service and a truly memorable stay. The staff went above and beyond to ensure our comfort. Highly recommend!",
      rating: 5,
    },
    {
      username: "li**",
      date: "2025-05-20",
      comment: "가성비 좋아요. 다음에도 오고싶어요.",
      rating: 4,
    },
  ];

  return (
    <Layout>
      <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
        <main className="flex-1 px-8 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#222] mb-2">대시보드</h1>
            <p className="text-[#888]">호텔 운영에 필요한 주요 지표를 한눈에 확인할 수 있습니다.</p>
          </div>

          {/* 통계 카드 */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start gap-2 p-6 bg-[#e8edf4] rounded-lg">
                <div className="text-sm text-[#0c141c]">{stat.label}</div>
                <div className="text-2xl font-bold text-[#0c141c]">{stat.value}</div>
              </div>
            ))}
          </section>

          {/* 예약 현황 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#222] mb-4">최근 예약 현황</h2>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-sm text-left">고객 이름</th>
                      <th className="px-4 py-3 text-sm text-left">객실 타입</th>
                      <th className="px-4 py-3 text-sm text-left">체크인 날짜</th>
                      <th className="px-4 py-3 text-sm text-left">체크아웃 날짜</th>
                      <th className="px-4 py-3 text-sm text-left">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingData.map((booking, index) => (
                      <tr key={index} className="border-t border-[#e5e8ea]">
                        <td className="px-4 py-2 text-sm text-[#0c141c]">{booking.customerName}</td>
                        <td className="px-4 py-2 text-sm text-[#49729b]">{booking.roomType}</td>
                        <td className="px-4 py-2 text-sm text-[#49729b]">{booking.checkIn}</td>
                        <td className="px-4 py-2 text-sm text-[#49729b]">{booking.checkOut}</td>
                        <td className="px-4 py-2 text-center">
                          <span className="inline-block w-full bg-[#e8edf2] rounded-lg px-4 py-1 text-sm text-[#0c141c]">
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 고객 리뷰 */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#222]">고객 리뷰</h2>
              <button onClick={handleReviewClick} className="text-[#49729b] hover:text-[#222] text-sm font-medium">
                전체보기 →
              </button>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="space-y-6">
                {reviewData.map((review, index) => (
                  <article
                    key={index}
                    className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0 hover:bg-gray-50 p-3 rounded-lg"
                    onClick={handleReviewClick}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-base font-medium text-[#222]">{review.username}</div>
                      <div className="flex gap-[2px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-[#49729b] mb-2">{review.date}</div>
                    <p className="text-[#222] text-base leading-6">{review.comment}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
