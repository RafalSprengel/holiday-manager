import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import styles from "./layout.module.css";
import AOSInitializer from './components/AOSInitializer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holiday Manager",
  description: "Easily manage your company's holiday and leave requests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.app}>
          <AOSInitializer />
          <Sidebar />
          <div className={styles.content}>{children}</div>
          <div id='content-overlay' className={styles.overlay}></div>
        </div>

      </body>
    </html>
  );
}
