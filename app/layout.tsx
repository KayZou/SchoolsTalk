import type { Metadata } from "next";
import {
  ClerkProvider,
} from "@clerk/nextjs";

import "./globals.css";
import "react-datepicker/dist/react-datepicker.css"


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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
