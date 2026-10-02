import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fahad Iqbal · Full-Stack & Mobile Developer",
  description:
    "Portfolio of Fahad Iqbal, a Full-Stack & Mobile Developer specializing in high-performance web applications, scalable mobile architecture, Next.js, React Native, and AI integrations.",
  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "Mobile Developer",
    "Next.js",
    "React",
    "React Native",
    "Expo",
    "TypeScript",
    "Supabase",
    "iOS Developer",
    "Android Developer",
    "Fahad Iqbal",
  ],
  authors: [{ name: "Fahad Iqbal" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <div className="layout-wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1, paddingTop: "80px" }}>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
