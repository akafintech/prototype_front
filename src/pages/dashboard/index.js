import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { FaStar } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

export default function Dashboard() {
  const router = useRouter();

  const handleReviewClick = () => {
    router.push("/review");
  };

  const bookingData = [
    { customerName: "김몽몽", roomType: "Deluxe Suite", checkIn: "2025-03-25", checkOut: "2025-03-27", status: "확정" },
    { customerName: "박올리브", roomType: "Standard Room", checkIn: "2025-03-22", checkOut: "2025-03-25", status: "체크인 완료" },
    { customerName: "Eonusele", roomType: "Executive Suite", checkIn: "2025-03-23", checkOut: "2025-03-25", status: "확정" },
    { customerName: "Geneoya", roomType: "Standard Room", checkIn: "2025-03-18", checkOut: "2025-03-20", status: "대기 중" },
    { customerName: "정하나", roomType: "Deluxe Suite", checkIn: "2025-03-17", checkOut: "2025-03-21", status: "확정" },
  ];

  const reviewData = [
    { username: "dk**", date: "2025-06-15", comment: "Exceptional service and a truly memorable stay. The staff went above and beyond to ensure our comfort. Highly recommend!", rating: 5 },
    { username: "li**", date: "2025-05-20", comment: "가성비 좋아요. 다음에도 오고싶어요.", rating: 4 },
  ];

  const bookingChartData = [
    { date: "01", rate: 62 },
    { date: "02", rate: 71 },
    { date: "03", rate: 65 },
    { date: "04", rate: 78 },
  ];

  const scoreBarData = [
    { rating: "1", count: 1 },
    { rating: "2", count: 1 },
    { rating: "3", count: 2 },
    { rating: "4", count: 4 },
    { rating: "5", count: 3 },
  ];

  const incomeChartData = [
    { date: "01", income: 1000000 },
    { date: "02", income: 1800000 },
    { date: "03", income: 2500000 },
    { date: "04", income: 3200000 },
  ];

  return (
    <Layout>
      <div className="bg-white flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
        <main className="flex-1 px-8 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#222] mb-2">대시보드</h1>
            <p className="text-[#888]">호텔 운영에 필요한 주요 지표를 한눈에 확인할 수 있습니다.</p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col gap-2 p-6 bg-white border border-[#f0e9dd] rounded-lg">
              <div className="text-base font-semibold text-[#0c141c]">예약률</div>
              <div className="text-2xl font-bold text-[#0c141c]">75%</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={bookingChartData}>
                  <Line type="monotone" dataKey="rate" stroke="#f6b26b" strokeWidth={2} dot={{ r: 3 }} />
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={[50, 100]} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-2 p-6 bg-white border border-[#f0e9dd] rounded-lg">
              <div className="text-base font-semibold text-[#0c141c]">평점</div>
              <div className="text-2xl font-bold text-[#0c141c]">4.5/5</div>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart
                  data={scoreBarData}
                  layout="vertical"
                  margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
                  barGap={5}
                >
                  <XAxis type="number" hide domain={[0, 5]} />
                  <YAxis 
                    dataKey="rating" 
                    type="category" 
                    width={24} 
                    tick={{ fill: "#0c141c", fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <Bar dataKey="count" barSize={12} radius={[6, 6, 6, 6]} background={{ fill: "#f3f1ee", radius: [6, 6, 6, 6] }}>
                    {scoreBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#f6b26b" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-2 p-6	bg-white border border-[#f0e9dd] rounded-lg">
              <div className="text-base font-semibold text-[#0c141c]">총 수익</div>
              <div className="text-2xl font-bold text-[#0c141c]">3,200,000원</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={incomeChartData}>
                  <Line type="monotone" dataKey="income" stroke="#f6b26b" strokeWidth={2} dot={{ r: 3 }} />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

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
                          <span className="inline-block w-full bg-[#fcefdc] border border-[#f0e9dd] rounded-lg px-4 py-1 text-sm text-[#0c141c]">
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