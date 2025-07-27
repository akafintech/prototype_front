import Menu from "./menu";

export default function LeftNavigationBar() {
  return (
    <div className="flex flex-col min-h-[800px] items-start relative self-stretch w-full flex-[0_0_auto] bg-white">
      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
          <div className="w-80 h-[1075px] flex flex-col items-start relative">
            <div className="flex-col min-h-[700px] justify-between p-4 flex-1 grow bg-[#f7f9fc] flex items-start relative self-stretch w-full">
              <div className="h-[482px] gap-4 flex flex-col items-start relative self-stretch w-full">
                                 <div className="items-center gap-3 self-stretch w-full flex-[0_0_auto] flex relative">
                   <div className="relative w-[80px] h-12 bg-transparent">
                     <div className="h-full w-full bg-[url('/icons/lemong_logo.png')] bg-contain bg-no-repeat bg-center bg-transparent">
                     </div>
                   </div>

                   <div className="inline-flex flex-col items-center justify-center relative flex-[0_0_auto]">
                     <div className="flex relative self-stretch [font-family:'Inter',Helvetica] font-medium text-[#0c141c] text-base tracking-[0] leading-6">
                       The Dream Solution
                     </div>
                   </div>
                 </div>

                <div className="flex flex-col h-[367px] items-start gap-2 relative self-stretch w-full">
                  <Menu text="회원가입" url={"/apply"} />
                  <Menu text="대시보드" url={"/"} />
                  <Menu text="예약관리" url={"/reservation"} />
                  <Menu text="객실관리" url={"/room"} />
                  <Menu text="통계/분석" url={"/report"} />
                  <Menu text="리뷰관리" url={"/review"} />
                  <Menu text="내 정보" url={"/myinfo"} />
                  <Menu text="설정" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
