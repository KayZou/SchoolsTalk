import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "School's Talk",
  description: "Real Time Video Calls App For Schools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
