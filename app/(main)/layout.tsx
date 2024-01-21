import Navbar from "@/components/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="mt-[75px] pt-8 mx-auto px-8 md:max-w-[650px] lg:max-w-[700px]">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
