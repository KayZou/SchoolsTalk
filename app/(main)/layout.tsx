import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import Image from "next/image";
import React from "react";
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (!user) {
    return (
      <main className="flex flex-col items-center p-5 gap-10 animate-fade-in">
        <section className="flex flex-col items-center">
          <Image
            src="/SchoolsTalkLogo.png"
            height={200}
            width={200}
            alt="Logo"
          />
          <h1 className="text-lg font-semibold lg:text-2xl text-black">
            Parents, Students, Teachers; Connect Now, In REAL-TIME
          </h1>
        </section>
        <div className="mt-3 flex justify-center">
          <SignIn routing="hash" appearance={{ baseTheme: dark }} />
        </div>
      </main>
    );
  }
  return (
    <>
      <main className="animate-fade-in">{children}</main>
      <footer className="py-6 mt-auto">
        <h3 className="text-center">
          Made By School Solutions; Zak & Amina
        </h3>
      </footer>
    </>
  );
};
export default MainLayout;
