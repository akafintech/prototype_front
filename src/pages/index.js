import React from "react";
import DashboardStats from "@/components/dashboard";


export default function Home() {
  return (
    <div className="flex flex-col items-start relative bg-white">
      <div className="flex flex-col min-h-[800px] items-start relative self-stretch w-full flex-[0_0_auto] bg-white">
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
            <DashboardStats />
          </div>
        </div>
      </div>
    </div>
  );
};



