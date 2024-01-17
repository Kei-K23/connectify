import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <div className="fixed top-0 text-center bg-black text-white w-full py-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Connectify</h1>
        <h2 className="text-lg md:text-xl font-bold">
          Share what you see, hear, and think to the world
        </h2>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
