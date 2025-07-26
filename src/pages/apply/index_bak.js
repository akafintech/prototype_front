// export default function MyInfos() {
//   return (

//     <div className="max-w-[960px] flex-1 grow flex flex-col items-start relative">
//       <div className="flex flex-wrap items-start justify-between gap-[12px_12px] p-4 relative self-stretch w-full flex-[0_0_auto]">
//         <div className="flex-col w-72 flex items-start relative">
//           <div className="relative self-stretch mt-[-1.00px] font-bold text-[#0c141c] text-[32px] leading-10 [font-family:'Inter',Helvetica] tracking-[0]">
//             내 정보
//           </div>
//         </div>

//         <div className="inline-flex h-10 items-center justify-end relative flex-[0_0_auto] bg-[#e8edf2] rounded-lg">
//           <div className="relative w-[45px] mt-[-1.00px] font-medium text-[#0c141c] text-base leading-10 [font-family:'Inter',Helvetica] tracking-[0]">
//             로그인
//           </div>
//         </div>
//       </div>

//       <div className="flex-col pt-5 pb-3 px-4 flex-[0_0_auto] flex items-start relative self-stretch w-full">
//         <div className="relative self-stretch mt-[-1.00px] font-bold text-[#0c141c] text-[22px] leading-7 [font-family:'Inter',Helvetica] tracking-[0]">
//           회원가입
//         </div>
//       </div>

//       <div className="inline-flex flex-wrap max-w-[480px] items-end gap-[16px_16px] px-4 py-3 relative flex-[0_0_auto]">
//         <div className="flex flex-col min-w-40 items-start relative flex-1 grow">
//           <div className="flex-col items-start pt-0 pb-2 px-0 flex-[0_0_auto] flex relative self-stretch w-full">
//             <p className="relative self-stretch mt-[-1.00px] font-medium text-transparent text-base leading-6 [font-family:'Inter',Helvetica] tracking-[0]">
//               <span className="text-[#0c141c]">아이디&nbsp;&nbsp;</span>
//               <span className="text-[#1871cb] text-xs">
              
//               <input
//                             type="text"
//                             placeholder="*실제 사용하시는 이메일을 입력해주세요"
//                             className="w-96 px-4 py-2 border border-[#E5E7EB] rounded-lg bg-[#F6F8FB] text-[#222] mr-4"
                            
//                         />
//               </span>

             
//             </p>
//           </div>

//           <div className="h-14 items-center p-4 bg-[#e8edf2] rounded-xl overflow-hidden flex relative self-stretch w-full">
//             <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#49779b] text-base tracking-[0] leading-6 whitespace-nowrap">
//               example@example.com
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="inline-flex flex-wrap max-w-[480px] items-end gap-[16px_16px] px-4 py-3 relative flex-[0_0_auto]">
//         <div className="flex flex-col min-w-40 items-start relative flex-1 grow">
//           <div className="flex-col items-start pt-0 pb-2 px-0 flex-[0_0_auto] flex relative self-stretch w-full">
//             <div className="relative self-stretch mt-[-1.00px] font-medium text-[#0c141c] text-base leading-6 [font-family:'Inter',Helvetica] tracking-[0]">
//               비밀번호
//             </div>
//           </div>
          
//           <div className="h-14 items-center p-4 bg-[#e8edf2] rounded-xl overflow-hidden flex relative self-stretch w-full">
//             <div className="relative w-fit mt-[-1.00px] font-normal text-[#49779b] text-base leading-6 whitespace-nowrap [font-family:'Inter',Helvetica] tracking-[0]">
//               비밀번호 입력
//             </div>
//           </div>

//         </div>
//       </div>

//       <div className="inline-flex flex-wrap max-w-[480px] items-end gap-[16px_16px] px-4 py-3 relative flex-[0_0_auto]">
//         <div className="flex flex-col min-w-40 items-start relative flex-1 grow">
//           <div className="flex-col items-start pt-0 pb-2 px-0 flex-[0_0_auto] flex relative self-stretch w-full">
//             <div className="relative self-stretch mt-[-1.00px] font-medium text-[#0c141c] text-base leading-6 [font-family:'Inter',Helvetica] tracking-[0]">
//               비밀번호 확인
//             </div>
//           </div>

//           <div className="h-14 items-center p-4 bg-[#e8edf2] rounded-xl overflow-hidden flex relative self-stretch w-full">
//             <div className="relative w-fit mt-[-1.00px] font-normal text-[#49779b] text-base leading-6 whitespace-nowrap [font-family:'Inter',Helvetica] tracking-[0]">
//               비밀번호 재입력
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="inline-flex flex-wrap max-w-[480px] items-end gap-[16px_16px] px-4 py-3 relative flex-[0_0_auto]">
//         <div className="flex flex-col min-w-40 items-start relative flex-1 grow">
//           <div className="flex-col items-start pt-0 pb-2 px-0 flex-[0_0_auto] flex relative self-stretch w-full">
//             <div className="relative self-stretch mt-[-1.00px] font-medium text-[#0c141c] text-base leading-6 [font-family:'Inter',Helvetica] tracking-[0]">
//               휴대폰 번호
//             </div>
//           </div>

//           <div className="h-14 items-center p-4 bg-[#e8edf2] rounded-xl overflow-hidden flex relative self-stretch w-full">
//             <div className="relative w-fit mt-[-1.00px] font-normal text-[#49779b] text-base leading-6 whitespace-nowrap [font-family:'Inter',Helvetica] tracking-[0]">
//               숫자만 입력
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="inline-flex flex-wrap max-w-[480px] items-end gap-[16px_16px] px-4 py-3 relative flex-[0_0_auto]">
//         <div className="flex flex-col min-w-40 items-start relative flex-1 grow">
//           <div className="flex-col items-start pt-0 pb-2 px-0 flex-[0_0_auto] flex relative self-stretch w-full">
//             <div className="relative self-stretch mt-[-1.00px] font-medium text-[#0c141c] text-base leading-6 [font-family:'Inter',Helvetica] tracking-[0]">
//               추천인 입력
//             </div>
//           </div>

//           <div className="h-14 bg-[#e8edf2] rounded-xl overflow-hidden relative self-stretch w-full">
//             <img
//               className="absolute w-[448px] h-14 top-[-644px] left-[-364px]"
//               alt="Vector"
//               src="https://c.animaapp.com/mdfz0qs1nELw0Y/img/vector---0-3.svg"
//             />

//             <div className="absolute top-[15px] left-[18px] font-normal text-[#4a789c] text-base leading-6 whitespace-nowrap [font-family:'Inter',Helvetica] tracking-[0]">
//               추천인 코드 입력
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="justify-around flex-[0_0_auto] flex items-start relative self-stretch w-full">
//         <div className="flex-wrap gap-[12px_12px] px-4 py-3 flex-1 grow flex items-start relative">
//           <div className="max-w-[480px] w-[449px] h-10 items-center justify-center px-4 py-0 bg-[#e8edf2] rounded-[20px] overflow-hidden flex relative">
//             <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
//               <div className="relative self-stretch mt-[-1.00px] font-bold text-black text-sm text-center leading-[21px] whitespace-nowrap [font-family:'Inter',Helvetica] tracking-[0]">
//                 가입하기
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
