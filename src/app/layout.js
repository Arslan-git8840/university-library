import Header from "@/components/Header";
import "./globals.css";
import localFont from "next/font/local";
import SesProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster"

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SesProvider>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased bg-pattern bg-cover bg-top bg-dark-100`}
        >
          {children}
          <Toaster />
        </body>
      </SesProvider>
    </html>
  );
}
