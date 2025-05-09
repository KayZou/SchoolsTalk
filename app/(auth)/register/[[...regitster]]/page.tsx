import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <>
      <main className="flex flex-col items-center p-5 gap-10 animate-fade-in">
        <section className="flex flex-col items-center">
          <Image
            src={"/SchoolsTalkLogo.png"}
            width={200}
            height={200}
            alt="Logo"
          />
          <h1 className="text-lg font-extrabold text-black lg:text-2xl">
            Parents, Students, Teachers; Connect Now, In REAL-TIME
          </h1>
        </section>
        <div className="mt-3">
          <SignUp appearance={{ baseTheme: dark }} />
        </div>
      </main>
    </>
  );
};
export default RegisterPage;
