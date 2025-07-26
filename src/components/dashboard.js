import React from "react";

export default function DashboardStats() {
  const dashboardStats = [
    {
      label: "예약률",
      value: "75%",
    },
    {
      label: "평점",
      value: "4.5/5",
    },
    {
      label: "총 수익",
      value: "3,200,000원",
    },
  ];

  const bookingData = [
    {
      customerName: "김몽몽",
      roomType: "Deluxe Suite",
      checkIn: "2025-03-15",
      checkOut: "2025-03-20",
      status: "확정",
    },
    {
      customerName: "박올리브",
      roomType: "Standard Room",
      checkIn: "2025-03-18",
      checkOut: "2025-03-22",
      status: "체크인 완료",
    },
    {
      customerName: "Eonusele",
      roomType: "Executive Suite",
      checkIn: "2025-03-20",
      checkOut: "2025-03-25",
      status: "확정",
    },
    {
      customerName: "Geneoya",
      roomType: "Standard Room",
      checkIn: "2025-03-22",
      checkOut: "2025-03-26",
      status: "대기 중",
    },
    {
      customerName: "정하나",
      roomType: "Deluxe Suite",
      checkIn: "2025-03-25",
      checkOut: "2025-03-30",
      status: "확정",
    },
  ];

  const reviewData = [
    {
      username: "배고픈너구리13",
      date: "2025-03-10",
      comment: "방은 깨끗하고 좋은데다가 편리했어요.",
    },
    {
      username: "호호우리사랑",
      date: "2025-03-05",
      comment: "사장님 친절하신데 저녁에 좀 시끄러웠어요ㅠㅠ",
    },
  ];

  const tableHeaders = [
    { label: "고객 이름", width: "w-[175px]" },
    { label: "객실 타입", width: "w-[184px]" },
    { label: "체크인 날짜", width: "w-[173px]" },
    { label: "체크아웃 날짜", width: "w-[173px]" },
    { label: "상태", width: "w-[169px]" },
  ];

  return (
  <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
    
    <main className="flex-1 px-8 py-10">
          <h1 className="text-3xl font-bold text-[#222] mb-2">대시보드
            <p className="text-[#888] mb-8">호텔 운영에 필요한 주요 지표를 한눈에 확인할 수 있습니다.</p>
          </h1>
      <header className="flex flex-wrap items-start justify-around gap-[12px_12px] p-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex-col w-72 flex items-start relative">

        </div>
      </header>

      <section
        className="flex-wrap gap-[16px_16px] p-4 flex-[0_0_auto] flex items-start relative self-stretch w-full"
        aria-label="대시보드 통계"
      >
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col min-w-[158px] items-start gap-2 p-6 relative flex-1 grow bg-[#e8edf4] rounded-lg"
          >
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-base leading-6 relative self-stretch tracking-[0]">
                {stat.label}
              </div>
            </div>
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#0c141c] text-2xl tracking-[0] leading-[30px]">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col items-start pt-5 pb-3 px-4 relative self-stretch w-full flex-[0_0_auto]">
        <h2 className="mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#0c141c] text-[22px] leading-7 relative self-stretch tracking-[0]">
          최근 예약 현황
        </h2>
      </section>

      <section
        className="flex-col px-4 py-3 flex-[0_0_auto] flex items-start relative self-stretch w-full"
        aria-label="예약 현황 테이블"
      >
        <div className="self-stretch w-full flex-[0_0_auto] bg-[#f7f9fc] rounded-lg overflow-hidden border border-solid border-[#cedbe8] flex items-start relative">
          <div className="flex flex-col items-start relative flex-1 grow">
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div
                className="flex items-start relative flex-1 self-stretch w-full grow bg-[#f7f9fc]"
                role="row"
              >
                {tableHeaders.map((header, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${header.width} items-start px-4 py-3 relative self-stretch`}
                    role="columnheader"
                  >
                    <div className="mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm leading-[21px] relative self-stretch tracking-[0]">
                      {header.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]"
              role="rowgroup"
            >
              {bookingData.map((booking, index) => (
                <div
                  key={index}
                  className="flex h-[72px] items-start relative self-stretch w-full border-t [border-top-style:solid] border-[#e5e8ea]"
                  role="row"
                >
                  <div
                    className="w-[175px] flex flex-col h-[72px] items-center justify-center px-4 py-2 relative mb-[-1.00px]"
                    role="cell"
                  >
                    <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#0c141c] text-sm leading-[21px] relative self-stretch tracking-[0]">
                      {booking.customerName}
                    </div>
                  </div>

                  <div
                    className="w-[184px] flex flex-col h-[72px] items-center justify-center px-4 py-2 relative mb-[-1.00px]"
                    role="cell"
                  >
                    <div className="relative self-stretch [font-family:'Inter-Regular',Helvetica] font-normal text-[#49729b] text-sm tracking-[0] leading-[21px]">
                      {booking.roomType}
                    </div>
                  </div>

                  <div
                    className="w-[173px] flex flex-col h-[72px] items-center justify-center px-4 py-2 relative mb-[-1.00px]"
                    role="cell"
                  >
                    <div className="relative self-stretch [font-family:'Inter-Regular',Helvetica] font-normal text-[#49729b] text-sm tracking-[0] leading-[21px]">
                      {booking.checkIn}
                    </div>
                  </div>

                  <div
                    className="w-[173px] flex flex-col h-[72px] items-center justify-center px-4 py-2 relative mb-[-1.00px]"
                    role="cell"
                  >
                    <div className="relative self-stretch [font-family:'Inter-Regular',Helvetica] font-normal text-[#49729b] text-sm tracking-[0] leading-[21px]">
                      {booking.checkOut}
                    </div>
                  </div>

                  <div
                    className="w-[169px] flex flex-col h-[72px] items-center justify-center px-4 py-2 relative mb-[-1.00px]"
                    role="cell"
                  >
                    <div className="flex min-w-[84px] max-w-[480px] h-8 items-center justify-center px-4 py-0 relative w-full bg-[#e8edf4] rounded-lg overflow-hidden">
                      <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                          {booking.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-start pt-5 pb-3 px-4 relative self-stretch w-full flex-[0_0_auto]">
        <h2 className="mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#0c141c] text-[22px] leading-7 relative self-stretch tracking-[0]">
          고객 리뷰
        </h2>
      </section>

      <section
        className="flex-col gap-8 p-4 flex-[0_0_auto] bg-[#f7f9fc] flex items-start relative self-stretch w-full"
        aria-label="고객 리뷰"
      >
        {reviewData.map((review, index) => (
          <article
            key={index}
            className="gap-3 flex-[0_0_auto] bg-[#f7f9fc] flex flex-col items-start relative self-stretch w-full"
          >
            <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start relative flex-1 grow">
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-base leading-6 relative self-stretch tracking-[0]">
                    {review.username}
                  </div>
                </div>

                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <time className="mt-[-1.00px] relative self-stretch [font-family:'Inter-Regular',Helvetica] font-normal text-[#49729b] text-sm tracking-[0] leading-[21px]">
                    {review.date}
                  </time>
                </div>
              </div>
            </div>



            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#0c141c] text-base tracking-[0] leading-6">
                {review.comment}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  </div>
  );
};
