import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center p-5 gap-10 animate-fade-in">
      <section className="flex flex-col items-center">
        <Image src="/SchoolsTalkLogo.png" height={200} width={200} alt="Logo" />
        <h1 className="text-lg font-semibold lg:text-2xl text-black">
          Parents, Students, Teachers; Connect Now, In REAL-TIME
        </h1>
      </section>
      <div className="mt-3 flex justify-center">
        <SignIn appearance={{ baseTheme: dark }} />
      </div>
    </main>
  );
};
export default LoginPage;
