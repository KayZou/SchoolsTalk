"use client";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between fixed z-50 w-full h-28 bg-gray-200 px-10 gap-4 shadow-2 items-center">
      <Link
        href={"/"}
        className="flex items-center gap-1 hover:scale-150 duration-500"
      >
        <Image
          src={"/SchoolsTalkLogo.png"}
          width={60}
          height={60}
          alt="School's Talk"
        />
      </Link>

      <section className="sticky top-0 text-black">
        <div className="flex flex-1 max-sm:gap-0 sm:gap-6">
          {navLinks.map(({ icon: Icon, route, label }) => {
            const isActive =
              route === "/"
                ? pathname === "/"
                : pathname === route ||
                  (pathname.startsWith(`${route}/`) && route !== "/");
            return (
              <Link
                href={route}
                key={label}
                className={cn(
                  "flex gap-4 items-center rounded-lg justify-start hover:scale-120 duration-500",
                  isActive ? "bg-blue-200 rounded-3xl" : ""
                )}
              >
                <Icon className="h-6 w-6" />
                <p className="text-lg font-semibold max-lg:hidden">{label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="hover:scale-120 duration-500">
        <SignedIn>
          <UserButton appearance={{ baseTheme: dark }} />
        </SignedIn>
      </div>
    </nav>
  );
};
export default NavBar;
