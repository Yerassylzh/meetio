"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import dynamic from "next/dynamic";

const DeviceTypeProvider = dynamic(
  () =>
    import("@/context/DeviceTypeContext").then((mod) => mod.DeviceTypeProvider),
  { ssr: false }
);

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <DeviceTypeProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </DeviceTypeProvider>
      </body>
    </html>
  );
}
